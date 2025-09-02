<template>
  <view class="every">
    <u-navbar
      title="每日打卡"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      :back-icon-size="0"
      :back-text-style="{ height: 0 }"
    ></u-navbar>
    <view class="u-p-t-80" v-if="isEmptyPlan">
      <view class="u-font-xl u-text-center u-m-b-20">
        <text> 还没有进行中的计划 </text>
      </view>
      <view class="u-font-sm u-text-center u-m-b-20">
        <text> {{ tipText }} </text>
      </view>
      <view class="u-flex u-row-center">
        <view style="width: 400rpx">
          <u-button type="primary" shape="circle" @click="handleClick"
            >创建计划</u-button
          >
        </view>
      </view>
    </view>
    <view v-else style="width: 100%; height: 100%">
      <view class="every-block">
        <view class="u-flex u-row-between">
          <view class="u-font-xl u-text-center u-p-20">
            <u-icon name="clock-fill" size="32" style="color: #8ad2b3"></u-icon>
            <text> 切换计划 </text>
          </view>
          <view>
            <view
              class="u-font-lg u-text-center u-p-20"
              @click="showPlan = true"
            >
              <text> {{ currentPlan }} </text>
              <u-icon
                name="arrow-down"
                size="32"
                style="color: #8ad2b3; padding-left: 16rpx"
              ></u-icon>
            </view>
            <u-popup
              v-model="showPlan"
              mode="bottom"
              border-radius="14"
              :closeable="true"
            >
              <view>
                <view class="sheet-header u-p-40 u-font-xl">切换计划</view>
                <view class="sheet-main u-p-10">
                  <view
                    v-for="(item, index) in planList"
                    :key="item.name"
                    @click="handleChange(index)"
                    class="u-flex"
                    :class="{ 'u-bg-active': item.name === currentPlan }"
                  >
                    <view class="u-p-l-40 u-p-r-40">
                      <u-icon
                        name="/static/assets/svg/10009.svg"
                        size="40"
                      ></u-icon>
                    </view>
                    <view class="u-flex-1">
                      <view class="u-font-lg u-p-10">{{ item.name }}</view>
                      <view class="u-font-sm u-p-10"
                        >完成率: {{ item.percent }}%</view
                      >
                    </view>
                  </view>
                </view>
                <view class="sheet-footer u-p-10">
                  <u-button type="primary" shape="circle" @click="handleClick"
                    >创建计划</u-button
                  >
                </view>
              </view>
            </u-popup>
          </view>
        </view>
      </view>

      <view class="every-block">
        <view class="every-block-header">选择日期</view>
        <view>
          <xtCalendar
            @dateSelect="handleDateSelect"
            :eventDates="eventDates"
            :minDate="minDate"
            :maxDate="maxDate"
          />
        </view>
      </view>
      <view class="every-block">
        <view class="every-block-header">{{ cardDate }}打卡</view>
        <view
          class="u-font-lg u-p-20 u-m-20"
          style="background: #f3f3f3; border-radius: 20rpx"
        >
          <u-icon name="checkmark-circle-fill" size="28" class="u-p-r-20">
          </u-icon>
          <text>{{ cardTips }}</text>
        </view>
        <view class="u-flex u-row-center" v-if="canCard">
          <view style="width: 50%"
            ><u-button
              :type="cardBtnTips === '取消打卡' ? 'default' : 'primary'"
              shape="circle"
              @click="handleRecord"
              :disabled="cardBtnTips === '不可打卡'"
              >{{ cardBtnTips }}</u-button
            ></view
          >
        </view>
      </view>
      <view class="every-block">
        <view class="every-block-header">
          <text> 勋章墙 </text>
        </view>
        <view class="u-flex u-row-center u-row-wrap u-p-20">
          <view v-for="item in wallList" :key="item.id">
            <view
              class="u-flex u-row-center"
              :class="item.unlock ? 'u-opacity-10' : 'u-opacity-5'"
              @click="handleZhangClick(item)"
            >
              <view>
                <u-image
                  :src="item.iconPath"
                  width="120rpx"
                  height="120rpx"
                ></u-image>
                <view class="u-font-sm u-p-10" style="white-space: nowrap">{{
                  item.name
                }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="u-flex u-row-center" u-p-20 style="color: #dd6161"
          >点击已解锁的勋章可生成分享图片</view
        >
      </view>
      <view class="every-block">
        <view class="every-block-header">打卡说明</view>
        <view class="u-m-20"><text>1. 每天可以在当天打卡</text></view>
        <view class="u-m-20"><text>2. 错过当天可以在3天内补卡</text></view>
        <view class="u-m-20"><text>3. 坚持打卡50天，完成你的目标</text></view>
      </view>
    </view>
    <u-popup v-model="show" mode="center" border-radius="14">
      <view class="u-p-20">
        <view
          class="u-font-xl u-text-center u-p-20"
          style="border-bottom: 1px solid #f3f3f3"
          >分享成就</view
        >
        <view v-if="!isPoster">
          <view class="u-flex u-row-center u-p-20">
            <u-image
              src="https://s21.ax1x.com/2025/08/18/pVBV1aT.md.png"
              width="120rpx"
              height="120rpx"
            ></u-image>
            <view class="u-p-l-20">
              <view>{{ currentZhang }}</view>
              <view>{{ currentZhangTips }}</view>
            </view>
          </view>
          <view
            class="u-flex u-row-between u-p-20"
            style="border-top: 1px solid #f3f3f3"
          >
            <u-button @click="show = false">取消</u-button
            ><u-button type="primary" @click="handleShare"
              >生成海报</u-button
            ></view
          >
        </view>
        <view v-else>
          <view>
            <dynamic-poster
              ref="dynamicPosterRef"
              :background-image="posterBg"
              :text-items="textItems"
              :qr-code-options="qrOptions"
              :canvasSize="canvasSize"
            ></dynamic-poster>
          </view>
          <view
            class="u-flex u-row-between u-p-20"
            style="border-top: 1px solid #f3f3f3"
          >
            <u-button @click="show = false">取消</u-button
            ><u-button type="primary" @click="handleSave">保存图片</u-button>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { formateDate } from "@/utils/common";
import { recordTips, zhangTips } from "@/utils/tips";

import dynamicPoster from "@/components/dynamic-poster/index.vue";
import xtCalendar from "@/components/xt-calendar/index.vue";
import {
  getPlans,
  getRecord,
  addRecord,
  deleteRecord,
  updatePlan,
  Plan,
} from "@/api/modules/startlife";

import { usePlanStore } from "@/store/modules/planStore";

const planStore = usePlanStore();

// 定义计划项的类型
interface PlanItem extends Plan {}

const handleClick = () => {
  planStore.setIsEdit(false);
  uni.navigateTo({
    url: "/pages/startlife/index/create",
  });
};

const tipText = ref(recordTips);

const isEmptyPlan = ref(false);

const wallList = ref([
  {
    id: 1,
    name: "坚持10天",
    iconPath: "https://s21.ax1x.com/2025/08/18/pVBV1aT.md.png",
    unlock: false,
  },
  {
    id: 2,
    name: "坚持20天",
    iconPath: "https://s21.ax1x.com/2025/08/18/pVBVGiF.md.png",
    unlock: false,
  },
  {
    id: 3,
    name: "坚持30天",
    iconPath: "https://s21.ax1x.com/2025/08/18/pVBV3IU.md.png",
    unlock: false,
  },
  {
    id: 4,
    name: "坚持40天",
    iconPath: "https://s21.ax1x.com/2025/08/18/pVBVlZV.md.png",
    unlock: false,
  },
  {
    id: 5,
    name: "坚持50天",
    iconPath: "https://s21.ax1x.com/2025/08/18/pVBVJG4.md.png",
    unlock: false,
  },
]);

const showPlan = ref(false);
const planList = ref<PlanItem[]>([]);
const currentPlan = ref<string>("");

const cardDate = ref(formateDate(new Date(), "yyyy-mm-dd"));

const cardTips = ref("未完成打卡");
const cardBtnTips = ref("完成打卡");

const canCard = computed(() => {
  const today = new Date();
  // 去除时间部分，只保留日期
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(cardDate.value);
  // 去除时间部分，只保留日期
  selectedDate.setHours(0, 0, 0, 0);
  const diff = selectedDate.getTime() - today.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffDays < -3 || diffDays > 0) {
    return false;
  }
  return true;
});

const checkUnlock = () => {
  // 根据打卡次数判断是否解锁
  const myPlans = getPlans();
  const plan = myPlans.find((item: any) => item.name === currentPlan.value);
  const thresholds = [10, 20, 30, 40, 50];

  thresholds.forEach((threshold, index) => {
    if (plan.count >= threshold) {
      wallList.value.forEach((item: any) => {
        if (item.id <= index + 1) {
          // eslint-disable-next-line no-param-reassign
          item.unlock = true;
        }
      });
    }
  });
};

const eventDates = ref([]);

const minDate = ref();
const maxDate = ref();

const handleDateSelect = (day: any) => {
  const value = formateDate(new Date(day), "yyyy-mm-dd");
  cardDate.value = value;
  // 判断是不是3天内的打卡日期
  const today = new Date();
  // 去除时间部分，只保留日期
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(value);
  // 去除时间部分，只保留日期
  selectedDate.setHours(0, 0, 0, 0);
  const diff = selectedDate.getTime() - today.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffDays < -3 || diffDays > 0) {
    cardTips.value = "超出补打卡时间范围,无法打卡";
    cardBtnTips.value = "不可打卡";
    return;
  }
  // 检查是否完成打卡
  const planName = currentPlan.value;
  const data = getRecord(planName);
  if (data.some((item: any) => item.time === value)) {
    cardTips.value = "已完成打卡";
    cardBtnTips.value = "取消打卡";
    return;
  }
  cardTips.value = "未完成打卡";
  cardBtnTips.value = "完成打卡";
};

const getEventDates = (planName: string) => {
  const records = getRecord(planName);
  return records.map((item: any) => new Date(item.time));
};

const handleRecord = () => {
  if (!canCard.value) {
    return;
  }
  // 打卡
  if (cardBtnTips.value === "完成打卡") {
    addRecord({
      time: cardDate.value,
      planName: currentPlan.value,
      content: "",
    });
    // 增加计划的打卡次数
    const myPlans = getPlans();
    const plan = myPlans.find((item: any) => item.name === currentPlan.value);
    plan.count += 1;
    updatePlan(plan);
    // 更新planList
    planList.value = myPlans.map((item: Plan) => {
      return {
        ...item,
        percent: ((item.count / 50) * 100).toFixed(),
      };
    });
    // 检查是否解锁
    checkUnlock();

    uni.showToast({
      title: "打卡成功",
      icon: "success",
      success: () => {
        // 刷新一下当前月的事件
        eventDates.value = getEventDates(currentPlan.value);
      },
    });
  } else {
    // 取消打卡
    deleteRecord(currentPlan.value, cardDate.value);
    // 减少计划的打卡次数
    const myPlans = getPlans();
    const plan = myPlans.find((item: any) => item.name === currentPlan.value);
    plan.count -= 1;
    updatePlan(plan);

    uni.showToast({
      title: "取消打卡成功",
      icon: "success",
      success: () => {
        // 刷新一下当前月的事件
        eventDates.value = getEventDates(currentPlan.value);
      },
    });
  }

  // 刷新数据
  handleDateSelect(cardDate.value);
};

const show = ref(false);
const modalTitle = ref("");
const currentZhang = ref("");
const currentZhangTips = ref("");

const isPoster = ref(false);

const { windowWidth } = uni.getWindowInfo();
const width = windowWidth - 120;

const height = (width * 16) / 9;

const canvasSize = ref({
  width,
  height,
});

const handleZhangClick = (data: {
  id: number;
  name: string;
  iconPath: string;
  unlock: boolean;
}) => {
  if (!data.unlock) {
    uni.showToast({
      title: "该勋章尚未解锁，加油吧！",
      icon: "none",
    });
  } else {
    modalTitle.value = "分享成就";
    isPoster.value = false;
    currentZhang.value = data.name || "";
    currentZhangTips.value =
      zhangTips.find((elem: any) => elem.name === currentZhang.value)
        ?.content || "";

    show.value = true;
  }
};

const dynamicPosterRef = ref<any>(null);
// 自定义海报内容
const posterBg = ref("https://s21.ax1x.com/2025/08/19/pVBB7QJ.png");

// 动态文字内容
const textItems = ref<any>([]);

// 二维码位置和大小
const qrOptions = ref<any>({});

const handleShare = () => {
  textItems.value = [
    {
      text: `我正在挑战[${currentPlan.value}]`,
      x: 9999,
      y: 30,
      font: "500 16px PingFang SC,Microsoft YaHei,sans-serif",
      color: "#ffffff",
    },
    {
      text: `${currentZhangTips.value}`,
      x: 9999,
      y: height - 120,
      font: "14px PingFang SC, sans-serif",
      color: "#666",
    },
  ];
  qrOptions.value = {
    src: "",
    x: width - 80,
    y: height - 60,
    width: 50,
    height: 50,
  };
  isPoster.value = true;
};

const handleSave = () => {
  dynamicPosterRef.value.savePoster();
};
const handleChangePlan = (plan: Plan) => {
  // 设置选中的计划
  currentPlan.value = plan.name;

  // 限制可选日期
  minDate.value = plan.startTime;

  maxDate.value = plan.endTime;

  // 刷新一下当前月的事件
  eventDates.value = getEventDates(currentPlan.value);
  // 查询记录
  handleDateSelect(cardDate.value);
  // 检查哪些需要解锁
  checkUnlock();
};
const handleChange = (index: number) => {
  // 刷新数据
  handleChangePlan(planList.value[index]);
  showPlan.value = false;
};

const initData = () => {
  // 查询计划
  const myPlans = getPlans();

  if (!myPlans || myPlans.length === 0) {
    isEmptyPlan.value = true;
  } else {
    isEmptyPlan.value = false;
    planList.value = myPlans.map((item: Plan) => {
      return {
        ...item,
        percent: ((item.count / 50) * 100).toFixed(),
      };
    });
    const plan = planStore.selectedPlan || planList.value[0];
    handleChangePlan(plan);
  }
};

onShow(() => {
  initData();
});
</script>
<style lang="scss" scoped>
.every {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.every-block {
  background-color: #fff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 20rpx;

  .every-block-header {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    border-left: 4rpx solid $main-color;
    text-indent: 20rpx;
    margin: 20rpx 0;
  }
}
.u-bg-active {
  color: #fff;
  background: linear-gradient(to bottom right, #4f9679 0%, #98e0c0 100%);
  border-radius: 10px;
}
</style>
