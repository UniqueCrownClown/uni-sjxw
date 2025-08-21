<template>
  <view class="container">
    <u-navbar
      title="测试结果"
      :background="{ backgroundColor: '#f3e8d2' }"
      title-color="#f5f5f5"
      :title-size="32"
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
        height: calc(100vh - 400rpx);
      "
    >
      <view class="u-p-20 u-flex u-row-center">
        <view style="color: #bfb35f; font-size: 40rpx">{{ name }}</view>
      </view>
      <view class="u-p-20 u-flex u-row-center">
        <view style="color: #9B9934; font-size: 40rpx"> {{ title }}</view>
      </view>
      <view class="u-p-20 u-flex u-row-center">
        <view> {{ description }}</view>
      </view>
      <view class="u-p-20 u-flex u-row-center">
        <view> {{ trait }}</view>
      </view>
      <!-- <view class="u-p-20 u-flex u-row-center">
        <view> {{ signature }}</view>
      </view> -->
      <view class="u-p-20 u-flex u-row-center">
        <view class="u-text-center"> <image :src="bg"></image></view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { labubuResultList, calculateResult } from "@/utils/labubuTips";
import { useLabubuStore } from "@/store/modules/labubuStore";

const labubuStore = useLabubuStore();

const name = ref("");
const title = ref("");
const description = ref("");
const trait = ref("");
const signature = ref("");
const bg = ref("");

onLoad(() => {
  // labubuStore.setAnswer([2,2,2,2,2,2,2,2,2,2,2,2]);
  if (labubuStore.answerList.length === 0) {
    uni.showToast({
      title: "请先测试",
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
  signature.value = result.signature;
  bg.value = result.bg;

  // 清空答案

  labubuStore.clearAnswer();
});

const handleClick = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/labubu",
  });
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #f3e8d2;
  min-height: 100vh;
}
</style>
