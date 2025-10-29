<template>
  <view class="container">
    <view class="u-m-l-20 u-m-t-50">
      <u-icon name="home" color="#D9D919" size="50" @click="handleTomine"></u-icon>
    </view>
    <view class="u-p-20 u-m-t-40" style="font-size: 32px; color: #4b2910; text-align: center;">
      测试工具
    </view>
    
    <view class="test-cards">
      <!-- Labubu测试卡片 -->
      <view class="test-card" @click="goToLabubu">
        <view class="card-image labubu-bg"></view>
        <view class="card-content">
          <view class="card-title">Labubu性格测试</view>
          <view class="card-desc">探索你像Labubu家族中的哪个成员</view>
          <view class="card-info">
            <text class="card-questions">12题</text>
            <text class="card-time">约5分钟</text>
          </view>
        </view>
        <view class="card-arrow">
          <u-icon name="arrow-rightward" color="#999999" size="28"></u-icon>
        </view>
      </view>
      
      <!-- MBTI测试卡片 -->
      <view class="test-card" @click="goToMbti">
        <view class="card-image mbti-bg"></view>
        <view class="card-content">
          <view class="card-title">MBTI性格测试</view>
          <view class="card-desc">专业的性格类型分析与发展建议</view>
          <view class="card-info">
            <text class="card-questions">93题</text>
            <text class="card-time">约25-30分钟</text>
          </view>
        </view>
        <view class="card-arrow">
          <u-icon name="arrow-rightward" color="#999999" size="28"></u-icon>
        </view>
      </view>
    </view>
    
    <view class="test-footer">
      <view class="test-footer-main"> 所有测试仅供娱乐参考，非专业心理评估 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const title = ref("测试工具");

onLoad(() => {
  uni.setNavigationBarTitle({
    title: title.value,
  });
});

const goToLabubu = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/labubu",
  });
};

const goToMbti = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/mbti",
  });
};

const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.test-cards {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.test-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  height: 180px;
  transition: transform 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

.card-image {
  width: 180px;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.labubu-bg {
  background-image: url("https://crownclown.xyz/labubu_test/1.jpeg");
}

.mbti-bg {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 14px;
  color: #666666;
  line-height: 1.4;
}

.card-info {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.card-questions, .card-time {
  font-size: 12px;
  color: #999999;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.card-arrow {
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.test-footer {
  position: fixed;
  bottom: 60rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .test-footer-main {
    background-color: rgba(255, 255, 255, 0.8);
    width: 80%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    color: #765d47;
    font-size: 12px;
  }
}
</style>