<template>
  <view class="sakura-container">
    <canvas
      canvas-id="sakura-canvas"
      class="sakura-canvas"
      :style="{ width: windowWidth + 'px', height: windowHeight + 'px' }"
      @touchstart="handleTouch"
    ></canvas>
    <view class="content-container">
      <view style="position: absolute; top: 50px; left: 20px">
        <u-icon
          name="home"
          color="#D9D919"
          size="50"
          @click="handleTomine"
        ></u-icon>
      </view>
      <view class="u-flex u-row-center u-m-t-40">
        <view class="rotating-image">
          <view class="u-text-center" style="margin-top: 100px">
            <text class="u-color-white u-font-30">{{ luckyTag }}</text>
          </view>
          <view class="u-text-center" style="margin-top: 20px">
            <text class="u-color-white u-font-40">{{ luckyStatus }}</text>
          </view>
        </view>
      </view>
      <button class="action-button" open-type="share">传递好运</button>
      <!-- <button class="action-button" @click="handleSakura" style="margin-top: 20px;">潮汕彩蛋</button> -->
      <view style="margin-top: 20px; width: 100%">
        <u-image
          src="https://crownclown.xyz/chaoshan/laoye.png"
          width="100%"
          mode="widthFix"
        ></u-image>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { luckyStatusArr, luckyTags } from "@/utils/luckword";
import { ref, onMounted, onUnmounted } from "vue";
import { onShareAppMessage } from "@dcloudio/uni-app";

const windowWidth = ref(0);
const windowHeight = ref(0);
const canvasContext = ref<any>(null);
const animationTimer = ref<any>(null);
const petalList = ref<any[]>([]);
const maxTime = ref(8); // 调整生成频率
const timeCounter = ref(0);
const petalImagePath = ref<string>("");
const maxPetals = ref(50); // 降低花瓣数量以提升性能
const isInitialized = ref(false);

// 使用网络图片URL，小程序中更容易加载
const petalImageUrl = "https://crownclown.xyz/huaban.png";

// 初始化花瓣飘落效果
const initPetalFloat = () => {
  try {
    // 获取窗口尺寸
    const systemInfo = uni.getWindowInfo();
    windowWidth.value = systemInfo.windowWidth;
    windowHeight.value = systemInfo.windowHeight;

    // 获取 canvas 上下文
    canvasContext.value = uni.createCanvasContext("sakura-canvas");

    // 下载图片到本地
    uni.downloadFile({
      url: petalImageUrl,
      success: (res) => {
        if (res.statusCode === 200) {
          petalImagePath.value = res.tempFilePath;
          isInitialized.value = true;

          // 初始化一些花瓣
          for (let i = 0; i < 5; i++) {
            addPetal();
          }

          // 开始动画
          startAnimation();
        }
      },
      fail: (err) => {
        console.error("图片下载失败:", err);
        // 使用备用方案：绘制简单的花瓣形状
        isInitialized.value = true;
        for (let i = 0; i < 5; i++) {
          addPetal();
        }
        startAnimation();
      },
    });
  } catch (error) {
    console.error("初始化失败:", error);
  }
};

// 添加花瓣
const addPetal = (x?: number, y?: number) => {
  // 检查是否超过最大花瓣数量限制
  if (petalList.value.length >= maxPetals.value) {
    return;
  }

  let px = 0;
  let py = 0;

  if (x !== undefined && y !== undefined) {
    // 触摸位置生成
    px = x;
    py = y;
  } else {
    // 随机选择从屏幕上方或左侧生成花瓣
    if (Math.random() >= 0.5) {
      px = Math.floor(Math.random() * windowWidth.value);
      py = -50;
    } else {
      py = Math.floor(Math.random() * windowHeight.value);
      px = -50;
    }
  }

  petalList.value.push({
    x: px,
    y: py,
    alpha: 0.8,
    rotate: 0,
    scale: Math.random() * 0.4 + 0.3,
    vx: Math.random() * 2 + 0.5,
    vy: Math.random() * 1 + 0.5,
    va: -0.001,
    vr: -(Math.random() * 2 + 1),
    life: Math.floor(Math.random() * 100) + 400,
    maxLife: 500,
  });
};

// 更新花瓣状态
const updatePetals = () => {
  const updatedPetals = [];

  for (let i = 0; i < petalList.value.length; i++) {
    const petal = petalList.value[i];
    petal.life--;

    if (petal.life > 0) {
      // 更新位置
      petal.x += petal.vx;
      petal.y += petal.vy;
      petal.rotate += petal.vr;

      // 更新透明度
      const lifeRatio = petal.life / petal.maxLife;
      petal.alpha = 0.8 * lifeRatio;

      // 添加轻微的摆动效果
      petal.x += Math.sin(petal.life * 0.05) * 0.5;

      updatedPetals.push(petal);
    }
  }

  petalList.value = updatedPetals;
};

// 绘制花瓣
const drawPetal = (petal: any) => {
  if (!canvasContext.value) return;

  const size = 30 * petal.scale;

  // 视口裁剪检查
  if (
    petal.x + size < 0 ||
    petal.x > windowWidth.value ||
    petal.y + size < 0 ||
    petal.y > windowHeight.value
  ) {
    return;
  }

  canvasContext.value.save();
  canvasContext.value.translate(petal.x + size / 2, petal.y + size / 2);
  canvasContext.value.globalAlpha = petal.alpha;
  canvasContext.value.rotate((petal.rotate * Math.PI) / 180);

  if (petalImagePath.value) {
    // 使用图片绘制
    canvasContext.value.drawImage(
      petalImagePath.value,
      -size / 2,
      -size / 2,
      size,
      size / 2
    );
  } else {
    // 备用方案：绘制简单的花瓣形状
    canvasContext.value.beginPath();
    canvasContext.value.fillStyle = `rgba(255, 182, 193, ${petal.alpha})`;

    // 绘制花瓣形状
    for (let i = 0; i < 5; i++) {
      const angle = (i * 72 * Math.PI) / 180;
      const x = (Math.cos(angle) * size) / 2;
      const y = (Math.sin(angle) * size) / 2;

      if (i === 0) {
        canvasContext.value.moveTo(x, y);
      } else {
        canvasContext.value.quadraticCurveTo(0, 0, x, y);
      }
    }

    canvasContext.value.closePath();
    canvasContext.value.fill();
  }

  canvasContext.value.restore();
};

// 渲染花瓣
const renderPetals = () => {
  if (!isInitialized.value) return;

  updatePetals();

  // 定期添加新花瓣
  if (timeCounter.value++ >= maxTime.value) {
    timeCounter.value = 0;
    addPetal();
  }

  // 清空画布
  canvasContext.value.clearRect(0, 0, windowWidth.value, windowHeight.value);

  // 绘制所有花瓣
  for (let i = 0; i < petalList.value.length; i++) {
    drawPetal(petalList.value[i]);
  }

  // 渲染到画布
  canvasContext.value.draw();
};

// 开始动画
const startAnimation = () => {
  stopAnimation();

  // 使用setInterval确保在真机上稳定运行
  animationTimer.value = setInterval(() => {
    renderPetals();
  }, 1000 / 30); // 30fps，平衡性能和效果
};

// 停止动画
const stopAnimation = () => {
  if (animationTimer.value) {
    clearInterval(animationTimer.value);
    animationTimer.value = null;
  }
};

// 触摸事件处理
const handleTouch = (e: any) => {
  if (!isInitialized.value) return;

  const touch = e.touches[0];
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      addPetal(touch.x, touch.y);
    }, i * 100);
  }
};

// 监听窗口变化
const handleResize = () => {
  const systemInfo = uni.getWindowInfo();
  windowWidth.value = systemInfo.windowWidth;
  windowHeight.value = systemInfo.windowHeight;
};

onMounted(() => {
  // 延迟初始化，确保页面完全加载
  setTimeout(() => {
    initPetalFloat();
  }, 100);

  // 监听窗口变化
  uni.onWindowResize(handleResize);
});

onUnmounted(() => {
  stopAnimation();
  uni.offWindowResize(handleResize);
});

const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

const luckyTag = ref(luckyTags[Math.floor(Math.random() * luckyTags.length)]);
const luckyStatus = ref(
  luckyStatusArr[Math.floor(Math.random() * luckyStatusArr.length)]
);

onShareAppMessage(() => {
  return {
    title:
      "我抽到了【" +
      luckyTag.value +
      "】的" +
      luckyStatus.value +
      "签，将好运传递给你！",
    path: "/pages/startlife/mine/sakura",
  };
});

const handleSakura = () => {
  uni.showToast({
    title: "潮汕彩蛋已发送",
    icon: "success",
    duration: 2000,
  });
};
</script>

<style>
.sakura-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url("https://crownclown.xyz/shu_bg.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.sakura-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: auto;
}

.content-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.action-button {
  background: linear-gradient(135deg, #ff87b2 20%, #ffe8ef 100%);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin-top: 50px;
  width: 80%;
}

.action-button:hover {
  background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 100%);
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.action-button:active {
  transform: scale(0.98);
}

.rotating-image {
  width: 480rpx;
  height: 640rpx;
  background-image: url("https://crownclown.xyz/qian_bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: rotate3d 3s linear;
  transform-style: preserve-3d;
}

@keyframes rotate3d {
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
