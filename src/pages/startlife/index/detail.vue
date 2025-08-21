<template>
  <view class="detail">
    <u-navbar
      title="计划详情"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      back-icon-color="#fff"
    ></u-navbar>
    <view class="detail-box u-flex u-row-between">
      <view>
        <view class="u-font-xl">{{ selectedPlan?.name || "计划名称" }}</view>

        <view>{{ selectedPlan?.content || "计划描述" }}</view>
      </view>
      <view style="white-space: nowrap; color: #666">进行中</view>
    </view>
    <view>
      <view class="u-flex u-row-around">
        <view>
          <u-button type="primary" @click="handleCard">去打卡</u-button>
        </view>
        <view offset="1">
          <u-button @click="handleEdit">编辑</u-button>
        </view>
        <view offset="1">
          <u-button @click="handleCount">统计</u-button>
        </view>
        <view>
          <u-button type="error" @click="handleDelete">删除</u-button>
        </view>
      </view>
    </view>
    <view class="detail-box">
      <view class="detail-box-header">计划进度</view>
      <view>
        <view class="u-flex u-row-between u-p-20">
          <view>
            <view>已完成天数</view>
            <view class="u-font-lg u-p-10 u-text-center">{{ finished }}</view>
          </view>
          <view>
            <view>总天数</view>
            <view class="u-font-lg u-p-10 u-text-center">{{ total }}</view>
          </view>
          <view>
            <view>剩余天数</view>
            <view class="u-font-lg u-p-10 u-text-center">{{ remaining }}</view>
          </view>
        </view>
        <u-line-progress
          :striped="true"
          :percent="percent"
          :striped-active="true"
        ></u-line-progress>
        <view class="u-p-20 u-text-right"
          >完成率:<text>{{ percent }}%</text></view
        >
      </view>
      <view
        class="u-flex u-row-center u-p-20"
        style="font-weight: 700; color: #333"
        ><text>{{ percentWords }}</text>
      </view>
    </view>
    <view class="detail-box">
      <view class="detail-box-header">计划详情</view>
      <view class="detail-box-main">
        <view class="u-flex u-row-between u-p-20">
          <text>计划类型</text>
          <text>{{
            selectedPlan?.type === "1" ? "简单打卡" : "记录数据"
          }}</text>
        </view>
        <view class="u-flex u-row-between u-p-20">
          <text>开始日期</text>
          <text>{{ selectedPlan?.startTime }}</text>
        </view>
        <view class="u-flex u-row-between u-p-20">
          <text>结束日期</text>
          <text>{{ selectedPlan?.endTime }}</text>
        </view>
      </view>
    </view>
    <view class="detail-box">
      <view class="detail-box-header">勋章进度</view>
      <view class="u-flex u-row-center u-row-wrap u-p-20">
        <view v-for="item in wallList" :key="item.id">
          <view class="u-flex u-row-center" style="opacity: 0.5">
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
      <view class="u-flex u-row-center" u-p-20 style="color: #dd6161">
        再坚持{{ stepRemain }}天即可解锁勋章</view
      >
    </view>
    <view class="detail-box">
      <view class="detail-box-header">最近打卡记录</view>
      <view class="detail-box-main" v-if="recordList.length === 0"
        >暂无打卡记录</view
      >
      <view>
        <view>
          <view
            class="u-flex u-row-between u-p-20"
            v-for="item in recordList"
            :key="item.time"
          >
            <text>{{ item.time }}</text>

            <text>已打卡</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { usePlanStore } from "@/store/modules/planStore";
import { deletePlan, getRecord } from "@/api/modules/startlife";
import { progressTips } from "@/utils/tips";

const planStore = usePlanStore();

const selectedPlan = ref(planStore.selectedPlan);

const total = ref(50);
const finished = ref(0);
const remaining = computed(() => {
  return total.value - finished.value;
});
const stepRemain = computed(() => {
  const thresholds = [10, 20, 30, 40, 50];
  for (const threshold of thresholds) {
    if (finished.value < threshold) {
      return threshold - finished.value;
    }
  }
  return 0;
});

const percent = computed(() => {
  return (finished.value / total.value) * 100;
});

const percentWords = computed(() => {
  const progress = Math.floor(percent.value);
  let word = "";
  progressTips.some((item) => {
    if (progress >= Number(item.progress)) {
      word = item.words;
      return true;
    }
    return false;
  });
  return word;
});

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
const handleCard = () => {
  uni.switchTab({
    url: "/pages/startlife/every/index",
  });
};
const handleEdit = () => {
  planStore.setIsEdit(true);
  uni.navigateTo({
    url: "/pages/startlife/index/create",
  });
};
const handleCount = () => {
  uni.navigateTo({
    url: "/pages/startlife/index/count",
  });
};
const handleDelete = () => {
  uni.showModal({
    title: "提示",
    content: "确定删除该计划吗？",
    success: (res) => {
      if (res.confirm) {
        if (selectedPlan.value?.name) {
          deletePlan(selectedPlan.value.name);
        }
        uni
          .showToast({
            title: "删除成功",
            icon: "success",
          })
          .then(() => {
            planStore.clearSelectedPlan();
            planStore.setIsEdit(false);
            planStore.clearTempPlan();
            // 回到首页
            uni.switchTab({
              url: "/pages/startlife/index/index",
            });
          });
      }
    },
  });
};
const recordList = ref<{ time: string; planName: string }[]>([]);
const initData = () => {
  if (selectedPlan.value?.name) {
    recordList.value = getRecord(selectedPlan.value?.name);
  }
};
onMounted(() => {
  finished.value = selectedPlan.value?.count || 0;
  initData();
});
</script>
<style lang="scss" scoped>
.detail {
  background-color: #f5f5f5;
  padding: 20rpx;
  min-height: 100vh;
}

.detail-box {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  margin: 20rpx;

  .detail-box-header {
    font-size: 30rpx;
    font-weight: 600;
    color: #333;
    border-bottom: 1rpx solid #f3f3f3;
    padding: 20rpx;
  }

  .detail-box-main {
    padding: 20rpx;
  }
}
</style>
