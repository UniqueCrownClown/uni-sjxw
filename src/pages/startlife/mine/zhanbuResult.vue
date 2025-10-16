<template>
  <view class="fortune-result">
    <view class="u-m-l-20 u-m-t-50 u-text-left" style="width: 100%">
      <u-icon
        name="arrow-left"
        color="#D9D919"
        size="50"
        @click="goBack"
      ></u-icon>
    </view>

    <view class="container">
      <view class="result-title">占卜结果</view>

      <!-- 日期显示区域 -->
      <view class="date-section">
        <view class="solar-date">{{ solarDate }}</view>
        <view class="lunar-date">农历：{{ lunarDate }}</view>
      </view>

      <!-- 基本信息区域 -->
      <view class="result-section">
        <view class="section-title">基本信息</view>
        <view class="result-content">
          <view class="result-item">
            <text class="result-label">星座：</text>
            <text class="result-value"
              >{{ fortuneResult.selectedZodiac.name }}
              {{ fortuneResult.selectedZodiac.symbol }}</text
            >
          </view>
          <view class="result-item">
            <text class="result-label">生肖：</text>
            <text class="result-value"
              >{{ fortuneResult.selectedAnimal.name }}
              {{ fortuneResult.selectedAnimal.symbol }}</text
            >
          </view>
          <view class="result-item">
            <text class="result-label">性格特点：</text>
            <text class="result-value">{{
              fortuneResult.selectedZodiac.traits.join("、")
            }}</text>
          </view>
        </view>
      </view>

      <!-- AI占卜结果区域 -->
      <view v-if="fortuneResult" class="result-section">
        <view class="section-title">详细运势</view>
        <view class="result-content">
          <view class="result-item">
            <text class="result-label">幸运数字：</text>
            <text class="result-value">{{ fortuneResult.luckyNumber }}</text>
          </view>
          <view class="result-item">
            <text class="result-label">幸运颜色：</text>
            <text
              class="result-value"
              :style="{ color: fortuneResult.luckyColor }"
              >{{ fortuneResult.luckyColor }}</text
            >
          </view>
          <view class="result-item">
            <text class="result-label">运势短评：</text>
            <text class="result-value">{{ fortuneResult.conclusion }}</text>
          </view>
          <view class="result-item">
            <text class="result-label">今日宜：</text>
            <text class="result-value">{{ fortuneResult.should }}</text>
          </view>
          <view class="result-item">
            <text class="result-label">今日忌：</text>
            <text class="result-value">{{ fortuneResult.shouldNot }}</text>
          </view>
        </view>
      </view>

      <!-- 各方面运势评分区域 -->
      <view v-if="fortuneResult" class="result-section">
        <view class="section-title">运势评分</view>
        <view class="score-grid">
          <view class="score-item">
            <view class="score-label">综合</view>
            <view class="score-value">{{ fortuneResult.score }}</view>
            <view class="score-bar">
              <view
                class="score-fill"
                :style="{ width: fortuneResult.score * 20 + '%' }"
              ></view>
            </view>
          </view>
          <view class="score-item">
            <view class="score-label">事业</view>
            <view class="score-value">{{ fortuneResult.careerScore }}</view>
            <view class="score-bar">
              <view
                class="score-fill"
                :style="{
                  width: fortuneResult.careerScore * 20 + '%',
                }"
              ></view>
            </view>
          </view>
          <view class="score-item">
            <view class="score-label">爱情</view>
            <view class="score-value">{{ fortuneResult.loveScore }}</view>
            <view class="score-bar">
              <view
                class="score-fill"
                :style="{ width: fortuneResult.loveScore * 20 + '%' }"
              ></view>
            </view>
          </view>
          <view class="score-item">
            <view class="score-label">健康</view>
            <view class="score-value">{{ fortuneResult.healthScore }}</view>
            <view class="score-bar">
              <view
                class="score-fill"
                :style="{
                  width: fortuneResult.healthScore * 20 + '%',
                }"
              ></view>
            </view>
          </view>
          <view class="score-item">
            <view class="score-label">财富</view>
            <view class="score-value">{{ fortuneResult.wealthScore }}</view>
            <view class="score-bar">
              <view
                class="score-fill"
                :style="{
                  width: fortuneResult.wealthScore * 20 + '%',
                }"
              ></view>
            </view>
          </view>
        </view>
      </view>

      <!-- 方位指引区域 -->
      <view v-if="fortuneResult" class="result-section">
        <view class="section-title">方位指引</view>
        <view class="direction-grid">
          <view class="direction-item">
            <view class="direction-label">桃花方位</view>
            <view class="direction-value">{{
              fortuneResult.loveLocation
            }}</view>
          </view>
          <view class="direction-item">
            <view class="direction-label">喜神方位</view>
            <view class="direction-value">{{
              fortuneResult.healthLocation
            }}</view>
          </view>
          <view class="direction-item">
            <view class="direction-label">财神方位</view>
            <view class="direction-value">{{
              fortuneResult.wealthLocation
            }}</view>
          </view>
        </view>
      </view>

      <!-- 运势详情区域 -->
      <view v-if="fortuneResult" class="result-section">
        <view class="section-title">运势详情</view>
        <view class="detail-content">
          <view class="detail-item">
            <view class="detail-title">综合运势</view>
            <view class="detail-text">{{ fortuneResult.description }}</view>
          </view>
          <view class="detail-item">
            <view class="detail-title">事业运势</view>
            <view class="detail-text">{{
              fortuneResult.careerDescription
            }}</view>
          </view>
          <view class="detail-item">
            <view class="detail-title">爱情运势</view>
            <view class="detail-text">{{ fortuneResult.loveDescription }}</view>
          </view>
          <view class="detail-item">
            <view class="detail-title">健康运势</view>
            <view class="detail-text">{{
              fortuneResult.healthDescription
            }}</view>
          </view>
          <view class="detail-item">
            <view class="detail-title">财富运势</view>
            <view class="detail-text">{{
              fortuneResult.wealthDescription
            }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  CombineFortuneResult,
  useZhanbuStore,
} from "@/store/modules/zhanbuStore";
import conversion from "@/components/wan-calendar/calendar";
import { formateDate } from "@/utils/common";

// 获取占卜结果
const zhanbuStore = useZhanbuStore();
const fortuneResult: any = computed(() => zhanbuStore.getFortuneResult());

// 日期显示
const solarDate = ref("");
const lunarDate = ref("");

// 获取当前日期信息
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // 格式化公历日期
  solarDate.value = formateDate(now, "yyyy年mm月dd日");
  
  // 获取星期几
  const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const weekDay = weekDays[now.getDay()];
  solarDate.value += `（${weekDay}）`;
  
  // 获取农历日期
  const lunarInfo = conversion.solar2lunar(year, month, day);
  if (lunarInfo !== -1) {
    // 格式化农历日期，lunarInfo.Animal已经是生肖字符串，不需要再用Animals数组索引
    lunarDate.value = `${lunarInfo.gzYear}(${lunarInfo.Animal})年${lunarInfo.IMonthCn}${lunarInfo.IDayCn}`;
  }
};

// 页面加载时获取日期
onMounted(() => {
  getCurrentDate();
});

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.fortune-result {
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
  padding: 20rpx;
}

.result-title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  color: #333;
  text-align: center;
}

// 日期显示区域样式
.date-section {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  .solar-date {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  
  .lunar-date {
    font-size: 28rpx;
    color: #666;
  }
}

.result-section {
  margin-bottom: 30rpx;
  background-color: rgba(249, 249, 249, 0.8);
  border-radius: 16rpx;
  padding: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #d9d919;
  margin-bottom: 20rpx;
  padding-bottom: 10rpx;
  border-bottom: 1px solid rgba(217, 217, 25, 0.3);
}

.result-content {
  width: 100%;
}

.result-item {
  margin-bottom: 16rpx;
  display: flex;
  align-items: flex-start;
}

.result-label {
  font-size: 28rpx;
  color: #666;
  width: 160rpx;
  flex-shrink: 0;
}

.result-value {
  font-size: 28rpx;
  color: #333;
  flex: 1;
  line-height: 1.5;
}

.lucky-score {
  font-weight: bold;
  color: #d9d919;
  font-size: 32rpx;
}

.score-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

.score-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.score-label {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.score-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #d9d919;
  margin-bottom: 10rpx;
}

.score-bar {
  height: 8rpx;
  background-color: #f0f0f0;
  border-radius: 4rpx;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background-color: #d9d919;
  border-radius: 4rpx;
  transition: width 0.5s ease;
}

.direction-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

.direction-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.direction-label {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.direction-value {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.detail-content {
  width: 100%;
}

.detail-item {
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.detail-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #d9d919;
  margin-bottom: 10rpx;
}

.detail-text {
  font-size: 26rpx;
  color: #333;
  line-height: 1.5;
}
</style>