<template>
  <view class="axios-demo">
    <view class="title-h1">Axios Page</view>
    <input type="number" v-model="phone" />
    <button @click="getCode">获取验证码(GET)</button>
    <button @click="showCalendar = true">选择日期</button>
    <wan-calendar
      ref="betterCalendarRef"
      :showCalendar="showCalendar"
      @confirm="selectDate"
      @cancel="showCalendar = false"
      :selectOptions="selectOptions"
    ></wan-calendar>
  </view>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { userApi } from "@/api";
import WanCalendar from "@/components/wan-calendar/wan-calendar.vue";
import { onLoad } from "@dcloudio/uni-app";

const phone = ref("12345678901");

const getCode = () => {
  userApi
    .getCode(phone.value)
    .then((v) => {
      uni.showToast({
        title: `${v.num}`,
        icon: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      uni.showToast({
        title: "获取验证码失败",
        icon: "error",
      });
    });
};

const selectOptions = ref([48, 9, 15, 1]);
const showCalendar = ref(false);
const selectDate = (date: string) => {
  console.log(date);
  showCalendar.value = false;
};
onLoad(() => {
  const year = new Date().getFullYear() - 1950;
  const month = new Date().getMonth();
  const day = new Date().getDate() - 1;
  selectOptions.value = [year, month, day, 0];
});
</script>

<style lang="less" scoped>
.axios-demo {
  text-align: center;
}
.title-h1 {
  font-size: 50rpx;
}
</style>
