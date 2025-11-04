<template>
  <view class="container">
    <view class="u-m-l-20 u-m-t-50">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
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
    
    <!-- 全部角色展示 -->
    <view class="result-characters">
      <view class="characters-title">全部角色</view>
      <view class="characters-tags">
        <view v-for="character in allCharacters" :key="character.name" class="character-tag">
          {{ character.name }}
        </view>
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
import { labubuResultList } from "@/utils/labubuTips";

const title = ref("labubu测试");
onLoad(() => {
  uni.setNavigationBarTitle({
    title: title.value,
  });
});

// 所有可能的角色数据
const allCharacters = ref<any[]>(labubuResultList.map(item=>({name:item.name})));

const handleClick = () => {
  uni.navigateTo({
    url: "/pages/startlife/test/labubuTest",
  });
};
const handleTomine = () => {
  uni.navigateTo({
    url: "/pages/startlife/test/testTools",
  });
};
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  background-image: url("https://crownclown.xyz/labubu_bg.jpeg");
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
  
  // 角色标签展示样式
  .result-characters {
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.3);
    margin: 40px 15px;
    border-radius: 10px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .characters-title {
    font-size: 14px;
    font-weight: 600;
    color: #694419;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(105, 68, 25, 0.3);
  }

  .characters-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .character-tag {
    padding: 4px 12px;
    background: rgba(249, 202, 16, 0.5);
    color: #4b2910;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(249, 202, 16, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .character-tag::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.6s ease;
  }

  .character-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 202, 16, 0.4);
  }

  .character-tag:hover::before {
    left: 100%;
  }
}
</style>