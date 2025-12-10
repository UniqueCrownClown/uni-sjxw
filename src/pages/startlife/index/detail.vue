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
          <u-button @click="handleCard">去打卡</u-button>
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
            <view class="u-font-xl u-p-10 u-text-center">{{ finished }}</view>
          </view>
          <view>
            <view>总天数</view>
            <view class="u-font-xl u-p-10 u-text-center">{{ total }}</view>
          </view>
          <view>
            <view>未完成天数</view>
            <view class="u-font-xl u-p-10 u-text-center text-rose">{{ remaining }}</view>
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
        ><text class="u-m-r-10">{{ percentWords }}</text>
        <u-icon :name="percentEmotion" size="40"></u-icon>
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
              src="https://crownclown.xyz/startlife/zhang10.png"
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
import { ref, onMounted, computed } from "vue";
import { usePlanStore } from "@/store/modules/planStore";
import { deletePlan, getRecord } from "@/api/modules/startlife";
import { dingImgArr, progressTips, zhangTips } from "@/utils/tips";
import dynamicPoster from "@/components/dynamic-poster/index.vue";
import { formateDate } from "@/utils/common";

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
  return ((finished.value / total.value) * 100).toFixed();
});

const percentWords = computed(() => {
  const progress = Math.floor(Number.parseInt(percent.value));
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

const percentEmotion = computed(() => {
  const progress = Math.floor(Number.parseInt(percent.value));
  let emotion = "";
  progressTips.some((item) => {
    if (progress >= Number(item.progress)) {
      emotion = item.emotion;
      return true;
    }
    return false;
  });
  return emotion;
});

const wallList = ref([
  {
    id: 1,
    name: "坚持10天",
    iconPath: "https://crownclown.xyz/startlife/zhang10.png",
    unlock: false,
  },
  {
    id: 2,
    name: "坚持20天",
    iconPath: "https://crownclown.xyz/startlife/zhang20.png",
    unlock: false,
  },
  {
    id: 3,
    name: "坚持30天",
    iconPath: "https://crownclown.xyz/startlife/zhang30.png",
    unlock: false,
  },
  {
    id: 4,
    name: "坚持40天",
    iconPath: "https://crownclown.xyz/startlife/zhang40.png",
    unlock: false,
  },
  {
    id: 5,
    name: "坚持50天",
    iconPath: "https://crownclown.xyz/startlife/zhang50.png",
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
const checkUnlock = () => {
  // 根据打卡次数判断是否解锁
  const plan = selectedPlan.value;
  if (!plan) {
    return;
  }
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

  // 测试 start
  // wallList.value.forEach((item: any) => {
  //   if (item.id === 1) {
  //     // eslint-disable-next-line no-param-reassign
  //     item.unlock = true;
  //   }
  // });
  // 测试 end
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
const posterBg = ref("");

// 动态文字内容
const textItems = ref<any>([]);

// 二维码位置和大小
const qrOptions = ref<any>({});

const handleShare = () => {
  posterBg.value = dingImgArr[Math.floor(Math.random() * dingImgArr.length)];
  textItems.value = [
    {
      text: `我正在挑战[${selectedPlan.value?.name}]`,
      x: 9999,
      y: 20,
      font: "500 16px PingFang SC,Microsoft YaHei,sans-serif",
      color: "#ffffff",
    },
    {
      text: `${currentZhangTips.value}`,
      x: 9999,
      y: 50,
      font: "14px PingFang SC,Microsoft YaHei,sans-serif",
      color: "#fff",
    },
  ];
  qrOptions.value = {
    src: "https://crownclown.xyz/qrcode.jpg",
    x: width - 60,
    y: height - 60,
    width: 50,
    height: 50,
  };
  isPoster.value = true;
};

const handleSave = () => {
  dynamicPosterRef.value.savePoster();
};

const recordList = ref<{ time: string; planName: string }[]>([]);
const initData = () => {
  if (selectedPlan.value?.name) {
    recordList.value = getRecord(selectedPlan.value?.name);
  }
  // 检查是否解锁
  checkUnlock();
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
onMounted(() => {
  finished.value = selectedPlan.value?.count || 0;
  total.value = calcCurrentDay(selectedPlan.value?.startTime || "") < 50
    ? 50
    : calcCurrentDay(selectedPlan.value?.startTime || "");
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
