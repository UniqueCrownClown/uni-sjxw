<template>
  <view class="startlife-index u-flex" style="flex-direction: column">
    <view style="height: 480rpx; width: 100%">
      <u-swiper
        img-mode="aspectFill"
        :list="list"
        :title="true"
        :title-style="{
          fontWeight: 500,
          fontSize: '30rpx',
          textAlign: 'center',
        }"
        height="480"
      ></u-swiper>
    </view>
    <view class="u-flex-1 u-flex" style="flex-direction: column">
      <view class="u-p-l-20 u-p-r-20">
        <u-notice-bar mode="horizontal" :list="noticeList"></u-notice-bar>
      </view>
      <view
        class="u-flex-1 u-flex u-row-center"
        v-if="isEmptyPlan"
        style="width: calc(100vw - 40rpx)"
      >
        <view>
          <view class="u-text-center u-font-xl u-p-t-20">
            <text> 还没有进行中计划</text>
          </view>
          <view class="u-text-center u-p-t-20">
            <text>创建一个50天计划，开始改变自己吧</text>
          </view>
          <view class="u-text-center u-p-t-20">
            <u-button
              type="primary"
              shape="circle"
              :ripple="true"
              ripple-bg-color="#909399"
              @click="handleClick"
              >创建计划</u-button
            >
          </view>
        </view>
      </view>
      <view v-if="!isEmptyPlan" style="width: calc(100vw - 40rpx)">
        <view style="width: 50%; margin: 20rpx auto">
          <u-button
            type="primary"
            shape="circle"
            :ripple="true"
            ripple-bg-color="#f5f5f5"
            @click="handleClick"
            >创建新计划</u-button
          >
        </view>
        <view class="u-flex u-row-between u-p-20">
          <view class="u-font-xl" style="font-weight: 700"
            ><text>我的所有计划</text></view
          >
          <view @click="handleTips"
            ><text>查看推荐计划</text
            ><u-icon name="arrow-right" size="28"></u-icon
          ></view>
        </view>
        <view
          class="u-text-center"
          style="text-decoration: underline"
          @click="handleGenerate"
        >
          <text>一键生成今日打卡记录</text></view
        >
        <view>
          <view
            v-for="item in planList"
            :key="item.name"
            class="u-m-20 u-p-20"
            :style="{
              background: 'linear-gradient(to bottom right, #4f9679 0%, #98e0c0 100%)',
              color: '#fff',
              borderRadius: '20rpx',
            }"
          >
            <view>
              <view class="u-p-10 u-flex" @click="handleInfo(item)">
                <u-icon
                  name="clock-fill"
                  size="32"
                  style="color: #f5f5f5"
                ></u-icon>
                <text class="u-font-xl u-p-l-20 u-p-r-20">{{ item.name }}</text>
                <u-icon name="arrow-right" size="26"> </u-icon>
              </view>
              <view>
                <text>{{ item.content }}</text>
              </view>
              <view class="u-p-10 u-flex u-row-between">
                <view>
                  <text>已坚持 {{ item.count }}/50天</text>
                </view>
                <view style="width: 260rpx">
                  <u-button
                    shape="circle"
                    size="medium"
                    :customStyle="{
                      background: 'transparent',
                      color: '#fff',
                    }"
                    @click="handleClock(item)"
                    >去打卡</u-button
                  >
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { usePlanStore } from "@/store/modules/planStore";
import { getPlans } from "@/api/modules/startlife";
import { monthWords } from "@/utils/tips";

const planStore = usePlanStore();

const list = ref<Array<any>>([
  {
    image: "https://s21.ax1x.com/2025/08/19/pVBNi5Q.png",
    title: "微习惯&保持自律",
  },
  {
    image: "https://s21.ax1x.com/2025/08/19/pVBNkCj.png",
    title: "每天进步一点点,重塑更好的自己",
  },
  {
    image: "https://s21.ax1x.com/2025/08/19/pVBNE2n.png",
    title: "让坚持能够被看见",
  },
]);

const handleClick = () => {
  planStore.setIsEdit(false);
  uni.navigateTo({
    url: "/pages/startlife/index/create",
  });
};

const noticeList = ref([monthWords[new Date().getMonth()]]);

const isEmptyPlan = ref(false);

const planList = ref([
  {
    name: "50天计划",
    count: 10,
    content: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
]);

const handleInfo = (item: any) => {
  planStore.setSelectedPlan(item);
  uni.navigateTo({
    url: `/pages/startlife/index/detail`,
  });
};

const handleClock = (item: any) => {
  planStore.setSelectedPlan(item);
  uni.switchTab({
    url: "/pages/startlife/every/index",
  });
};

const handleTips = () => {
  uni.navigateTo({
    url: "/pages/startlife/index/createTips",
  });
};

const handleGenerate = () => {
  uni.navigateTo({
    url: "/pages/startlife/index/generate",
  });
};

onShow(() => {
  const myPlans = getPlans();
  if (!myPlans || myPlans.length === 0) {
    isEmptyPlan.value = true;
  } else {
    isEmptyPlan.value = false;
    planList.value = myPlans;
  }
});
</script>
<style lang="scss" scoped>
.startlife-index {
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
