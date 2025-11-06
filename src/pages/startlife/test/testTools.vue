<template>
  <view class="container">
    <view class="u-m-l-20 u-m-t-50">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>
    <view
      class="u-p-15 u-m-t-30"
      style="font-size: 28px; color: #4b2910; text-align: center"
    >
      有趣测试
    </view>
    <view class="test-cards-container">
      <view class="test-cards">
        <!-- MBTI测试卡片 -->
        <view class="test-card" @click="goToMbti">
          <view class="card-image mbti-bg"></view>
          <view class="card-content">
            <view class="card-title">MBTI性格测试</view>
            <view class="card-desc">专业的性格类型分析与发展建议</view>
            <view class="card-info">
              <text class="card-questions">93题</text>
              <text class="card-time">约20-25分钟</text>
            </view>
          </view>
          <view class="card-arrow">
            <u-icon name="arrow-rightward" color="#999999" size="24"></u-icon>
          </view>
        </view>

        <!-- Labubu测试卡片 -->
        <view class="test-card" @click="goToLabubu">
          <view class="card-image labubu-bg"></view>
          <view class="card-content">
            <view class="card-title">labubu角色测试</view>
            <view class="card-desc">探索你像Labubu家族中的哪个成员</view>
            <view class="card-info">
              <text class="card-questions">12题</text>
              <text class="card-time">约5分钟</text>
            </view>
          </view>
          <view class="card-arrow">
            <u-icon name="arrow-rightward" color="#999999" size="24"></u-icon>
          </view>
        </view>

        <!-- 海贼王角色测试卡片 -->
        <view class="test-card" @click="goToOnePiece">
          <view
            class="card-image onepiece-bg u-font-40 u-color-white u-flex u-row-center"
          ></view>
          <view class="card-content">
            <view class="card-title">海贼王角色测试</view>
            <view class="card-desc">探索你最像《海贼王》中的哪个角色</view>
            <view class="card-info">
              <text class="card-questions">15题</text>
              <text class="card-time">约8分钟</text>
            </view>
          </view>
          <view class="card-arrow">
            <u-icon name="arrow-rightward" color="#999999" size="24"></u-icon>
          </view>
        </view>

        <!-- 火影忍者角色测试卡片 -->
        <view class="test-card" @click="goToNaruto">
          <view
            class="card-image naruto-bg u-font-40 u-color-white u-flex u-row-center"
          ></view>
          <view class="card-content">
            <view class="card-title">火影忍者角色测试</view>
            <view class="card-desc">探索你最像《火影忍者》中的哪个角色</view>
            <view class="card-info">
              <text class="card-questions">15题</text>
              <text class="card-time">约8分钟</text>
            </view>
          </view>
          <view class="card-arrow">
            <u-icon name="arrow-rightward" color="#999999" size="24"></u-icon>
          </view>
        </view>
      </view>
    </view>

    <view class="test-footer">
      <view class="test-footer-main">
        所有测试仅供娱乐参考，非专业心理评估
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const title = ref("有趣测试");

onLoad(() => {
  uni.setNavigationBarTitle({
    title: title.value,
  });
});

const goToLabubu = () => {
  uni.redirectTo({
    url: "/pages/startlife/test/labubu",
  });
};

const goToMbti = () => {
  uni.redirectTo({
    url: "/pages/startlife/test/mbti",
  });
};

const goToOnePiece = () => {
  uni.redirectTo({
    url: "/pages/startlife/test/onepiece",
  });
};

const goToNaruto = () => {
  uni.redirectTo({
    url: "/pages/startlife/test/naruto",
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
  padding: 15px;
  background-color: #f8f8f8;
  min-height: 100vh;
}
.test-cards-container {
  max-height: calc(100vh - 180px);
  overflow: auto;
}

.test-cards {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.test-card {
  background-color: #ffffff;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  height: 120px;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}

.card-image {
  width: 120px;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.labubu-bg {
  background-image: url("https://crownclown.xyz/labubu_test/1.jpeg");
}

.mbti-bg {
  background-image: url("https://crownclown.xyz/mbti.jpeg");
}

.onepiece-bg {
  background-image: url("https://crownclown.xyz/onepiece/beta-1.png");
}

.naruto-bg {
  background-image: url("https://areal.me/which-naruto-character-are-you/show/7.png");
}

.card-content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 12px;
  color: #666666;
  line-height: 1.4;
}

.card-info {
  display: flex;
  gap: 12px;
  margin-top: 6px;
}

.card-questions,
.card-time {
  font-size: 10px;
  color: #999999;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.card-arrow {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.test-footer {
  position: fixed;
  bottom: 40rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .test-footer-main {
    background-color: rgba(255, 255, 255, 0.8);
    width: 85%;
    margin: 0 auto;
    border-radius: 8px;
    padding: 5px;
    text-align: center;
    color: #765d47;
    font-size: 11px;
  }
}
</style>
