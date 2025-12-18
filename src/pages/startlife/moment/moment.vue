<template>
  <view class="moment-container">
    <view class="u-m-l-20 u-m-t-50 moment-header">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>
    <u-tabs
      class="bg-transparent"
      :list="list"
      :is-scroll="false"
      :current="selectedTab"
      @change="change"
    ></u-tabs>
    <view class="moment-main">
      <!-- 使用v-show替代v-if，避免组件销毁和重建 -->
      <time-component
        v-show="selectedTab === 0"
        ref="timeComponentRef"
      ></time-component>
      <small-thing-component
        v-show="selectedTab === 1"
        ref="smallThingComponentRef"
      ></small-thing-component>
      <festival-component
        v-show="selectedTab === 2"
        ref="festivalComponentRef"
      ></festival-component>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";
// 导入三个组件
import TimeComponent from "./time.vue";
import SmallThingComponent from "./smallThing.vue";
import FestivalComponent from "./festival.vue";

const list = ref([
  {
    name: "时刻",
  },
  {
    name: "小事",
  },
  {
    name: "节日",
  },
]);

const selectedTab = ref(0);

// 组件引用
const timeComponentRef = ref<InstanceType<typeof TimeComponent> | null>(null);
const smallThingComponentRef = ref<InstanceType<
  typeof SmallThingComponent
> | null>(null);
const festivalComponentRef = ref<InstanceType<typeof FestivalComponent> | null>(
  null
);

const change = (e: any) => {
  selectedTab.value = e;

  // 在下一个tick中通知当前显示的组件刷新数据
  nextTick(() => {
    try {
      if (e === 0 && timeComponentRef.value) {
        // 使用类型断言确保可以访问 refreshData 方法
        (timeComponentRef.value as any).refreshData();
      } else if (e === 1 && smallThingComponentRef.value) {
        (smallThingComponentRef.value as any).refreshData();
      } else if (e === 2 && festivalComponentRef.value) {
        (festivalComponentRef.value as any).refreshData();
      }
    } catch (error) {
      console.error("刷新组件数据失败:", error);
    }
  });
};

const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};
</script>
<style lang="scss" scoped>
.moment-container {
  padding: 0;
  background-image: url("https://crownclown.xyz/moment.png");
  background-size: cover;
  min-height: 100vh;
  /* 确保占满整个视口高度 */
  height: 100vh;
  /* 使用Flex布局 */
  display: flex;
  flex-direction: column;
  /* 隐藏可能的滚动条 */
  overflow: hidden;
  .moment-header {
    /* 固定头部高度和位置 */
    height: 100rpx;
    padding: 20rpx;
    display: flex;
    align-items: center;
  }

  .moment-main {
    /* 占满剩余空间 */
    flex: 1;
    /* 支持垂直滚动 */
    overflow-y: auto;
    /* 添加内边距，保持内容与边缘的距离 */
    padding: 20rpx;
    /* 隐藏横向滚动条 */
    overflow-x: hidden;
  }

  .moment-footer {
    /* 固定底部高度和位置 */
    padding-top: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
::v-deep .u-tabs {
  background: transparent !important;
}
</style>
