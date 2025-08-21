<template>
  <view class="count">
    <u-navbar
      title="统计数据"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      back-icon-color="#fff"
    ></u-navbar>
    <view
      class="count-box u-font-xl u-flex u-row-center"
      :style="{
        background: '#83cbac',
        color: '#fff',
        borderRadius: '20rpx',
      }"
    >
      <view>当前计划:</view>
      <view>[{{ selectedPlan?.name || "计划名称" }}]</view>
    </view>
    <view class="count-box">
      <view class="u-font-xl u-p-20 u-text-center">完成情况</view>
      <view>
        <u-grid :col="2">
          <u-grid-item>
            <view class="u-font-xl u-p-20 u-text-center u-color-main">{{
              finished
            }}</view>
            <view>已完成天数</view>
          </u-grid-item>
          <u-grid-item>
            <view class="u-font-xl u-p-20 u-text-center u-color-main"
              >{{ percent }}%</view
            >
            <view>完成率</view>
          </u-grid-item>
          <u-grid-item>
            <view class="u-font-xl u-p-20 u-text-center u-color-main">{{
              current
            }}</view>
            <view>当前连续</view>
          </u-grid-item>
          <u-grid-item>
            <view class="u-font-xl u-p-20 u-text-center u-color-main">{{
              longest
            }}</view>
            <view>最长连续</view>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <view class="count-box">
      <view class="u-font-xl u-p-20 u-text-center">每周打卡记录</view>
      <view v-for="(item, index) in recordList" :key="item.week" class="u-p-20">
        <view class="u-font-lg">第{{ index + 1 }}周</view>
        <view class="u-flex u-row-around">
          <view v-for="day in days" :key="day" class="u-text-center">
            <view class="u-text-center u-p-20">{{ day }}</view>
            <view class="u-flex u-row-center"
              ><view
                :class="
                  item.day.includes(day) ? 'u-bg-active' : 'u-bg-inactive'
                "
                style="width: 30rpx; height: 30rpx; border-radius: 50%"
              >
              </view
            ></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { usePlanStore } from "@/store/modules/planStore";
import { getRecord, PlanRecord } from "@/api/modules/startlife";
import { formateDate } from "@/utils/common";

const planStore = usePlanStore();
const selectedPlan = ref(planStore.selectedPlan);

const finished = ref(0);
const current = ref(0);
const longest = ref(0);

const percent = computed(() => {
  return (finished.value / 50) * 100;
});

const days = ref(["日", "一", "二", "三", "四", "五", "六"]);
const recordList = ref([
  {
    week: 1,
    day: ["日", "一", "二", "三", "四", "五", "六"],
  },
]);
const initData = () => {
  if (selectedPlan.value?.name) {
    const data: PlanRecord[] = getRecord(selectedPlan.value?.name);
    if (data.length === 0) {
      current.value = 0;
      longest.value = 0;
      return;
    }

    // 按日期排序(假设返回数组包含date字段)
    const sortedDates = [...data].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    let currentStreak = 1;
    let maxStreak = 1;
    let prevDate = new Date(sortedDates[0].time);

    // 计算最长连续天数
    for (let i = 1; i < sortedDates.length; i += 1) {
      const currentDate = new Date(sortedDates[i].time);
      const dayDiff = Math.ceil(
        (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff === 1) {
        currentStreak += 1;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else if (dayDiff > 1) {
        currentStreak = 1;
      }
      prevDate = currentDate;
    }

    // 计算当前连续天数(判断最后打卡日是否延续到今天)
    const lastDate = new Date(sortedDates[sortedDates.length - 1].time);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysSinceLast = Math.ceil(
      (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    current.value = daysSinceLast === 0 ? currentStreak : 0;
    longest.value = maxStreak;

    // 计算从startTime所在周到endTime所在周的所有打卡记录
    const startTime = selectedPlan.value?.startTime;
    const endTime = formateDate(new Date(), "yyyy-mm-dd");
    if (startTime) {
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);

      // 获取日期所在周信息（周日为一周第一天）
      const getWeekInfo = (date: Date) => {
        const year = date.getFullYear();
        const firstDayOfYear = new Date(year, 0, 1);
        const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        const weekNumber = Math.ceil((pastDays + firstDayOfYear.getDay()) / 7);

        // 计算本周起始日（周日）
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        weekStart.setHours(0, 0, 0, 0);

        // 计算本周结束日（周六）
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        return { weekNumber, weekStart, weekEnd };
      };

      const startWeekInfo = getWeekInfo(startDate);
      const endWeekInfo = getWeekInfo(endDate);
      const totalWeeks = endWeekInfo.weekNumber - startWeekInfo.weekNumber + 1;
      const newRecordList = [];

      // 遍历计算每周打卡情况
      for (let i = 0; i < totalWeeks; i += 1) {
        // 计算当前周的起始日期
        const currentWeekStart = new Date(startWeekInfo.weekStart);
        currentWeekStart.setDate(currentWeekStart.getDate() + i * 7);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

        // 筛选本周打卡记录
        const weeklyRecords = sortedDates.filter((record) => {
          const recordDate = new Date(record.time);
          return recordDate >= currentWeekStart && recordDate <= currentWeekEnd;
        });

        // 提取并排序打卡星期
        const weekDays = [
          ...new Set(
            weeklyRecords.map((record) => {
              const day = new Date(record.time).getDay();
              return days.value[day];
            })
          ),
        ].sort((a, b) => {
          return days.value.indexOf(a) - days.value.indexOf(b);
        });

        newRecordList.push({
          week: i + 1, // 周序号从1开始
          day: weekDays,
        });
      }

      recordList.value = newRecordList;
    }
  }
};

onMounted(() => {
  finished.value = selectedPlan.value?.count || 0;
  initData();
});
</script>

<style lang="scss" scoped>
.count {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.count-box {
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
</style>
