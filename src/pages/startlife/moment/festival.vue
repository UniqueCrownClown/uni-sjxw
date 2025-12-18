<template>
  <view
    class="startlife-moment-festival p-4 min-h-screen"
  >
    <view class="startlife-moment-festival-container">     
      <view class="space-y-4">
        <view
          v-for="(festival, index) in sortedFestivals"
          :key="index"
          class="festival-item backdrop-blur-md bg-white/30 rounded-2xl p-4 shadow-lg border border-white/20"
        >
          <view class="flex justify-between items-start mb-2">
            <text class="text-lg font-semibold text-gray-800">{{
              festival.name
            }}</text>
            <text
              class="text-sm px-2 py-1 rounded-full"
              :class="
                festival.isUpcoming
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              "
            >
              {{ festival.isUpcoming ? "即将到来" : "已过去" }}
            </text>
          </view>

          <view class="text-sm text-gray-600 mb-2">
            <text>日期范围：{{ festival.dateRange }}</text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-sm text-gray-600">
              {{ festival.isUpcoming ? "距离假期还有" : "假期已过去" }}
            </text>
            <text
              class="text-xl font-bold"
              :class="festival.isUpcoming ? 'text-blue-600' : 'text-gray-500'"
            >
              {{ festival.countdown }} 天
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import calendar from "@/components/wan-calendar/calendar";

interface Festival {
  name: string;
  startDate?: string;
  endDate?: string;
  days: number;
  isLunar?: boolean;
  lunarStartDate?: {
    year: number;
    month: number;
    day: number;
    isLeap?: boolean;
  };
  lunarEndDate?: {
    year: number;
    month: number;
    day: number;
    isLeap?: boolean;
  };
  dateRange?: string;
  isUpcoming?: boolean;
  countdown?: number;
}

const festivals = ref<Festival[]>([
  {
    name: "元旦",
    startDate: "2026-01-01",
    endDate: "2026-01-01",
    days: 1,
    isLunar: false,
  },
  {
    name: "春节",
    isLunar: true,
    lunarStartDate: { year: 2026, month: 1, day: 1 },
    lunarEndDate: { year: 2026, month: 1, day: 8 },
    days: 8,
  },
  {
    name: "清明节",
    isLunar: false,
    startDate: "2026-04-04",
    endDate: "2026-04-06",
    days: 3,
  },
  {
    name: "劳动节",
    isLunar: false,
    startDate: "2026-05-01",
    endDate: "2026-05-05",
    days: 5,
  },
  {
    name: "端午节",
    isLunar: true,
    lunarStartDate: { year: 2026, month: 5, day: 5 },
    lunarEndDate: { year: 2026, month: 5, day: 7 },
    days: 3,
  },
  {
    name: "中秋节",
    isLunar: true,
    lunarStartDate: { year: 2026, month: 8, day: 15 },
    lunarEndDate: { year: 2026, month: 8, day: 17 },
    days: 3,
  },
  {
    name: "国庆节",
    isLunar: false,
    startDate: "2026-10-01",
    endDate: "2026-10-07",
    days: 7,
  },
]);

const currentDate = ref(new Date());

// 将农历日期转换为公历日期
const convertLunarToSolar = (lunarDate: {
  year: number;
  month: number;
  day: number;
  isLeap?: boolean;
}) => {
  const solar = calendar.lunar2solar(
    lunarDate.year,
    lunarDate.month,
    lunarDate.day,
    lunarDate.isLeap || false
  );

  if (solar === -1) {
    console.error("农历日期转换失败", lunarDate);
    return null;
  }

  return {
    year: solar.cYear,
    month: solar.cMonth,
    day: solar.cDay,
  };
};

// 处理节日数据，为农历节日计算公历日期
const processFestivals = () => {
  const processedFestivals = festivals.value.map((festival) => {
    if (festival.isLunar && festival.lunarStartDate && festival.lunarEndDate) {
      // 转换农历开始日期为公历
      const startSolar = convertLunarToSolar(festival.lunarStartDate);
      const endSolar = convertLunarToSolar(festival.lunarEndDate);

      if (startSolar && endSolar) {
        // 格式化为YYYY-MM-DD
        const startDate = `${startSolar.year}-${String(startSolar.month).padStart(
          2,
          "0"
        )}-${String(startSolar.day).padStart(2, "0")}`;
        const endDate = `${endSolar.year}-${String(endSolar.month).padStart(
          2,
          "0"
        )}-${String(endSolar.day).padStart(2, "0")}`;

        return {
          ...festival,
          startDate,
          endDate,
        };
      }
    }
    return festival;
  });

  return processedFestivals;
};

const sortedFestivals = computed(() => {
  // 处理节日数据，确保农历节日已转换为公历
  const processedFestivals = processFestivals();

  // 为每个节日添加计算属性
  const festivalsWithCountdown: (Festival & {
    dateRange: string;
    isUpcoming: boolean;
    countdown: number;
  })[] = [];
  
  processedFestivals.forEach((festival) => {
    if (!festival.startDate || !festival.endDate) {
      return;
    }

    const startDate = new Date(festival.startDate);
    const endDate = new Date(festival.endDate);

    // 计算当前日期与节日开始日期的差值（毫秒）
    const diffTime = startDate.getTime() - currentDate.value.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 判断是即将到来还是已过去
    const isUpcoming = diffDays > 0;

    // 计算倒计时天数（如果是未来的节日）或已过去天数（如果是过去的节日）
    const countdown = isUpcoming ? diffDays : Math.abs(diffDays);

    // 格式化日期范围
    const formatDate = (date: Date) => {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    };

    festivalsWithCountdown.push({
      ...festival,
      dateRange: `${formatDate(startDate)} - ${formatDate(endDate)}`,
      isUpcoming,
      countdown,
    });
  });

  // 按照是否即将到来和倒计时天数排序
  return festivalsWithCountdown.sort((a, b) => {
    // 优先显示即将到来的节日
    if (a.isUpcoming && !b.isUpcoming) return -1;
    if (!a.isUpcoming && b.isUpcoming) return 1;

    // 同样状态的节日按倒计时天数排序
    return a.countdown - b.countdown;
  });
});

// 组件挂载时更新当前日期
onMounted(() => {
  currentDate.value = new Date();
});

// 添加可以被父组件调用的刷新数据方法
const refreshData = () => {
  // 更新当前日期，以便重新计算倒计时
  currentDate.value = new Date();
};

// 导出方法，使父组件可以调用
defineExpose({
  refreshData
});
</script>

<style lang="scss" scoped>
.startlife-moment-festival {
  .festival-item {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>