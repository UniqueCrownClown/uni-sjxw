<template>
  <view class="container">
    <u-navbar
      :title="title"
      :background="{ backgroundColor: '#f3e8d2' }"
      title-color="#fff"
      :title-size="36"
      back-icon-color="#fff"
    ></u-navbar>
    <view>
      <view class="u-font-xl u-m-40 question-item">{{ question }}</view>
      <view class="answer-container">
        <view
          v-for="(item, index) in answer"
          :key="item"
          class="u-m-20 u-p-40 answer-item u-font-xl"
          @click="handleClick(item, index)"
          >{{ item }}</view
        >
      </view>
    </view>
    <view class="u-m-t-40 u-m-b-40 u-p-20 u-flex">
      <view class="u-p-20 u-flex-1">
        <u-slider
          v-model="current"
          active-color="#f0a6b3"
          height="20"
          block-width="40"
        ></u-slider>
      </view>
      <view class="" style="color: #f0a6b3">
        <text>{{ indexPage }}/12</text>
      </view>
    </view>
    <view class="u-m-t-40 u-m-b-40 u-flex u-row-center">
      <view style="width: 200rpx">
        <u-image
          src="https://crownclown.xyz/labubu_progress.png"
          width="100%"
          height="100%"
          mode="widthFix"
        ></u-image>
      </view>
    </view>
    <view class="u-flex u-row-center">
      <view class="labubu-test-btn" @click="handlePrev">
        <u-icon name="arrow-leftward" color="#ffffff" size="28"></u-icon
        ><text> 上一题</text></view
      >
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { questionList, answerList } from "@/utils/labubuTips";
import { useLabubuStore } from "@/store/modules/labubuStore";

const labubuStore = useLabubuStore();

const title = ref("labubu测试");
onLoad(() => {
  labubuStore.clearAnswer();
});
const step = 9;
const current = ref(0);
const indexPage = ref(1);
const question = computed(() => questionList[indexPage.value - 1]);
const answer = computed(() => answerList[indexPage.value - 1].split("||"));

const handlePrev = () => {
  if (indexPage.value === 1) {
    uni.showToast({
      title: "已经是第一题了",
      icon: "none",
    });
    return;
  }
  labubuStore.popAnswer();
  indexPage.value -= 1;
  current.value -= step;
};
const handleClick = (_: any, index: number) => {
  // 记录答案
  labubuStore.addAnswer(index);
  // 跳转下一题
  if (indexPage.value === questionList.length) {
    uni.navigateTo({
      url: "/pages/startlife/mine/labubuResult",
    });
    return;
  }
  indexPage.value += 1;
  current.value += step;
  uni.showToast({
    title: "下一题",
    icon: "none",
  });
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #f3e8d2;
  min-height: 100vh;
}

.labubu-test-btn {
  width: 480rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 80rpx;
  font-size: 40rpx;
  color: #fff;
  background: linear-gradient(to bottom right, #f9ca10 0%, #694419 100%);
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.question-item {
  color: #f0a6b3;
  font-weight: 600;
}

.answer-item {
  background-color: #fff;
  color: #f0a6b3;
  border-radius: 20rpx;
  font-weight: 600;
}
</style>
