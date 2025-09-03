<template>
  <view class="container">
    <view class="u-m-l-20 u-m-t-20">
      <u-icon name="home" color="#fff" size="40" @click="handleTomine"></u-icon>
    </view>
    <view class="u-p-20 u-m-t-40" style="font-size: 28px; color: #4b2910"
      >你像是LABUBU家族中的那个成员呢?</view
    >
    <view>
      <view class="u-flex u-row-center u-m-t-40">
        <view class="labubu-test-btn" @click="handleClick">
          <text> 开始测试(12题)</text>
          <u-icon name="arrow-rightward" color="#ffffff" size="28"></u-icon
        ></view>
      </view>
    </view>
    <view class="labubu-footer">
      <view class="labubu-footer-main"> 本测试为自娱自乐，非官方，不盈利 </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const title = ref("labubu测试");
onLoad(() => {
  uni.setNavigationBarTitle({
    title: title.value,
  });
});
const handleClick = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/labubuTest",
  });
};
const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  background-image: url("https://s21.ax1x.com/2025/08/26/pVyhzc9.jpg");
  background-size: cover;
  min-height: 100vh;
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
  .labubu-footer {
    position: fixed;
    bottom: 60rpx;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .labubu-footer-main {
      background-color: rgba(255, 255, 255, 0.7);
      width: 80%;
      margin: 0 auto;
      border-radius: 10px;
      padding: 6px;
      text-align: center;
      color: #765d47;
    }
  }
}
</style>
