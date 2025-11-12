<template>
  <view class="container">
    <view class="u-m-l-20 u-m-t-50 u-text-left" style="width: 100%">
      <u-icon
        name="arrow-left"
        color="#D9D919"
        size="50"
        @click="goBack"
      ></u-icon>
    </view>
    <view v-if="result" class="result-container">
      <view class="result-title">占卜结果</view>
      <!-- 卦象基本信息 -->
      <view class="card basic-info">
        <view class="card-title">卦象信息</view>
        <view class="info-item">
          <text class="label">时间：</text>
          <text class="value">{{ result.time }}</text>
        </view>
        <view class="info-item">
          <text class="label">干支：</text>
          <view class="value">{{ result.ganzhi }} </view>
        </view>
        <view class="info-item">
          <text class="label">卦名：</text>
          <text class="level" :class="getLevelClass(result.gua_degree)">
            {{ result.gua_degree }}
          </text>
          <text class="value">{{ result.gua_name }}</text>
        </view>
        <view class="info-item">
          <text class="label">周易卦序：</text>
          <text class="value">{{ result.gua_biaozhu }}</text>
        </view>
      </view>

      <!-- 卦象干支 -->
      <view class="card">
        <view class="card-title">卦象干支</view>
        <view class="section-content pre-format">
          <view
            v-for="(item, index) in result.gua_xiang.split('|')"
            :key="index"
            class="ganzhi-line"
            >{{ item }}</view
          ></view
        >
      </view>

      <!-- 卦象详情 -->
      <view class="card">
        <view class="card-title">卦象详解</view>
        <view class="section">
          <view class="section-title">卦辞</view>
          <view class="section-content">{{ result.gua_ci }}</view>
        </view>
        <view class="section">
          <view class="section-title">象辞</view>
          <view class="section-content">{{ result.gua_xiang_ci }}</view>
        </view>
        <view class="section">
          <view class="section-title">白话文解释</view>
          <view class="section-content">{{ result.gua_explain }}</view>
        </view>
      </view>

      <!-- 卦象解读 -->
      <view class="card">
        <view class="card-title">卦象解读</view>
        <view class="section-content">{{ result.gua_detail }}</view>
      </view>

      <!-- 建议 -->
      <view class="card advice-card">
        <view class="card-title">建议</view>
        <view class="section-content">{{ result.gua_advice }}</view>
      </view>
    </view>

    <view v-else class="empty-state">
      <u-icon name="info-circle" color="#999" size="48"></u-icon>
      <text class="empty-text">暂无占卜结果</text>
      <button class="back-btn" @click="goBack">返回占卜</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { LiuYaoResult, useZhanbuStore } from "@/store/modules/zhanbuStore";

const result = ref<LiuYaoResult | null>(null);
const zhanbuStore = useZhanbuStore();
// 获取页面参数
onLoad(() => {
  result.value = zhanbuStore.getLiuyaoResult();
  console.log(result.value?.gua_xiang.split("|"));
});

// 根据卦象等级返回对应的样式类
const getLevelClass = (level: string) => {
  if (level.includes("上上")) return "level-top";
  if (level.includes("上中")) return "level-high";
  if (level.includes("上下")) return "level-medium-high";
  if (level.includes("中中")) return "level-medium";
  if (level.includes("中下")) return "level-medium-low";
  if (level.includes("下下")) return "level-low";
  return "";
};

// 返回上一页
const goBack = () => {
  uni.navigateTo({
    url: "/pages/startlife/zhanbu/liuyao",
  });
  zhanbuStore.clearLiuyaoResult();
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding-bottom: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.result-container {
  padding: 20px;
}

.result-title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  color: #333;
  text-align: center;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.basic-info {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
  font-size: 15px;
}

.label {
  color: #666;
  width: 90px;
  flex-shrink: 0;
}

.value {
  color: #333;
  flex: 1;
}

.ganzhi-line {
  display: block;
  margin-bottom: 4px;
}

.level {
  font-weight: 600;
}

.level-top {
  color: #e74c3c;
}

.level-high {
  color: #e67e22;
}

.level-medium-high {
  color: #f39c12;
}

.level-medium {
  color: #3498db;
}

.level-medium-low {
  color: #95a5a6;
}

.level-low {
  color: #7f8c8d;
}

.section {
  margin-bottom: 20px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.section-content {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  text-align: justify;
}

.pre-format {
  white-space: pre-line;
  font-family: monospace;
}

.advice-card {
  background-color: #f0f7ff;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-text {
  color: #999;
  font-size: 16px;
  margin: 15px 0 30px;
}

.back-btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 15px;
}
</style>
