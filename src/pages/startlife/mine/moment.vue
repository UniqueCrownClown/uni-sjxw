<template>
  <view class="moment-container">
    <view class="u-m-l-20 u-m-t-50">
      <u-icon name="home" color="#fff" size="50" @click="handleTomine"></u-icon>
    </view>
    <view class="u-p-20 u-flex u-row-left u-flex-wrap">
      <view class="moment-block u-flex u-row-center" @click="handleAddClick">
        <u-icon name="plus" color="#fff" size="100"></u-icon>
      </view>
      <view
        class="moment-block"
        @click="handleUpdateClick(item)"
        @longpress="handleLongPress(item)"
        v-for="item in blockList"
        :key="item.name"
      >
        <view class="u-flex u-row-between">
          <view class="moment-block-badge u-font-xs">
            {{
              item.name === "记下重要的时刻~"
                ? "长按删除示例"
                : getTypeDesc(item.type)
            }}
          </view>
          <view class="u-p-10" @click.stop="handleDeleteClick($event, item)">
            <u-icon
              name="trash-fill"
              color="#fa3534"
              size="50"
              v-if="item.showDeleteIcon"
            ></u-icon>
          </view>
        </view>
        <view class="u-p-10 u-text-center u-font-xl">{{ item.name }}</view>
        <view class="u-p-10 u-text-center">
          <text>
            {{ getTimeDesc(item.type, item.time, item.timeType == "lunar")[0] }}
          </text>
          <text class="u-p-20" style="font-size: 64rpx">
            {{ getTimeDesc(item.type, item.time, item.timeType == "lunar")[1] }}
          </text>
          <text>
            {{ getTimeDesc(item.type, item.time, item.timeType == "lunar")[2] }}
          </text>
        </view>
        <view class="u-p-10 u-text-center u-font-lg">{{
          getTime(item.time, item.timeType == "lunar")
        }}</view>
      </view>
    </view>
    <u-popup
      v-model="showPopup"
      mode="bottom"
      :safe-area-inset-bottom="true"
      border-radius="20"
      :adjust-position="true"
    >
      <view style="background-color: #fff">
        <view class="u-m-t-10 u-p-t-10 u-text-center" style="font-size: 44rpx">创建美好时刻</view>
        <view class="u-p-b-10 u-text-center u-font-xl u-content-color"
          >create beautiful moment</view
        >

        <view class="u-p-20">
          <u-form :model="form" ref="formRef" label-width="160">
            <u-form-item label="时刻名称" prop="name"
              ><u-input v-model="form.name" placeholder="输入时刻名称"
            /></u-form-item>
            <u-form-item label="打卡方式" prop="type">
              <u-radio-group v-model="form.type">
                <u-radio label="0" name="0" active-color="#8ad2b3"
                  >唯一</u-radio
                >
                <u-radio label="1" name="1" active-color="#8ad2b3"
                  >每月重复</u-radio
                >
                <u-radio label="2" name="2" active-color="#8ad2b3"
                  >每年重复</u-radio
                >
              </u-radio-group>
            </u-form-item>
            <u-form-item label="计划周期" prop="birthday">
              <view class="u-flex u-row-left">
                <!-- <picker mode="date" :value="form.time" @change="bindDateChange">
                  <view class="uni-input">{{ form.time }}</view>
                </picker> -->
                <view class="uni-input" @click="showCalendar = true">{{
                  transformText(form.time, form.timeType)
                }}</view>
                <wan-calendar
                  ref="betterCalendarRef"
                  :showCalendar="showCalendar"
                  @confirm="selectDate"
                  @cancel="showCalendar = false"
                  :selectOptions="selectOptions"
                ></wan-calendar>
              </view>
            </u-form-item>
            <u-form-item label="日历提醒" v-if="false">
              <u-switch v-model="form.remind" active-color="#8ad2b3"></u-switch>
            </u-form-item>
            <u-form-item label="置顶">
              <u-switch v-model="form.toTop" active-color="#8ad2b3"></u-switch>
            </u-form-item>
          </u-form>
        </view>
        <view class="u-flex u-row-between u-p-l-20 u-p-r-20 u-m-t-40 u-m-b-40">
          <view style="width: 40%">
            <u-button type="text" shape="circle" @click="handleCancel"
              >取消</u-button
            >
          </view>
          <view style="width: 40%">
            <u-button type="primary" shape="circle" @click="handleSubmit"
              >确认</u-button
            >
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup
      v-model="showContent"
      mode="center"
      border-radius="20"
      :mask-custom-style="{ background: 'rgba(0,0,0, 0.6)' }"
    >
      <view style="width: calc(100vw - 200rpx)">
        <view
          class="moment-block"
          style="
            width: 100%;
            height: 160px;
            margin: 0;
            background: linear-gradient(to bottom right, #4f9679 0%, #98e0c0 100%)
          "
        >
          <view class="u-flex u-row-left">
            <view class="moment-block-badge">
              {{ getTypeDesc(current.type) }}
            </view>
          </view>
          <view class="u-p-10 u-text-center u-font-xl">{{ current.name }}</view>
          <view class="u-p-10 u-text-center">
            <text>
              {{
                getTimeDesc(
                  current.type,
                  current.time,
                  current.timeType == "lunar"
                )[0]
              }}
            </text>
            <text class="u-p-20" style="font-size: 64rpx">
              {{
                getTimeDesc(
                  current.type,
                  current.time,
                  current.timeType == "lunar"
                )[1]
              }}
            </text>
            <text>
              {{
                getTimeDesc(
                  current.type,
                  current.time,
                  current.timeType == "lunar"
                )[2]
              }}
            </text>
          </view>
          <view class="u-p-10 u-text-center u-font-lg">{{
            getTime(current.time, current.timeType == "lunar")
          }}</view>
        </view>
        <view class="u-flex u-p-20">
          <view
            class="u-flex u-row-center u-p-20"
            style="width: 50%; background: transparent"
          >
            <u-icon
              name="edit-pen"
              size="60"
              color="#83cbac"
              @click="handleEditClick"
            ></u-icon>
          </view>
          <view
            class="u-text-center u-p-20"
            style="
              width: 50%;
              position: relative;
              background: transparent;
              border-radius: 10rpx;
            "
          >
            <button
              open-type="share"
              class="invisible-btn"
              hover-class="none"
              :plain="true"
              size="mini"
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 1;
                background: transparent;
                border-radius: 10rpx;
              "
            ></button>
            <u-icon name="share-fill" size="60" color="#83cbac" />
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { formateDate } from "@/utils/common";
import {
  Moment,
  addMoment,
  getMoments,
  updateMoment,
  deleteMoment,
} from "@/api/modules/moment";
import WanCalendar from "@/components/wan-calendar/wan-calendar.vue";
import conversion from "@/components/wan-calendar/calendar";

const title = ref("时刻轻松记");

const blockList = ref<Moment[]>([]);
type RepeatType = "0" | "1" | "2";

const getTypeDesc = (type: RepeatType) => {
  if (type === "0") {
    return "唯一";
  }
  if (type === "1") {
    return "每月";
  }
  if (type === "2") {
    return "每年";
  }
  return "";
};

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getTimeDesc = (
  type: RepeatType,
  time: string = "2025-09-08",
  isLunar: boolean = false
): string[] => {
  // 统一设置为中午12点避免时区和夏令时影响
  const now = new Date();
  now.setHours(12, 0, 0, 0);

  let target: Date;

  // 如果是农历日期处理
  if (isLunar) {
    try {
      // 解析农历日期格式 "2025-09-15"
      const [yearStr, monthStr, dayStr] = time.split("-");
      const lunarYear = parseInt(yearStr);
      const lunarMonth = parseInt(monthStr);
      const lunarDay = parseInt(dayStr);

      // 获取当前农历年份
      const nowSolarDate: any = conversion.solar2lunar(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      );
      const currentLunarYear = nowSolarDate.lYear;
      const currentLunarMonth = nowSolarDate.lMonth;
      const currentLunarDay = nowSolarDate.lDay;

      // 目标农历日期对象
      const targetLunar = {
        year: lunarYear,
        month: lunarMonth,
        day: lunarDay,
        isLeap: false, // 默认不是闰月
      };

      // 计算目标公历日期
      let targetSolarDate;

      // 处理重复类型
      if (type === "1") {
        // 每月重复
        // 计算当前农历月份，如果目标日期已过，则计算下个月
        let tempLunarMonth = currentLunarMonth;
        let tempLunarYear = currentLunarYear;

        // 检查当前农历日期是否已过目标日期
        const isCurrentDatePassed =
          currentLunarMonth > lunarMonth ||
          (currentLunarMonth === lunarMonth && currentLunarDay > lunarDay);

        if (isCurrentDatePassed) {
          tempLunarMonth += 1;
          if (tempLunarMonth > 12) {
            tempLunarMonth = 1;
            tempLunarYear += 1;
          }
        } else {
          tempLunarMonth = lunarMonth;
        }

        // 转换为公历日期
        targetSolarDate = conversion.lunar2solar(
          tempLunarYear,
          tempLunarMonth,
          lunarDay,
          targetLunar.isLeap
        );
      } else if (type === "2") {
        // 每年重复
        // 计算目标农历年份
        let tempLunarYear = currentLunarYear;

        // 检查当前农历日期是否已过目标日期
        const isCurrentDatePassed =
          currentLunarYear > lunarYear ||
          (currentLunarYear === lunarYear && currentLunarMonth > lunarMonth) ||
          (currentLunarYear === lunarYear &&
            currentLunarMonth === lunarMonth &&
            currentLunarDay > lunarDay);

        if (isCurrentDatePassed) {
          tempLunarYear += 1;
        } else {
          tempLunarYear = lunarYear;
        }

        // 转换为公历日期
        targetSolarDate = conversion.lunar2solar(
          tempLunarYear,
          lunarMonth,
          lunarDay,
          targetLunar.isLeap
        );
      } else {
        // 唯一日期
        targetSolarDate = conversion.lunar2solar(
          lunarYear,
          lunarMonth,
          lunarDay,
          targetLunar.isLeap
        );
      }

      // 验证转换结果
      if (!targetSolarDate || targetSolarDate === -1) {
        throw new Error("农历日期转换失败");
      }

      // 创建目标日期对象
      target = new Date(
        `${targetSolarDate.cYear}-${targetSolarDate.cMonth}-${targetSolarDate.cDay}`
      );
      target.setHours(12, 0, 0, 0);
    } catch (error) {
      console.error("农历日期处理错误:", error);
      // 出错时使用原日期作为备选
      target = new Date(time);
      target.setHours(12, 0, 0, 0);
    }
  } else {
    // 原有公历逻辑
    // 验证日期格式是否有效
    const parseDate = (dateStr: string): Date | null => {
      const date = new Date(dateStr);
      return Number.isNaN(date.getTime()) ? null : date;
    };

    const targetDate = parseDate(time);
    if (!targetDate) {
      throw new Error("日期无效");
    }

    target = new Date(targetDate);
    target.setHours(12, 0, 0, 0);

    // 处理重复类型
    if (type !== "0") {
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      // 每月重复
      if (type === "1") {
        // 计算需要偏移的月份数
        let offsetMonths = 0;
        if (target < now) {
          // 目标日期在当前日期之前，计算需要多少个月才能超过当前日期
          const targetDay = target.getDate();
          const tempDate = new Date(currentYear, currentMonth, targetDay);
          tempDate.setHours(12, 0, 0, 0);

          offsetMonths = tempDate < now ? 1 : 0;
        }

        target.setFullYear(currentYear, currentMonth + offsetMonths);

        // 处理月末日期溢出问题（如3月31日转到4月30日）
        if (target.getDate() !== targetDate.getDate()) {
          target.setDate(0); // 设置为当月最后一天
        }
      }

      // 每年重复
      if (type === "2") {
        // 计算年份偏移
        const offsetYears = target < now ? 1 : 0;
        target.setFullYear(currentYear + offsetYears);

        // 处理闰年2月29日特殊情况
        if (targetDate.getMonth() === 1 && targetDate.getDate() === 29) {
          if (!isLeapYear(target.getFullYear())) {
            target.setDate(28);
          }
        }
      }
    }
  }

  // 计算天数差（使用Math.floor避免四舍五入误差）
  const diffMs = target.getTime() - now.getTime();
  const days = Math.floor(diffMs / (1000 * 3600 * 24));

  // 返回格式化结果
  if (days > 0) return ["剩", days.toString(), "天"];
  if (days < 0) return ["已", (-days).toString(), "天"];
  return ["", "今天", ""];
};

const getLunarTime = (time: string) => {
  const date = new Date(time);
  const year = conversion.toChinaYear(date.getFullYear());
  const month = conversion.toChinaMonth(date.getMonth() + 1);
  const day = conversion.toChinaDay(date.getDate());
  // console.log(data);
  return `${year}年${month}${day}`;
};

const getTime = (time: string, isLunar: boolean = false) => {
  if (isLunar) {
    return getLunarTime(time);
  }
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

const form = ref<Moment>({
  name: "",
  type: "0",
  timeType: "solar",
  time: formateDate(new Date(), "yyyy-mm-dd"),
  remind: false,
  toTop: false,
});

const isEdit = ref(false);

// const bindDateChange = (e: any) => {
//   form.value.time = e.detail.value;
// };

const showPopup = ref(false);
const handleAddClick = () => {
  form.value = {
    name: "",
    time: formateDate(new Date(), "yyyy-mm-dd"),
    type: "0",
    timeType: "solar",
    toTop: false,
  };
  isEdit.value = false;
  showPopup.value = true;
};

const showContent = ref(false);
const current = ref<Moment>({
  name: "",
  time: formateDate(new Date(), "yyyy-mm-dd"),
  timeType: "solar",
  type: "0",
});

const handleUpdateClick = (item: Moment) => {
  current.value = item;
  showContent.value = true;
};

const handleCancel = () => {
  showPopup.value = false;
};

const handleSubmit = () => {
  if (form.value.name === "") {
    uni.showToast({
      title: "请输入时刻名称",
      icon: "none",
    });
  }
  if (isEdit.value) {
    updateMoment(form.value);
  } else {
    addMoment(form.value);
  }
  uni
    .showToast({
      title: isEdit.value ? "更新成功" : "创建成功",
      icon: "success",
    })
    .then(() => {
      handleCancel();
      initData();
    });
};

const handleEditClick = () => {
  showContent.value = false;
  isEdit.value = true;
  form.value = current.value;
  showPopup.value = true;
};

const handleLongPress = (item: Moment) => {
  if (item.showDeleteIcon) {
    item.showDeleteIcon = false;
    return;
  }
  //展示删除按钮并把其他块的删除按钮恢复
  blockList.value.forEach((item) => {
    item.showDeleteIcon = false;
  });
  item.showDeleteIcon = true;
};

const handleDeleteClick = (
  e: { stopPropagation: () => void; preventDefault: () => void },
  item: Moment
) => {
  e.stopPropagation();
  e.preventDefault();
  uni.showModal({
    title: "提示",
    content: "确定删除吗？",
    success: (res) => {
      if (res.confirm) {
        deleteMoment(item);
        initData();
      }
      if (res.cancel) {
        item.showDeleteIcon = false;
      }
    },
    fail: () => {
      item.showDeleteIcon = false;
    },
  });
};

const initData = () => {
  const res = getMoments();
  if (res.length === 0) {
    // 添加示例
    addMoment({
      name: "记下重要的时刻~",
      time: formateDate(new Date(), "yyyy-mm-dd"),
      timeType: "solar",
      type: "0",
      toTop: true,
    });
  }
  if (res) {
    blockList.value = res
      .map((item: Moment) => ({
        ...item,
        showDeleteIcon: false,
      }))
      .sort(
        (a: { toTop: any }, b: { toTop: any }) =>
          Number(b.toTop) - Number(a.toTop)
      );
  }
};

const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

const selectOptions = ref([48, 9, 15, 1]);
const showCalendar = ref(false);

const transformText = (time: string, timeType: string) => {
  if (timeType === "lunar") {
    return getLunarTime(time);
  }
  return time;
};

const setCurrentDate = () => {
  const year = new Date().getFullYear() - 1950;
  const month = new Date().getMonth();
  const day = new Date().getDate() - 1;
  selectOptions.value = [year, month, day, 0];
};

const selectDate = (data: any) => {
  console.log(data);
  form.value.time = data.date;
  form.value.timeType = data.type;
  showCalendar.value = false;
};

onLoad(() => {
  setCurrentDate();
  initData();
});

onShareAppMessage(() => {
  return {
    title: "分享给你一个重要的时刻~~",
    path: "/pages/startlife/mine/moment",
  };
});
</script>
<style lang="scss" scoped>
.moment-container {
  padding: 20px;
  background-image: url("https://crownclown.xyz/labubu_bg.jpeg");
  background-size: cover;
  min-height: 100vh;
}
.moment-block {
  width: 46%;
  height: 160px;
  margin: 20rpx 2%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20rpx;
  color: #fff;
  .moment-block-badge {
    background-color: #fff;
    color: #8ad2b3;
    font-weight: 600;
    border-radius: 10rpx;
    margin: 10rpx;
    padding: 10rpx;
  }
}
::v-deep .u-mode-center-box {
  background-color: transparent !important;
}
</style>
