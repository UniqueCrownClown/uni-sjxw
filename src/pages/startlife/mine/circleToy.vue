<template>
  <view class="circle-toy-container">
    <u-navbar
      title="转盘决策"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      back-icon-color="#fff"
    ></u-navbar>

    <view class="content">
      <!-- 转盘区域 -->
      <view class="wheel-container">
        <canvas
          canvas-id="wheel-canvas"
          id="wheel-canvas"
          class="wheel-canvas"
          :style="{ width: canvasSize + 'px', height: canvasSize + 'px' }"
          disable-scroll
        ></canvas>
        <view class="wheel-pointer" @click="startSpin">
          <text class="start-icon">▶</text>
        </view>
      </view>

      <!-- 结果展示 -->
      <view v-if="showResult" class="result-container">
        <view class="result-title">决策结果</view>
        <view class="result-text">{{ selectedItem }}</view>
        <u-button type="primary" @click="resetResult">确定</u-button>
      </view>

      <!-- 选项管理 -->
      <view class="options-container">
        <view class="options-header">
          <text class="options-title">转盘选项</text>
          <view class="options-actions">
            <u-button
              type="error"
              size="mini"
              @click="clearOptions"
              class="clear-btn"
              >清空选项</u-button
            >
          </view>
        </view>

        <!-- 添加选项输入框 -->
        <view class="add-option-container">
          <u-input
            v-model="newOption"
            placeholder="请输入选项内容"
            :clearable="true"
            class="add-option-input"
          ></u-input>
          <u-button type="primary" size="mini" @click="addOption"
            >添加</u-button
          >
        </view>

        <view v-if="options.length === 0" class="empty-options">
          <text>暂无选项，请添加选项</text>
        </view>

        <view v-else class="options-list">
          <view
            v-for="(item, index) in options"
            :key="index"
            class="option-item"
          >
            <view class="option-text">{{ item }}</view>
            <view class="option-actions">
              <u-icon
                name="trash-fill"
                color="#ff6b6b"
                size="24"
                @click="removeOption(index)"
              ></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { onReady } from "@dcloudio/uni-app";

// 转盘选项
const options = ref<string[]>([]);
const newOption = ref<string>("");
const showResult = ref<boolean>(false);
const selectedItem = ref<string>("");
const canvasSize = ref<number>(300);

// 转盘相关变量
let isSpinning = ref<boolean>(false);
let startAngle = ref<number>(-Math.PI / 2); // 初始角度设为-90度，使第一个选项在顶部
let spinAngle = ref<number>(0);
let spinTime = ref<number>(0);
let spinTimeTotal = ref<number>(0);
let ctx: UniApp.CanvasContext | null = null;

// 颜色数组，用于转盘扇形区域
const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFBE0B",
  "#FB5607",
  "#8338EC",
  "#3A86FF",
  "#38B000",
  "#9D4EDD",
  "#FF006E",
];

// 初始化画布
const initCanvas = () => {
  // 使用 uni.createCanvasContext 获取 canvas 上下文
  ctx = uni.createCanvasContext("wheel-canvas");
  drawWheel();
};

// 绘制转盘
const drawWheel = () => {
  if (!ctx) {
    return;
  }

  const centerX = canvasSize.value / 2;
  const centerY = canvasSize.value / 2;
  const radius = canvasSize.value / 2 - 10;

  // 清空画布
  ctx.clearRect(0, 0, canvasSize.value, canvasSize.value);

  // 如果没有选项，只绘制中心圆和播放图标
  if (options.value.length === 0) {
    // 绘制中心圆
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.setFillStyle("#FFFFFF");
    ctx.fill();

    // 绘制中心圆边框
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.setStrokeStyle("#83cbac");
    ctx.setLineWidth(3);
    ctx.stroke();
    
    // 绘制中心播放图标
    ctx.beginPath();
    ctx.moveTo(centerX - 6, centerY - 8);
    ctx.lineTo(centerX - 6, centerY + 8);
    ctx.lineTo(centerX + 10, centerY);
    ctx.closePath();
    ctx.setFillStyle("#83cbac");
    ctx.fill();

    ctx.draw();
    return;
  }

  // 绘制每个扇形
  const sliceAngle = (2 * Math.PI) / options.value.length;

  for (let i = 0; i < options.value.length; i++) {
    const start = i * sliceAngle + startAngle.value;
    const end = (i + 1) * sliceAngle + startAngle.value;

    // 绘制扇形
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, start, end);
    ctx.closePath();
    ctx.setFillStyle(colors[i % colors.length]);
    ctx.fill();

    // 绘制扇形分隔线
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(start),
      centerY + radius * Math.sin(start)
    );
    ctx.setStrokeStyle("#FFFFFF");
    ctx.setLineWidth(2);
    ctx.stroke();

    // 绘制文字
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(start + sliceAngle / 2);
    ctx.setTextAlign("right");
    ctx.setFillStyle("#FFFFFF");
    ctx.setFontSize(16);
    ctx.setTextBaseline("middle");

    // 添加文字阴影效果
    ctx.setShadow(2, 2, 4, "rgba(0, 0, 0, 0.5)");
    ctx.fillText(options.value[i], radius - 20, 0);
    ctx.restore();
  }

  // 绘制中心圆
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.setFillStyle("#FFFFFF");
  ctx.fill();

  // 绘制中心圆边框
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.setStrokeStyle("#83cbac");
  ctx.setLineWidth(3);
  ctx.stroke();
  
  // 绘制中心播放图标
  ctx.beginPath();
  ctx.moveTo(centerX - 6, centerY - 8);
  ctx.lineTo(centerX - 6, centerY + 8);
  ctx.lineTo(centerX + 10, centerY);
  ctx.closePath();
  ctx.setFillStyle("#83cbac");
  ctx.fill();

  ctx.draw();
};

// 开始旋转
const startSpin = () => {
  if (options.value.length === 0) {
    uni.showToast({
      title: "请先添加选项",
      icon: "none",
    });
    return;
  }

  if (isSpinning.value) {
    return;
  }

  isSpinning.value = true;
  spinTime.value = 0;
  spinTimeTotal.value = Math.random() * 3000 + 4000; // 4-7秒
  spinAngle.value = Math.random() * 10 + 10; // 随机旋转圈数

  rotateWheel();
};

// 旋转转盘
const rotateWheel = () => {
  spinTime.value += 30;

  if (spinTime.value >= spinTimeTotal.value) {
    stopRotateWheel();
    return;
  }

  // 使用缓动函数计算当前角度
  const progress = spinTime.value / spinTimeTotal.value;
  const easeProgress = easeOut(progress);
  const currentAngle = spinAngle.value * 360 * easeProgress;

  startAngle.value = (currentAngle * Math.PI) / 180;
  drawWheel();

  setTimeout(rotateWheel, 30);
};

// 停止旋转
const stopRotateWheel = () => {
  isSpinning.value = false;

  // 计算选中的选项
  const degrees = ((startAngle.value * 180) / Math.PI) % 360;
  // 由于初始角度是-90度（顶部），我们需要调整计算逻辑
  const normalizedDegrees = (degrees + 90) % 360;
  const sliceAngle = 360 / options.value.length;
  const selectedIndex = Math.floor(normalizedDegrees / sliceAngle);

  selectedItem.value = options.value[selectedIndex];
  showResult.value = true;
};

// 缓动函数
const easeOut = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// 添加选项
const addOption = () => {
  if (!newOption.value.trim()) {
    uni.showToast({
      title: "请输入选项内容",
      icon: "none",
    });
    return;
  }

  options.value.push(newOption.value.trim());
  newOption.value = "";

  // 重新绘制转盘
  nextTick(() => {
    drawWheel();
  });
};

// 移除选项
const removeOption = (index: number) => {
  uni.showModal({
    title: "提示",
    content: "确定要删除该选项吗？",
    success: (res) => {
      if (res.confirm) {
        options.value.splice(index, 1);

        // 重新绘制转盘
        nextTick(() => {
          drawWheel();
        });
      }
    },
  });
};

// 清空所有选项
const clearOptions = () => {
  if (options.value.length === 0) {
    uni.showToast({
      title: "当前没有选项",
      icon: "none",
    });
    return;
  }

  uni.showModal({
    title: "提示",
    content: "确定要清空所有选项吗？",
    success: (res) => {
      if (res.confirm) {
        options.value = [];

        // 重新绘制转盘
        nextTick(() => {
          drawWheel();
        });

        uni.showToast({
          title: "已清空所有选项",
          icon: "success",
        });
      }
    },
  });
};

// 重置结果
const resetResult = () => {
  showResult.value = false;
  selectedItem.value = "";
};

// 监听选项变化，重新绘制转盘
watch(
  options,
  () => {
    nextTick(() => {
      drawWheel();
    });
  },
  { deep: true }
);

// 页面加载完成后初始化
onMounted(() => {
  // 设置默认选项
  options.value = ["选项一", "选项二", "选项三", "选项四"];

  // 获取屏幕宽度，设置转盘大小
  const systemInfo = uni.getSystemInfoSync();
  const screenWidth = systemInfo.screenWidth || 375;
  const rpxToPx = screenWidth / 750; // 微信小程序中 750rpx = 屏幕宽度
  canvasSize.value = Math.min(screenWidth * 0.8, 300);
});

// 页面准备好后初始化画布
onReady(() => {
  nextTick(() => {
    initCanvas();
  });
});
</script>

<style lang="scss" scoped>
.circle-toy-container {
  min-height: 100vh;
  background-color: #f5f5f5;

  .content {
    padding: 20rpx;
  }

  .wheel-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40rpx 0;

    .wheel-canvas {
      border-radius: 50%;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
      z-index: 1;
    }
    
    .wheel-pointer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80rpx;
      height: 80rpx;
      background-color: #83cbac;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.2);
      z-index: 99;
      /* 确保在真机上能够正确点击 */
      pointer-events: auto;
      
      .start-icon {
        color: #ffffff;
        font-size: 40rpx;
        font-weight: bold;
        margin-left: 4rpx; /* 微调位置使其居中 */
      }
    }
  }

  .result-container {
    background-color: #ffffff;
    border-radius: 20rpx;
    padding: 40rpx;
    margin-bottom: 40rpx;
    text-align: center;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

    .result-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }

    .result-text {
      font-size: 40rpx;
      font-weight: bold;
      color: #83cbac;
      margin-bottom: 30rpx;
      padding: 20rpx;
      border-bottom: 2rpx solid #f0f0f0;
    }
  }

  .options-container {
    background-color: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

    .options-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;

      .options-title {
        font-size: 32rpx;
        font-weight: bold;
      }

      .options-actions {
        display: flex;
        gap: 10rpx;

        .clear-btn {
          margin-right: 10rpx;
        }
      }
    }

    .add-option-container {
      display: flex;
      margin-bottom: 30rpx;
      
      .add-option-input {
        flex: 1;
        margin-right: 20rpx;
      }
    }

    .empty-options {
      text-align: center;
      padding: 40rpx 0;
      color: #999;
    }

    .options-list {
      .option-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 2rpx solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        .option-text {
          font-size: 28rpx;
        }

        .option-actions {
          padding: 10rpx;
        }
      }
    }
  }
}
</style>