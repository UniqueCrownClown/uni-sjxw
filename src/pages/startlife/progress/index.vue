<template>
  <view class="progress">
    <u-navbar
      :title="navName"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      :back-icon-size="0"
      :back-text-style="{ height: 0 }"
    ></u-navbar>
    <view class="u-p-t-80" v-if="isEmptyPlan">
      <view class="u-font-xl u-text-center u-m-b-20">
        <text>您还没有创建任何计划</text>
      </view>
      <view class="u-flex u-row-center u-m-b-20">
        <view style="width: 400rpx">
          <u-button type="primary" shape="circle" @click="handleClick"
            >立即创建</u-button
          >
        </view>
      </view>
      <view class="u-font-sm u-text-center u-m-b-20">
        <text> 创建计划后将可视化展示完成天数</text>
      </view>
      <view class="u-text-center">
        <image src="https://s21.ax1x.com/2025/08/19/pVBNi5Q.png"></image>
      </view>
    </view>
    <view v-else>
      <view class="u-flex u-row-between u-m-20">
        <u-button type="primary" @click="handleGainClick" v-if="false"
          >获取积分</u-button
        >
        <u-button type="primary" @click="handleRankClick" v-if="false"
          >打卡排行榜</u-button
        >
      </view>
      <view class="u-font-xl u-text-center u-m-b-20">
        <text>您已创建计划</text>
      </view>
      <view class="progress-block">
        <view
          class="progress-block-main"
          style="width: 90%; border-radius: 20rpx"
        >
          <view class="progress-block-main-item u-flex u-row-center">
            <u-icon name="/static/assets/svg/10008.svg" size="40"></u-icon>
            <text class="u-font-lg u-p-10 u-m-l-10" style="color: #333">进度日历</text>
          </view>
          <view
            class="progress-block-main-item u-font-xl"
            style="
              height: 120rpx;
              line-height: 120rpx;
              background: #f3f3f2;
              font-weight: bold;
              border-radius: 0 0 20rpx 20rpx;
            "
          >
            Day{{ currentDay }}/50</view
          >
        </view>
        <view class="u-text-center" style="width: 100%; margin-top: 20rpx">
          <text>{{ cStartTime }}-{{ cEndTime }}</text>
        </view>
        <view style="width: 100%; margin-top: 20rpx">
          <u-line-progress
            :striped="true"
            :percent="currentPercent"
            active-color="#8ad2b3"
            :striped-active="true"
          ></u-line-progress>
        </view>
        <view style="width: 100%; text-align: right; margin-top: 20rpx"
          ><u-icon
            name="hourglass-half-fill"
            size="26"
            color="#8ad2b3"
          ></u-icon>
          <text>重启进度{{ currentPercent }}%</text></view
        >
      </view>
      <view>
        <view v-for="item in planList" :key="item.name" class="progress-block">
          <view class="u-font-sm u-text-center u-m-b-20">
            <view class="u-flex u-row-between u-p-20">
              <view class="u-font-lg"
                ><text style="font-weight: bold">{{ item.name }}</text
                ><text>({{ item.startTime }})</text></view
              >
              <view style="white-space: nowrap">
                <u-icon
                  name="checkmark-circle-fill"
                  size="28"
                  color="#8ad2b3"
                ></u-icon>
                <text>{{ calcDay(item.day) }}天</text>
                <u-icon name="file-text" size="28" color="#8ad2b3"></u-icon>
                <text>{{ calcPercent(item.day) }}%</text>
              </view>
            </view>

            <view class="block-container">
              <view
                v-for="elem in 50"
                :key="elem"
                :class="[
                  'block-item',
                  item.day.split(',').includes(String(elem))
                    ? 'block-item-active'
                    : '',
                ]"
                >{{ elem }}</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { formateDate } from "@/utils/common";
import { getPlans, Plan, getRecord } from "@/api/modules/startlife";
import { usePlanStore } from "@/store/modules/planStore";
import { themeName } from "@/utils/tips";

const planStore = usePlanStore();

const navName = ref(themeName);

const handleClick = () => {
  planStore.setIsEdit(false);
  uni.navigateTo({
    url: "/pages/startlife/index/create",
  });
};

const isEmptyPlan = ref(false);

const currentDay = ref(0);
const cStartTime = ref("");
const cEndTime = ref("");

const currentPercent = computed(() => {
  return ((currentDay.value / 50) * 100).toFixed();
});
const planList = ref([
  {
    name: "每天运动30分钟",
    day: "1,2,3,4,5,6,7,8,9",
    startTime: "1994-07-24",
  },
]);

const calcDay = (day: string) => {
  return day.split(",").length;
};

const calcPercent = (day: string) => {
  return (day.split(",").length / 50) * 100;
};

const calcCurrentDay = (
  startTime: string,
  endTime: string = formateDate(new Date(), "yyyy-mm-dd")
) => {
  const end = new Date(endTime);
  const start = new Date(startTime);
  const diff = end.getTime() - start.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return day + 1;
};

const handleGainClick = () => {
  uni.showToast({
    title: "敬请期待",
  });
};

const handleRankClick = () => {
  uni.showToast({
    title: "敬请期待",
  });
};

const initData = () => {
  const myPlans = getPlans();
  if (!myPlans || myPlans.length === 0) {
    isEmptyPlan.value = true;
  } else {
    isEmptyPlan.value = false;

    // 取默认的plan来计算
    const data = getPlans();

    cStartTime.value = data.find((item: Plan) => item.checked)?.startTime;
    cEndTime.value = data.find((item: Plan) => item.checked)?.endTime;

    currentDay.value = calcCurrentDay(cStartTime.value);
    const getDayCount = (name: string, startTime: string) => {
      const recordData = getRecord(name);
      return recordData
        .map((item: any) => calcCurrentDay(startTime, item.time))
        .join(",");
    };

    planList.value = data.map((item: any) => {
      return {
        ...item,
        day: getDayCount(item.name, item.startTime),
      };
    });
  }
};

// onMounted(() => {
//   initData();
// });

onShow(() => {
  initData();
});
</script>
<style lang="scss" scoped>
.progress {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.block-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  /* 设置块与块之间的间隔 */
  margin-left: 10rpx;
}

.block-item {
  width: calc(10% - 10rpx);
  /* 每行 10 个块，减去间隔的宽度 */
  aspect-ratio: 1 / 1;
  background-color: #f3f3f3;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}

.block-item-active {
  background-color: $main-color;
  color: #fff;
}

.progress-block {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 20rpx;
}

.progress-block-main {
  background: $main-color;

  .progress-block-main-item {
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
  }
}
</style>
