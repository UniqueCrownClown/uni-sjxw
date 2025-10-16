<template>
  <view class="decision-tools">
    <view class="u-m-l-20 u-m-t-50 u-text-left" style="width: 100%">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>
    
    <view class="container">
      <view class="page-title">决策工具</view>
      
      <!-- 工具选择区域 -->
      <view class="tools-section">
        <view class="section-title">选择决策工具</view>
        <view class="tools-grid">
          <view 
            class="tool-card"
            :class="{ active: selectedTool === 'coin' }"
            @click="selectTool('coin')"
          >
            <view class="tool-icon">
              <image src="/static/assets/svg/10002.svg" mode="aspectFit"></image>
            </view>
            <view class="tool-name">抛硬币决策</view>
            <view class="tool-desc">当面临二选一困境时，让硬币帮你做决定</view>
          </view>
          
          <view 
            class="tool-card"
            :class="{ active: selectedTool === 'wheel' }"
            @click="selectTool('wheel')"
          >
            <view class="tool-icon">
              <image src="/static/assets/svg/10003.svg" mode="aspectFit"></image>
            </view>
            <view class="tool-name">转盘决策</view>
            <view class="tool-desc">多个选项难以抉择？让转盘帮你随机选择</view>
          </view>
        </view>
      </view>
      
      <!-- 工具使用区域 -->
      <view class="usage-section">
        <!-- 抛硬币工具预览 -->
        <view v-if="selectedTool === 'coin'" class="coin-tool-preview">
          <view class="tool-preview-container">
            <view class="preview-image">
              <image src="https://crownclown.xyz/icon_front.jpg" mode="aspectFit"></image>
            </view>
            <view class="preview-description">
              <view class="preview-title">抛硬币决策</view>
              <view class="preview-text">当面临二选一困境时，让硬币帮你做决定</view>
            </view>
          </view>
          <view class="button-container">
            <u-button type="primary" @click="navigateToCoinToy" class="navigate-button">
              进入抛硬币决策
            </u-button>
          </view>
        </view>
        
        <!-- 转盘工具预览 -->
        <view v-if="selectedTool === 'wheel'" class="wheel-tool-preview">
          <view class="tool-preview-container">
            <view class="preview-image">
              <image src="https://crownclown.xyz/icon_wheel.png" mode="aspectFit"></image>
            </view>
            <view class="preview-description">
              <view class="preview-title">转盘决策</view>
              <view class="preview-text">多个选项难以抉择？让转盘帮你随机选择</view>
            </view>
          </view>
          <view class="button-container">
            <u-button type="primary" @click="navigateToCircleToy" class="navigate-button">
              进入转盘决策
            </u-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

// 返回按钮
const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

// 工具选择
const selectedTool = ref('coin');
const selectTool = (tool: string) => {
  selectedTool.value = tool;
};

// 跳转到抛硬币页面
const navigateToCoinToy = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/coinToy",
  });
};

// 跳转到转盘页面
const navigateToCircleToy = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/circleToy",
  });
};

onLoad(() => {
  // 页面加载逻辑
});
</script>

<style lang="scss" scoped>
.decision-tools {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 1200px;
}

.page-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.tools-section {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  text-align: center;
}

.tools-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.tool-card {
  width: 45%;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  margin-bottom: 20rpx;

  &:hover {
    transform: translateY(-5rpx);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  &.active {
    border-color: #d9d919;
    background-color: rgba(217, 217, 25, 0.1);
    transform: translateY(-5rpx);
    box-shadow: 0 6px 16px rgba(217, 217, 25, 0.3);
  }
}

.tool-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 20rpx;
  
  image {
    width: 100%;
    height: 100%;
  }
}

.tool-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.tool-desc {
  font-size: 24rpx;
  color: #666;
  text-align: center;
  line-height: 1.4;
}

.usage-section {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20rpx;
  padding: 30rpx;
}

/* ===== 工具预览样式 ===== */
.coin-tool-preview, .wheel-tool-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tool-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
  width: 100%;
}

.preview-image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
  
  image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.preview-description {
  text-align: center;
}

.preview-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.preview-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

.button-container {
  margin: 20px 0;
  width: 100%;
  max-width: 300px;
}

.navigate-button {
  width: 100%;
  height: 50px;
  font-size: 18px;
  border-radius: 25px;
}
</style>