<template>
  <view class="wrap">
    <u-navbar
      title="推荐计划"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      back-icon-color="#fff"
    ></u-navbar>
    <view class="u-text-center" style="font-weight: 700">
      选择一个推荐计划，开始你的50天挑战
    </view>
    <view>
      <view
        v-for="item in tipsList"
        :key="item.name"
        class="u-p-20 u-m-20"
        style="background: #ffffff; border-radius: 20rpx"
      >
        <view class="u-font-xl u-p-20">{{ item.name }}</view>
        <view class="u-p-20">{{ item.content }}</view>
        <view class="u-flex u-row-center">
          <view style="width: 200rpx">
            <u-button shape="circle" @click="handleSelect(item)"
              >选择此计划</u-button
            >
          </view>
        </view>
      </view>
    </view>
    <view class="u-p-20 u-m-20">
      <u-button shape="circle" @click="handleReturn">返回</u-button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { tipsData } from "@/utils/tips";
import { usePlanStore } from "@/store/modules/planStore";

const planStore = usePlanStore();

const handleReturn = () => {
  uni.navigateBack({
    delta: 1,
  });
};

const tipsList = ref(tipsData);

const handleSelect = (item: { name: string; content: string }) => {
  planStore.setTempPlan(item);
  planStore.setIsEdit(false);
  uni.navigateTo({
    url: "/pages/startlife/index/create",
  });
};
</script>
<style lang="scss" scoped>
.wrap {
  background-color: #f5f5f5;
  padding: 20rpx;
}
</style>
