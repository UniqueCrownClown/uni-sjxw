<template>
  <view class="container">
    <u-navbar
      title="测试结果"
      :background="{ backgroundColor: '#f3e8d2' }"
      title-color="#f5f5f5"
      :title-size="40"
      back-icon-color="#fff"
      :is-back="false"
    >
      <view class="slot-wrap u-m-l-20" style="">
        <u-icon
          name="home"
          color="#f5f5f5"
          size="40"
          @click="handleClick"
        ></u-icon>
      </view>
    </u-navbar>
    <view
      class="u-m-t-40"
      style="
        background-color: rgba(255, 255, 255, 0.8);
        width: calc(100% - 40rpx);
        margin-left: 20rpx;
        border-radius: 20rpx;
        height: calc(100vh - 480rpx);
      "
    >
      <view class="u-p-20 u-flex u-row-center">
        <view style="color: #bfb35f; font-size: 40rpx">{{ name }}</view>
      </view>
      <view class="u-p-20 u-flex u-row-center">
        <view style="color: #9b9934; font-size: 40rpx"> {{ title }}</view>
      </view>
      <view class="u-p-20 u-flex u-row-center">
        <view> {{ description }}</view>
      </view>
      <view class="u-p-20 u-flex u-row-center">
        <view> {{ trait }}</view>
      </view>
      <view class="u-p-20 u-flex u-row-center">
        <view class="u-text-center" style="width: 100%"
          ><u-image :src="bg" mode="widthFix"></u-image
        ></view>
      </view>
      <view class="u-p-40 u-flex u-row-right">
        <view class="u-text-center" style="width: 120rpx"
          ><u-image
            src="https://crownclown.xyz/qrcode.jpg"
            mode="widthFix"
          ></u-image
        ></view>
      </view>
    </view>
    <view class="labubu-footer">
      <view
        style="
          width: 100rpx;
          height: 100rpx;
          border-radius: 100rpx;
          background-color: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        "
        ><u-icon name="share" color="#f3e8d2" size="40"></u-icon>
        <button
          open-type="share"
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
          "
        >
          分享
        </button>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { labubuResultList, calculateResult } from "@/utils/labubuTips";
import { useLabubuStore } from "@/store/modules/labubuStore";

const labubuStore = useLabubuStore();

const name = ref("");
const title = ref("");
const description = ref("");
const trait = ref("");
const bg = ref("");

onLoad(() => {
  // 测试start
  // labubuStore.setAnswer([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
  // 测试end
  if (labubuStore.answerList.length === 0) {
    uni.showToast({
      title: "请先完成测试吧~~~",
      icon: "none",
    });
    return;
  }

  const userAnswers = labubuStore.answerList; // 用户答题选项索引
  const result = calculateResult(userAnswers, labubuResultList);
  name.value = result.name;
  title.value = result.title;
  description.value = result.description;
  trait.value = result.trait;
  bg.value = result.bg;

  // 清空答案
  labubuStore.clearAnswer();
});

const handleClick = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/labubu",
  });
};

onShareAppMessage(() => {
  return {
    title: "看看你是labubu家族中的谁吧~~",
    path: "/pages/startlife/mine/labubu",
    imageUrl: "https://s21.ax1x.com/2025/09/03/pVgdO2V.jpg",
  };
});
</script>
<style lang="scss" scoped>
.container {
  background-color: #f3e8d2;
  min-height: 100vh;
  position: relative;
  .labubu-footer {
    position: absolute;
    bottom: 80rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
