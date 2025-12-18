<template>
  <view class="startlife-moment-thing">
    <!-- 添加可爱的进度条 -->
    <view class="progress-container">
      <view class="progress-bar">
        <view
          class="progress-fill"
          :style="{ width: progressPercentage + '%' }"
        ></view>
      </view>
      <view class="progress-text"
        >完成度&nbsp;{{ progressCount }} / {{ totalCount }}</view
      >
    </view>

    <view class="heart-container" :style="gridStyle">
      <view
        v-for="(item, index) in heartGrid"
        :key="index"
        class="heart-block"
        :class="{ 'heart-active': item.isActive, clicked: item.isClicked }"
        :style="blockStyle"
        @click="handleBlockClick(index)"
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// 定义爱心形状的网格数据
// 0表示空白，1表示粉色方块
const heartPattern = [
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
];

// 将二维数组转换为一维数组，并添加点击状态
const heartGrid = ref(
  heartPattern.flat().map((value) => ({
    isActive: value === 1,
    isClicked: false,
  }))
);

// 计算总爱心数量
const totalCount = computed(() => {
  return heartGrid.value.filter((item) => item.isActive).length;
});

// 计算已点亮的爱心数量
const progressCount = computed(() => {
  return heartGrid.value.filter((item) => item.isActive && item.isClicked)
    .length;
});

// 计算进度百分比
const progressPercentage = computed(() => {
  return totalCount.value > 0
    ? Math.round((progressCount.value / totalCount.value) * 100)
    : 0;
});

// 计算每个方块的大小，使爱心在横向占满视口（留出一些边距）
const blockSize = computed(() => {
  // 爱心横向有14个方块，加上13个间隙，总共需要占用14个方块宽度
  // 我们希望爱心占用视口宽度的80%，留出20%作为边距
  // 在uni-app中，750rpx = 100%视口宽度，所以80%视口宽度 = 600rpx
  // 每个方块的大小 = 600rpx / 14
  return Math.floor(600 / 14);
});

// 计算间隙大小，为方块大小的1/6
const gapSize = computed(() => Math.floor(blockSize.value / 6));

// 计算圆角大小，为方块大小的1/6
const borderRadius = computed(() => Math.floor(blockSize.value / 6));

// 计算网格样式
const gridStyle = computed(() => {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(14, ${blockSize.value}rpx)`,
    gridTemplateRows: `repeat(11, ${blockSize.value}rpx)`,
    gap: `${gapSize.value}rpx`,
    justifyContent: "center",
  };
});

// 计算方块样式
const blockStyle = computed(() => {
  return {
    width: `${blockSize.value}rpx`,
    height: `${blockSize.value}rpx`,
    borderRadius: `${borderRadius.value}rpx`,
  };
});

// 处理方块点击事件
const handleBlockClick = (index: number) => {
  if (heartGrid.value[index].isActive) {
    heartGrid.value[index].isClicked = !heartGrid.value[index].isClicked;
  }
};

// 添加可以被父组件调用的刷新数据方法
const refreshData = () => {
  // 对于smallThing组件，不需要重新加载数据，但可以重置点击状态
  heartGrid.value.forEach((item) => {
    if (item.isActive) {
      item.isClicked = false;
    }
  });
};

// 导出方法，使父组件可以调用
defineExpose({
  refreshData,
});
</script>

<style lang="scss" scoped>
.startlife-moment-thing {
  width: 100%;
  height: 100%;
  padding: 20rpx;

  .progress-container {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40rpx;
    padding: 20rpx;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    .progress-bar {
      width: 100%;
      height: 24rpx;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 12rpx;
      overflow: hidden;
      position: relative;

      .progress-fill {
        height: 100%;
        background: linear-gradient(to right, #ff6b8b, #ff8fa3);
        border-radius: 12rpx;
        transition: width 0.5s ease;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.1) 100%
          );
          border-radius: 12rpx;
        }
      }
    }

    .progress-text {
      font-size: 28rpx;
      color: #666;
      text-align: center;
      margin-top: 12rpx;
      font-weight: 500;
    }
  }

  .startlife-moment-thing-item {
    margin-bottom: 40rpx;

    .startlife-moment-thing-item-title {
      font-size: 40rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .heart-container {
    // 样式通过动态计算设置
    animation: heartBeat 2s ease-in-out infinite;

    .heart-block {
      transition: all 0.3s ease;

      &.heart-active {
        background-color: #f0bad5; // 粉色
        cursor: pointer;

        &:hover {
          background-color: #e192bc; // 深粉色
          transform: scale(1.1);
        }

        &.clicked {
          background-color: #e192bc; // 深粉色表示已点击
          animation: pulse 0.5s;
        }
      }
    }
  }
}

// 心脏缓动动画
@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.05);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
