<template>
  <view class="wrap">
    <u-navbar
      title="创建一个50天计划"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      :title-size="30"
      back-icon-color="#fff"
    ></u-navbar>
    <view
      class="u-text-center u-font-sm u-p-t-10 u-p-b-20 u-main-color"
      @click="toCreateTips"
      v-if="!isEdit"
    >
      <text>没有灵感？查看推荐计划</text>
      <u-icon name="arrow-right"></u-icon>
    </view>
    <view
      style="background-color: #ffffff; border-radius: 20rpx; padding: 20rpx"
    >
      <u-form :model="form" ref="formRef" label-position="top">
        <u-form-item label="计划名称" prop="name"
          ><u-input
            v-model="form.name"
            :disabled="isEdit"
            placeholder="例如：每天阅读30分钟"
        /></u-form-item>
        <u-form-item label="打卡方式" prop="type">
          <u-radio-group v-model="form.type">
            <u-radio label="1" name="1" active-color="#8ad2b3"
              >简单打卡(仅标记完成)</u-radio
            >

            <u-radio label="2" name="2" active-color="#8ad2b3"
              >记录数据(输入学习内容,时长等)</u-radio
            >
          </u-radio-group>
        </u-form-item>
        <u-form-item label="计划周期" prop="birthday">
          <view class="u-flex u-row-center">
            <view
              @click="handleStartTime"
              class="u-p-l-20 u-p-r-20"
              style="background-color: #ffffff"
              >{{ form.startTime }}</view
            >
            <view class="u-p-10">至</view>
            <view class="u-p-10">{{ form.endTime }}</view>
          </view>
          <view v-if="isEdit" class="u-text-center" style="color: #dd6161"
            >计划周期不可改变</view
          >
          <u-picker
            mode="time"
            v-model="show"
            :params="params"
            @confirm="handleConfirmPicker"
          ></u-picker>
        </u-form-item>
        <u-form-item label="激励标语(可选)" prop="intro"
          ><u-input
            v-model="form.content"
            type="textarea"
            placeholder="例如：成为更好的自己"
        /></u-form-item>
        <u-form-item label="设置为当前活跃计划">
          <u-switch v-model="form.checked" active-color="#8ad2b3"></u-switch>

          <view>
            <text>Tips: 开启后,打卡页面默认展示当前活跃计划数据。</text>
          </view>
        </u-form-item>
      </u-form>
    </view>
    <view class="u-flex u-row-between u-p-l-20 u-p-r-20 u-m-t-40">
      <view style="width: 40%">
        <u-button type="text" shape="circle" @click="handleCancel"
          >取消</u-button
        >
      </view>
      <view style="width: 40%">
        <u-button type="primary" shape="circle" @click="handleSubmit">{{
          isEdit ? "更新计划" : "创建计划"
        }}</u-button>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

import { usePlanStore } from "@/store/modules/planStore";
import { Plan, addPlan, updatePlan } from "@/api/modules/startlife";

import { formateDate, getDateAfter } from "@/utils/common";

const planStore = usePlanStore();
const tempPlaned = ref(planStore.tempPlan);
const selectedPlan = ref(planStore.selectedPlan);

const isEdit = ref(planStore.isEdit);

const form = ref<Plan>({
  name: "",
  type: "1",
  checked: true,
  content: "",
  startTime: formateDate(new Date(), "yyyy-mm-dd"),
  endTime: getDateAfter(new Date(), 50),
  count: 0,
});

const params = ref({
  year: true,
  month: true,
  day: true,
  hour: false,
  minute: false,
  second: false,
});
const show = ref(false);
const handleConfirmPicker = (e: any) => {
  form.value.startTime = `${e.year}-${e.month}-${e.day}`;
  form.value.endTime = getDateAfter(new Date(form.value.startTime), 50);
};

const handleSubmit = () => {
  if (form.value.name === "") {
    uni.showToast({
      title: "请输入计划名称",
      icon: "none",
    });
  }
  if (isEdit.value) {
    updatePlan(form.value);
  } else {
    addPlan(form.value);
  }
  uni
    .showToast({
      title: "创建成功",
      icon: "success",
    })
    .then(() => {
      planStore.clearTempPlan();
      uni.switchTab({
        url: "/pages/startlife/index/index",
      });
    });
};

const handleStartTime = () => {
  if (!isEdit.value) {
    show.value = true;
  }
};

const handleCancel = () => {
  uni.navigateBack({
    delta: 1,
  });
};

const toCreateTips = () => {
  planStore.setIsEdit(false);
  uni.navigateTo({
    url: "/pages/startlife/index/createTips",
  });
};

onShow(() => {
  if (planStore.isEdit && selectedPlan.value) {
    form.value = {
      name: selectedPlan.value?.name || "",
      type: selectedPlan.value?.type || "1",
      checked: selectedPlan.value?.checked,
      content: selectedPlan.value?.content || "",
      startTime: selectedPlan.value?.startTime,
      endTime: selectedPlan.value?.endTime,
      count: selectedPlan.value?.count,
    };
    return;
  }

  tempPlaned.value = planStore.tempPlan;
  form.value = {
    name: tempPlaned.value?.name || "",
    type: "1",
    checked: true,
    content: tempPlaned.value?.content || "",
    startTime: formateDate(new Date(), "yyyy-mm-dd"),
    endTime: getDateAfter(new Date(), 50),
    count: 0,
  };
});
</script>
<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
