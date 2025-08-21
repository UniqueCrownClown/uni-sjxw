<template>
  <view class="use">
    <u-navbar
      title="使用手册"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      back-icon-color="#fff"
    ></u-navbar>
    <view>
      <view>
        <view class="use-box">
          <view class="use-box-header">创建计划</view>
          <view class="use-box-main"
            >在首页点击
            “创建计划”按钮，输入计划名称、选择开始日期，即可创建一个新的 50
            天计划。你也可以从推荐计划中选择一个开始。</view
          >
        </view>
        <view class="use-box">
          <view class="use-box-header"> 每日打卡 </view>
          <view class="use-box-main"
            >每天完成计划内容后，点击首页的
            “打卡”按钮进入打卡页进行打卡，也可直接点击底部打卡 Tab 进入打卡页。
          </view></view
        >

        <view class="use-box">
          <view class="use-box-header"> 活跃计划 </view>
          <view class="use-box-main">
            仅支持设置一个活跃计划，当设置活跃计划后，打卡页将只显示当前活跃计划内容，可通过切换活跃计划来切换显示内容。
          </view>
        </view>
        <view class="use-box">
          <view class="use-box-header"> 查看统计 </view>
          <view class="use-box-main">
            在
            “首页”点击查看统计可以查看你的计划完成情况、打卡天数、连续打卡等统计数据，帮助你了解自己的坚持情况，点击底部进度tab，可查看全部计划打卡情况
          </view>
        </view>
        <view class="use-box">
          <view class="use-box-header"> 云同步 </view>
          <view class="use-box-main">
            在
            “我的”页面可以进行云同步，将你的计划数据备份到云端，更换设备时也不用担心数据丢失。
          </view>
        </view>
        <view class="use-box">
          <view class="use-box-header"> 常见问题 </view>
          <view class="use-box-main">
            <view>Q: 如何删除计划？</view>
            <view
              >A:在首页点击计划进入详情，点击删除按钮即可删除当前计划。</view
            >
            <view
              >Q:错过打卡怎么办？ A: 你可以补卡，但会影响连续打卡记录。</view
            >
            <view>Q:数据会丢失吗？</view>
            <view
              >A:本地数据存储在设备上，建议定期使用云同步功能备份数据。</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.use {
  padding: 20rpx;
  background-color: #f5f5f5;
}
.use-box {
  padding: 20rpx;
  margin: 20rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  .use-box-header {
    font-size: 32rpx;
    font-weight: 500;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #f5f5f5;
  }
  .use-box-main {
    padding: 20rpx;
    font-size: 28rpx;
    line-height: 36rpx;
    color: #333333;
  }
}
</style>
