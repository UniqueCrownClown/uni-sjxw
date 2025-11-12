<template>
  <view class="zhanbu">
    <view class="u-m-l-20 u-m-t-50 u-text-left" style="width: 100%">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>

    <view class="container">
      <view class="page-title">占卜工具</view>

      <!-- 工具选择区域 -->
      <view class="tools-section">
        <view class="section-title">选择占卜方式</view>
        <view class="tools-grid">
          <view
            class="tool-card"
            :class="{ active: selectedTool === 'liuyao' }"
            @click="selectTool('liuyao')"
          >
            <view class="tool-icon">
              <image
                src="/static/assets/svg/zhanbu/liuyao.svg"
                mode="aspectFit"
              ></image>
            </view>
            <view class="tool-name">六爻占卜</view>
            <view class="tool-desc">传统六爻占卜，预测吉凶祸福</view>
          </view>

          <view
            class="tool-card"
            :class="{ active: selectedTool === 'animalSign' }"
            @click="selectTool('animalSign')"
          >
            <view class="tool-icon">
              <image
                src="/static/assets/svg/zhanbu/animalSign.svg"
                mode="aspectFit"
              ></image>
            </view>
            <view class="tool-name">星座生肖占卜</view>
            <view class="tool-desc">结合星座与生肖，预测今日运势</view>
          </view>
        </view>
      </view>

      <!-- 工具使用区域 -->
      <view class="usage-section">
        <!-- 六爻占卜预览 -->
        <view v-if="selectedTool === 'liuyao'" class="liuyao-tool-preview">
          <view class="tool-preview-container">
            <view class="preview-image">
              <image
                src="/static/assets/svg/zhanbu/liuyao.svg"
                mode="aspectFit"
              ></image>
            </view>
            <view class="preview-description">
              <view class="preview-title">六爻占卜</view>
              <view class="preview-text">传统六爻占卜，预测吉凶祸福</view>
            </view>
          </view>
          <view class="button-container">
            <u-button
              type="primary"
              @click="navigateToLiuyao"
              class="navigate-button"
            >
              进入六爻占卜
            </u-button>
          </view>
        </view>

        <!-- 星座生肖占卜预览 -->
        <view
          v-if="selectedTool === 'animalSign'"
          class="animalSign-tool-preview"
        >
          <view class="tool-preview-container">
            <view class="preview-image">
              <image
                src="/static/assets/svg/zhanbu/animalSign.svg"
                mode="aspectFit"
              ></image>
            </view>
            <view class="preview-description">
              <view class="preview-title">星座生肖占卜</view>
              <view class="preview-text">结合星座与生肖，预测今日运势</view>
            </view>
          </view>
          <view class="button-container">
            <u-button
              type="primary"
              @click="navigateToAnimalSign"
              class="navigate-button"
            >
              进入星座生肖占卜
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
const selectedTool = ref("liuyao");
const selectTool = (tool: string) => {
  selectedTool.value = tool;
};

// 跳转到六爻占卜页面
const navigateToLiuyao = () => {
  uni.navigateTo({
    url: "/pages/startlife/zhanbu/liuyao",
  });
};

// 跳转到星座生肖占卜页面
const navigateToAnimalSign = () => {
  uni.navigateTo({
    url: "/pages/startlife/zhanbu/animalSign",
  });
};

onLoad(() => {
  // 页面加载逻辑
});
</script>

<style lang="scss" scoped>
.zhanbu {
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
.liuyao-tool-preview,
.animalSign-tool-preview {
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