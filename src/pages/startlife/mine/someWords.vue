<template>
  <view class="some-words">
    <u-navbar
      title="想说的话"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      back-icon-color="#fff"
    ></u-navbar>
    <view class="u-font-xl u-text-center u-m-20">
      <text> 我想分享的话~~ </text>
    </view>
    <view
      class="u-p-20 u-m-20"
      style="background-color: #fff; border-radius: 20rpx"
    >
      <view class="u-font-xl u-p-20">为什么创建这个应用</view>
      <view style="line-height: 50rpx"> {{ word1 }}</view>
    </view>
    <view
      class="u-p-20 u-m-20"
      style="background-color: #fff; border-radius: 20rpx"
    >
      <view class="u-font-xl u-p-20">灌一点鸡汤</view>
      <view>
        <u-cell-group>
          <u-cell-item
            :arrow="false"
            v-for="(item, index) in word2"
            :key="index"
            :title="item"
          >
          </u-cell-item>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { someWords1, someWords2 } from "@/utils/tips";

const word1 = ref(someWords1);
const word2 = ref(someWords2);
</script>
<style lang="scss" scoped>
.some-words {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>