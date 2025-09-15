<template>
  <view class="container">
    <view class="u-m-l-20 u-m-t-20 u-text-left" style="width: 100%">
      <u-icon
        name="home"
        color="#8ad2b3"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>
    <view class="coin-container">
      <view
        class="coin"
        :class="{ 'coin-rotate': isRotating, isHeads: isHead }"
        @animationend="handleAnimationEnd"
      >
        <view class="coin0"></view>
        <view class="coin1"></view>
      </view>
    </view>

    <!-- 结果显示区域 -->
    <view v-if="showResult" class="result-display">
      <view class="result-text">{{ rotationResult }}</view>
    </view>

    <view class="button-container">
      <u-button @click="handleClick" :loading="isRotating" class="toss-button">
        {{ isRotating ? "抛币中..." : "抛硬币" }}
      </u-button>
    </view>

    <view class="instructions">
      <view class="instruction-text">将你要做的决定藏于心间</view>
      <view class="instruction-text">点击抛硬币用"字"和"头"来替你下决定</view>
      <u-icon
        name="question-circle"
        color="#666"
        size="50"
        @click="showTip = true"
      ></u-icon>
    </view>

    <u-popup v-model="showTip" mode="center" width="90%" :closeable="true">
      <view class="u-p-20">
        <view class="tip-content u-font-40">[{{ totalCount }}]</view>
        <view class="u-p-10 u-tips-color"
          ><u-icon
            class="u-p-r-20"
            name="bookmark-fill"
            color="#FFD700"
            size="28"
          ></u-icon>
          <text>头出现的次数为{{ headCount }},</text
          ><text>出现概率为{{ headProb }}%</text></view
        >
        <view class="u-p-10 u-tips-color"
          ><u-icon
            class="u-p-r-20"
            name="bookmark-fill"
            color="#FFD700"
            size="28"
          ></u-icon>
          <text>字出现的次数为{{ tailCount }},</text
          ><text>出现概率为{{ tailProb }}%</text></view
        >

        <view class="u-p-10 u-content-color u-text-center u-font-lg"
          ><text
            >抛硬币不会告诉你答案，而是落入手中的一瞬间，让你明白你内心深处的答案！</text
          ></view
        >
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getCoin, addCoin } from "@/api/modules/coin";
import { onLoad } from "@dcloudio/uni-app";

const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

const isRotating = ref(false);
const showResult = ref(false);
const showTip = ref(false);
const rotationResult = ref("");
const isHead = ref(false);
let timer: any;

// 页面加载时显示一次提示
// onLoad(() => {
//   setTimeout(() => {
//     showTip.value = true;
//   }, 1000);
// });

const handleClick = () => {
  if (!isRotating.value) {
    startRotation();
  }
};

const startRotation = () => {
  // 随机决定结果（字或头）
  const isHeads = Math.random() > 0.5;
  rotationResult.value = isHeads ? "字" : "头";

  // 记录结果
  addCoin(isHeads ? 0 : 1);
  refreshData();

  // 计算旋转圈数（3-5圈随机）
  const randomCycles = 3 + Math.floor(Math.random() * 3); // 3-5圈

  // 启动动画
  isRotating.value = true;
  showResult.value = false;

  // 设置动画时长（根据旋转圈数动态调整）
  const animationDuration = 1.5 + randomCycles * 0.5;

  // 动画结束后处理
  timer = setTimeout(() => {
    isRotating.value = false;
    showResult.value = true;
    // 设置结果,确保硬币停在正确的面
    isHead.value = isHeads;
  }, animationDuration * 1000);
};

const handleAnimationEnd = () => {
  clearTimeout(timer);
  isRotating.value = false;
  showResult.value = true;
};

const headCount = ref(0);
const tailCount = ref(0);
const totalCount = ref(0);
const headProb = ref("");
const tailProb = ref("");

const refreshData = () => {
  totalCount.value = getCoin().length;
  headCount.value = getCoin().filter((item: number) => item === 1).length;
  tailCount.value = getCoin().filter((item: number) => item === 0).length;
  headProb.value = ((headCount.value / totalCount.value) * 100).toFixed(2);
  tailProb.value = ((tailCount.value / totalCount.value) * 100).toFixed(2);
};
onLoad(() => {
  refreshData();
});
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 1000px; /* 3D透视效果 */
}

.coin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
  width: 100%;
  margin: 30px 0;
}

.coin {
  position: relative;
  width: 150px;
  height: 150px;
  transform-style: preserve-3d; /* 保持3D效果 */
  transition: transform 0.5s ease-out; /* 用于最终定位的过渡 */
}

// 旋转动画类
.coin-rotate {
  animation: rotate 0.5s linear infinite;
}

.isHeads {
  transform: rotateY(180deg);
}

// 旋转动画定义
@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.coin0,
.coin1 {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  backface-visibility: hidden; /* 隐藏背面 */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.coin0 {
  background-color: $main-color;
  //background-image: url("https://s21.ax1x.com/2025/09/12/pVW1f56.jpg");
  background-image: url("https://crownclown.xyz/icon_back.jpg");
}

.coin1 {
  background-color: #fff;
  // background-image: url("https://s21.ax1x.com/2025/09/12/pVW1WUx.jpg");
  background-image: url("https://crownclown.xyz/icon_front.jpg");
  transform: rotateY(180deg); /* 反面初始旋转180度 */
}

/* 其他样式保持不变 */
.button-container {
  margin: 20px 0;
  width: 100%;
  max-width: 200px;
}

.toss-button {
  width: 100%;
  height: 50px;
  font-size: 18px;
  border-radius: 25px;
}

.result-display {
  margin: 30px 0;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: popIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.result-text {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.instructions {
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
}

.instruction-text {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.tip-content {
  padding: 20rpx;
  text-align: center;
  font-size: 60rpx;
  color: #333;
  line-height: 1.6;
}

@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
