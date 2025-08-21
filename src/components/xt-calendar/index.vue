<template>
  <view class="calendar-wrapper">
    <!-- 日历头部导航 -->
    <view class="calendar-header">
      <u-icon
        name="arrow-left-double"
        size="24"
        color="#8ad2b3"
        @click="prevYear"
      ></u-icon>
      <u-icon
        name="arrow-left"
        size="24"
        color="#8ad2b3"
        @click="prevMonth"
      ></u-icon>

      <view class="current-date" @click="showDatePicker = true">
        <text class="year">{{ currentYear }}年</text>
        <text class="month">{{ currentMonth + 1 }}月</text>
      </view>

      <u-icon
        name="arrow-right"
        size="24"
        color="#8ad2b3"
        @click="nextMonth"
      ></u-icon>
      <u-icon
        name="arrow-right-double"
        size="24"
        color="#8ad2b3"
        @click="nextYear"
      ></u-icon>
    </view>

    <!-- 星期标题 -->
    <view class="weekdays">
      <view class="weekday" v-for="(day, index) in weekdays" :key="index">
        <text :class="{ weekend: index === 0 || index === 6 }">{{ day }}</text>
      </view>
    </view>

    <!-- 日历主体网格 -->
    <view class="calendar-grid">
      <!-- 上个月的补充日期 -->
      <view
        class="date-item prev-month"
        v-for="(day, index) in prevMonthDays"
        :key="'prev-' + index"
      >
        {{ day }}
      </view>

      <!-- 当前月的日期 -->
      <view
        class="date-item current-month"
        v-for="(day, index) in currentMonthDays"
        :key="'current-' + index"
        :class="{
          today: isToday(day),
          selected: isSelected(day),
          weekend: isWeekend(day, index),
        }"
        @click="selectDate(day)"
        @longpress="handleDateLongPress(day)"
      >
        {{ day }}
        <view v-if="hasEvent(day)" class="event-indicator"></view>
      </view>

      <!-- 下个月的补充日期 -->
      <view
        class="date-item next-month"
        v-for="(day, index) in nextMonthDays"
        :key="'next-' + index"
      >
        {{ day }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

// 定义组件属性
const props = withDefaults(
  defineProps<{
    // 初始日期，默认为今天
    initialDate?: Date;
    // 可选择的最小日期
    minDate?: Date;
    // 可选择的最大日期
    maxDate?: Date;
    // 包含事件的日期列表
    eventDates?: Date[];
  }>(),
  {
    eventDates: () => [],
  }
);

// 定义组件事件
const emits = defineEmits<{
  // 日期选择事件
  (e: "dateSelect", date: Date): void;
  // 日期长按事件
  (e: "dateLongPress", date: Date): void;
  // 月份切换事件
  (e: "monthChange", year: number, month: number): void;
}>();

// 星期标题
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

// 今天的日期
const today = new Date();

// 当前显示的年月
const currentYear = ref<number>(today.getFullYear());
const currentMonth = ref<number>(today.getMonth());

// 选中的日期
const selectedDate = ref<Date>(props.initialDate || new Date());

// 日期选择器显示状态
const showDatePicker = ref<boolean>(false);

// 计算当前月的第一天是星期几 (0-6, 0是星期日)
const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

// 计算当前月的天数
const daysInCurrentMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

// 计算上个月的天数
const daysInPrevMonth = computed(() => {
  if (currentMonth.value === 0) {
    return new Date(currentYear.value - 1, 11, 0).getDate();
  }
  return new Date(currentYear.value, currentMonth.value, 0).getDate();
});

// 上个月需要显示的日期
const prevMonthDays = computed(() => {
  const days: number[] = [];
  // 上个月需要显示的天数等于当月第一天是星期几
  for (let i = 0; i < firstDayOfMonth.value; i += 1) {
    days.push(daysInPrevMonth.value - firstDayOfMonth.value + 1 + i);
  }
  return days;
});

// 当前月的日期
const currentMonthDays = computed(() => {
  const days: number[] = [];
  for (let i = 1; i <= daysInCurrentMonth.value; i += 1) {
    days.push(i);
  }
  return days;
});

// 下个月需要显示的日期
const nextMonthDays = computed(() => {
  const days: number[] = [];
  // 总共需要显示的日期数量应该是6行*7列=42天，确保日历显示完整
  const totalDays = prevMonthDays.value.length + currentMonthDays.value.length;
  const needNextDays = 42 - totalDays;

  for (let i = 1; i <= needNextDays; i += 1) {
    days.push(i);
  }
  return days;
});

// 判断日期是否为周末
const isWeekend = (day: number, index: number) => {
  const dayOfWeek = (firstDayOfMonth.value + index) % 7;
  return dayOfWeek === 0 || dayOfWeek === 6;
};

// 判断是否是今天
const isToday = (day: number) => {
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};

// 判断是否是选中的日期
const isSelected = (day: number) => {
  return (
    day === selectedDate.value.getDate() &&
    currentMonth.value === selectedDate.value.getMonth() &&
    currentYear.value === selectedDate.value.getFullYear()
  );
};

// 判断日期是否有事件
const hasEvent = (day: number) => {
  if (!props.eventDates || props.eventDates.length === 0) return false;

  const date = new Date(currentYear.value, currentMonth.value, day);
  return props.eventDates.some(
    (eventDate) =>
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
  );
};

// 判断日期是否可选择
const isDateSelectable = (day: number) => {
  const date = new Date(currentYear.value, currentMonth.value, day);

  if (props.minDate && date < props.minDate) return false;
  if (props.maxDate && date > props.maxDate) return false;

  return true;
};

// 选择日期
const selectDate = (day: number) => {
  if (!isDateSelectable(day)) return;

  const newDate = new Date(currentYear.value, currentMonth.value, day);
  selectedDate.value = newDate;
  emits("dateSelect", newDate);
};

// 处理日期长按事件
const handleDateLongPress = (day: number) => {
  if (!isDateSelectable(day)) return;
  emits("dateLongPress", new Date(currentYear.value, currentMonth.value, day));
};

// 切换到上一个月
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
  emits("monthChange", currentYear.value, currentMonth.value);
};

// 切换到下一个月
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
  emits("monthChange", currentYear.value, currentMonth.value);
};

// 切换到上一年
const prevYear = () => {
  currentYear.value -= 1;
  emits("monthChange", currentYear.value, currentMonth.value);
};

// 切换到下一年
const nextYear = () => {
  currentYear.value += 1;

  emits("monthChange", currentYear.value, currentMonth.value);
};

// 处理日期选择器变化
const handleDatePickerChange = (e: { value: string }) => {
  const [year, month] = e.value.split("-").map(Number);
  currentYear.value = year;
  currentMonth.value = month - 1; // 月份从0开始
  emits("monthChange", currentYear.value, currentMonth.value);
};

// 监听初始日期变化
watch(
  () => props.initialDate,
  (newVal) => {
    if (newVal) {
      selectedDate.value = newVal;
      currentYear.value = newVal.getFullYear();
      currentMonth.value = newVal.getMonth();
    }
  },
  { immediate: true }
);

// 初始化
onMounted(() => {
  // 确保选中日期在当前显示的月份
  if (
    selectedDate.value.getFullYear() !== currentYear.value ||
    selectedDate.value.getMonth() !== currentMonth.value
  ) {
    currentYear.value = selectedDate.value.getFullYear();
    currentMonth.value = selectedDate.value.getMonth();
  }
});
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* 头部导航样式 */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
}

.nav-btn {
  background: #e3e3e3;
  border: none;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.nav-btn-hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.current-date {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.current-date:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.year {
  font-size: 18px;
  color: #333;
}

.month {
  font-size: 18px;
  color: #333;
}

/* 星期标题样式 */
.weekdays {
  display: flex;
  border-bottom: 1px solid #eee;
}

.weekday {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
}

.weekday .weekend {
  color: $main-color-heavily;
}

/* 日历网格样式 */
.calendar-grid {
  display: flex;
  flex-wrap: wrap;
}

.date-item {
  width: 14.2857%; /* 7列，每列占1/7 */
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  box-sizing: border-box;
  position: relative;
}

/* 清除每行最后一个元素的右边框 */
.date-item:nth-child(7n) {
  border-right: none;
}

/* 上个月和下个月的日期样式 */
.prev-month,
.next-month {
  color: #c9cdd4;
  cursor: default;
}

/* 当前月的日期样式 */
.current-month {
  cursor: pointer;
  transition: background-color 0.2s;
}

.current-month:not(.selected):active {
  background-color: #f0f0f0;
}

/* 今天的样式 */
.today {
  font-weight: 600;
  color: $main-color;
}

/* 选中日期的样式 */
.selected {
  color: $main-color !important;
  border-radius: 50%;
  border: 2px solid $main-color;
  font-weight: 600;
}

/* 周末样式 */
.weekend {
  color: $main-color-heavily;
}

/* 事件指示器 */
.event-indicator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: $main-color;
  margin-top: 4px;
  position: absolute;
  bottom: 4px;
}

/* 日期选择器弹窗样式 */
.date-picker-container {
  background-color: #fff;
  padding: 14px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

.picker-title {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
  color: #333;
}

.confirm-btn {
  width: 100%;
  height: 48px;
  background-color: $main-color;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 14px;
}
</style>
