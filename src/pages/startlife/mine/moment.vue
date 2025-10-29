<template>
  <view class="moment-container">
    <view class="u-m-l-20 u-m-t-50 moment-header">
      <u-icon name="home" color="#fff" size="50" @click="handleTomine"></u-icon>
    </view>
    <view class="moment-main">
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
          <view
            class="u-p-10 u-text-center u-font-xl"
            style="white-space: nowrap"
            >{{ item.name }}</view
          >
          <view class="u-p-10 u-text-center">
            <text>
              {{
                getTimeDesc(item.type, item.time, item.timeType == "lunar")[0]
              }}
            </text>
            <text class="u-p-20" style="font-size: 64rpx">
              {{
                getTimeDesc(item.type, item.time, item.timeType == "lunar")[1]
              }}
            </text>
            <text>
              {{
                getTimeDesc(item.type, item.time, item.timeType == "lunar")[2]
              }}
            </text>
          </view>
          <view class="u-p-10 u-text-center u-font-lg">{{
            getTime(item.time, item.timeType == "lunar")
          }}</view>
        </view>
      </view>
    </view>
    <view class="moment-footer safe-area-inset-bottom">
      <u-icon
        name="question-circle"
        color="#ffffff"
        size="50"
        @click="momentPopup = true"
      ></u-icon>
    </view>
    <u-popup v-model="momentPopup" mode="center" width="90%" :closeable="true">
      <view
        class="u-p-40 u-p-t-80 u-content-color u-text-center u-font-lg"
        style="
          background-color: rgba(255, 255, 255, 0.8);
          line-height: 50rpx;
          color: #606266;
        "
        ><text
          >总有一些时刻弥足珍贵,不应该忘记，忘性大星人快用时刻轻松记来记录这些动人的时刻吧！！</text
        ></view
      >
    </u-popup>
    <u-popup
      v-model="showPopup"
      mode="bottom"
      :safe-area-inset-bottom="true"
      border-radius="20"
      :adjust-position="true"
    >
      <view style="background-color: #fff">
        <view class="u-m-t-10 u-p-t-10 u-text-center" style="font-size: 44rpx"
          >创建美好时刻</view
        >
        <view class="u-p-b-10 u-text-center u-font-xl u-content-color"
          >create beautiful moment</view
        >

        <view class="u-p-20">
          <u-form :model="form" ref="formRef" label-width="160">
            <u-form-item label="时刻名称" prop="name"
              ><u-input
                v-model="form.name"
                placeholder="输入时刻名称"
                :disabled="isEdit"
            /></u-form-item>
            <u-form-item label="打卡方式" prop="type">
              <u-radio-group v-model="form.type">
                <u-radio
                  v-for="(item, index) in radioList"
                  :key="index"
                  :name="item.name"
                  active-color="#8ad2b3"
                  >{{ item.label }}</u-radio
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
        <view class="moment-block moment-block-current">
          <view class="u-flex u-row-left">
            <view class="moment-block-badge">
              {{ getTypeDesc(current.type) }}
            </view>
          </view>
          <view
            class="u-p-10 u-text-center u-font-xl"
            style="white-space: nowrap"
            >{{ current.name }}</view
          >
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
    <!-- 在template中添加，放在最外层view的末尾 -->
    <canvas
      id="shareCanvas"
      type="2d"
      style="
        width: 500px;
        height: 400px;
        position: fixed;
        left: -9999px;
        top: -9999px;
      "
    ></canvas>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { formateDate, getTimeDesc } from "@/utils/common";
import {
  Moment,
addMoment,
  getMoments,
  updateMoment,
  deleteMoment,
} from "@/api/modules/moment";
import WanCalendar from "@/components/wan-calendar/wan-calendar.vue";
import conversion from "@/components/wan-calendar/calendar";

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

const radioList = ref([
  {
    name: "0",
    label: "唯一",
  },
  {
    name: "1",
    label: "每月重复",
  },
  {
    name: "2",
    label: "每年重复",
  },
]);
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

const showContent = ref(false);
const current = ref<Moment>({
  name: "",
  time: formateDate(new Date(), "yyyy-mm-dd"),
  timeType: "solar",
  type: "0",
});

const handleUpdateClick = async (item: Moment) => {
  current.value = JSON.parse(JSON.stringify(item));

  // 预生成分享图片
  try {
    await generateShareImage();
  } catch (error) {
    console.error("预生成分享图片失败:", error);
  }

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
    blockList.value = [
      {
        name: "记下重要的时刻~",
        time: formateDate(new Date(), "yyyy-mm-dd"),
        timeType: "solar",
        type: "0",
        toTop: true,
        showDeleteIcon: false,
      },
    ];
    return;
  }
  blockList.value = res
    .map((item: Moment) => ({
      ...item,
      showDeleteIcon: false,
    }))
    .sort(
      (a: { toTop: any }, b: { toTop: any }) =>
        Number(b.toTop) - Number(a.toTop)
    );
};

const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

const selectOptions = ref([48, 9, 15, 1]);
const setCurrentDate = () => {
  const year = new Date().getFullYear() - 1950;
  const month = new Date().getMonth();
  const day = new Date().getDate() - 1;
  selectOptions.value = [year, month, day, 0];
};
const showCalendar = ref(false);

const handleAddClick = () => {
  form.value.name = "";
  form.value.time = formateDate(new Date(), "yyyy-mm-dd");
  form.value.type = "0";
  form.value.timeType = "solar";
  form.value.toTop = false;
  setCurrentDate();
  isEdit.value = false;
  showPopup.value = true;
};

const transformText = (time: string, timeType: string) => {
  if (timeType === "lunar") {
    return getLunarTime(time);
  }
  return time;
};

const selectDate = (data: any) => {
  console.log(data);
  form.value.time = data.date;
  form.value.timeType = data.type;
  showCalendar.value = false;
};

const momentPopup = ref(false);

onLoad(() => {
  setCurrentDate();
  initData();
});

// 生成分享图片
const generateShareImage: () => Promise<string> = () => {
  return new Promise((resolve, reject) => {
    // 使用 Canvas 2D 接口
    const query = uni.createSelectorQuery();
    query.select('#shareCanvas')
      .fields({ node: true, size: true } as any, (result) => console.log(result))
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 设置 canvas 尺寸
        const dpr = uni.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        // 设置背景
        ctx.fillStyle = "#4f9679";
        ctx.fillRect(0, 0, 500, 400);

        // 绘制标题
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "38px sans-serif"; // 从32改为38，增加6个字号
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(current.value.name, 250, 100);

        // 绘制时间信息
        const timeDesc = getTimeDesc(
          current.value.type,
          current.value.time,
          current.value.timeType == "lunar"
        );

        // 计算总宽度，用于横向居中排列
        ctx.font = "28px sans-serif";
        const width1 = ctx.measureText(timeDesc[0]).width;
        ctx.font = "40px sans-serif";
        const width2 = ctx.measureText(timeDesc[1]).width;
        ctx.font = "28px sans-serif";
        const width3 = ctx.measureText(timeDesc[2]).width;
        
        const totalWidth = width1 + width2 + width3 + 40; // 加上间距
        let startX = (500 - totalWidth) / 2; // 计算起始x坐标，使整体居中
        
        // 绘制第一部分
        ctx.font = "28px sans-serif";
        ctx.fillText(timeDesc[0], startX, 200);
        startX += width1 + 20; // 更新x坐标，添加间距
        
        // 绘制第二部分（较大字体）
        ctx.font = "40px sans-serif";
        ctx.fillText(timeDesc[1], startX, 200);
        startX += width2 + 20; // 更新x坐标，添加间距
        
        // 绘制第三部分
        ctx.font = "28px sans-serif";
        ctx.fillText(timeDesc[2], startX, 200);

        // 绘制完整日期
        ctx.font = "32px sans-serif"; 
        ctx.fillText(
          getTime(current.value.time, current.value.timeType == "lunar"),
          250,
          300
        );

        // 绘制类型标签
        // ctx.fillStyle = "#FFFFFF";
        // ctx.font = "22px sans-serif";
        // ctx.fillText(getTypeDesc(current.value.type), 250, 350);

        // 将Canvas转换为临时图片
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 500,
          height: 400,
          destWidth: 500 * dpr,
          destHeight: 400 * dpr,
          canvasId: 'shareCanvas',
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
  });
};

onShareAppMessage(async () => {
  try {
    // 生成分享图片
    const shareImageUrl = await generateShareImage();

    return {
      title: `分享给你一个重要的时刻：${current.value.name}`,
      path: "/pages/startlife/mine/moment",
      imageUrl: shareImageUrl, // 使用动态生成的图片
    };
  } catch (error) {
    console.error("生成分享图片失败:", error);

    // 如果生成失败，使用默认图片
    return {
      title: "分享给你一个重要的时刻~~",
      path: "/pages/startlife/mine/moment",
    };
  }
});
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
.moment-block {
  width: 46%;
  margin: 20rpx 2%;
  padding: 10rpx;
  min-height: 172px;
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
.moment-block-current {
  width: 100%;
  padding: 10rpx;
  min-height: 172px;
  margin: 0;
  background: linear-gradient(to bottom right, #4f9679 0%, #98e0c0 100%);
}
::v-deep .u-mode-center-box {
  background-color: transparent !important;
}
</style>