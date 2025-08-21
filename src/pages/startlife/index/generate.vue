<template>
  <view class="index-generate">
    <u-navbar
      :title="navName"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      back-icon-color="#fff"
    ></u-navbar>
    <view class="u-p-20">
      <dynamic-poster
        ref="dynamicPosterRef"
        :background-image="posterBg"
        :text-items="textItems"
        :qr-code-options="qrOptions"
        :canvasSize="canvasSize"
      />
    </view>
    <view class="u-p-10 u-text-center">
      <text>长按图片可分享至微信好友</text>
    </view>
    <view class="u-p-20 u-m-b-40">
      <u-button @click="saveImageToLocal" class="save-btn">
        保存到相册
      </u-button>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { formateDate } from "@/utils/common";
import { getUserInfo, isRecordExist, getPlans } from "@/api/modules/startlife";
import { themeName } from "@/utils/tips";
import dynamicPoster from "@/components/dynamic-poster/index.vue";

// 导航栏标题
const navName = ref(themeName);

// 记录数据
const recordList = ref<any[]>([]);
const recordDay = ref(0);
const userName = ref("");
const currentDate = ref(formateDate(new Date(), "yyyy-mm-dd"));

const { windowWidth } = uni.getWindowInfo();
const height = ((windowWidth - 20) * 16) / 9;

const canvasSize = ref({
  width: windowWidth - 20,
  height,
});

// 动态文字内容
const textItems = ref<any>([]);
// 二维码位置和大小
const qrOptions = ref({});

// 计算当前是第几天
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

// 初始化数据
const initData = () => {
  const userInfo = getUserInfo();
  if (userInfo) {
    userName.value = userInfo.nickName;
  }

  const plans = getPlans();
  const result: any[] = [];

  if (plans.length) {
    plans.forEach((item: any) => {
      if (item.checked) {
        recordDay.value = calcCurrentDay(item.startTime);
      }
      if (isRecordExist(item.name, currentDate.value)) {
        result.push(item.name);
      }
    });
  }

  recordList.value = result;

  // 设置文本内容位置
  let content = [
    {
      text: `PROJECT50挑战`,
      x: (windowWidth - 200) / 2,
      y: 130,
      color: "#000000",
      font: "500 16px PingFang SC,Microsoft YaHei,sans-serif",
    },
    {
      text: `Day ${recordDay.value} |${currentDate.value}`,
      x: (windowWidth - 200) / 2,
      y: 150,
      color: "#000000",
      font: "14px PingFang SC, sans-serif",
    },
    {
      text: "今日已完成",
      x: 50,
      y: 180,
      color: "#000000",
      font: "500 16px PingFang SC,Microsoft YaHei,sans-serif",
    },
  ];
  recordList.value.forEach((item, index) => {
    content.push({
      text: `${item}`,
      x: 40,
      y: 210 + index * 20,
      color: "#666666",
      font: "14px PingFang SC, sans-serif",
    });
  });
  content = [
    ...content,
    ...(userName.value
      ? [
          {
            text: `挑战者: ${userName.value}`,
            x: 50,
            y: height - 120,
            color: "#666666",
            font: "14px PingFang SC, sans-serif",
          },
        ]
      : []),
    {
      text: `From:${navName.value}`,
      x: 50,
      y: height - 100,
      color: "#666666",
      font: "14px PingFang SC, sans-serif",
    },
  ];
  textItems.value = content;
  qrOptions.value = {
    src: "https://s21.ax1x.com/2025/08/22/pVD6779.jpg",
    x: 50,
    y: height - 200,
    width: 50,
    height: 50,
  };
};

// 动态海报

const dynamicPosterRef = ref<any>();

// 自定义海报内容
const posterBg = ref("https://s21.ax1x.com/2025/08/19/pVBanNF.jpg");

const saveImageToLocal = async () => {
  dynamicPosterRef.value.savePoster();
};

onReady(() => {
  initData();
});
</script>
<style lang="scss" scoped>
.index-generate {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
