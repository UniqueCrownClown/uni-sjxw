<template>
  <view class="mine">
    <u-navbar
      title="个人中心"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      :back-icon-size="0"
      :back-text-style="{ height: 0 }"
    ></u-navbar>
    <view class="u-flex u-row-left mine-box" @click="handleLogin">
      <u-avatar :src="userInfo.avatar"></u-avatar>
      <view class="u-p-l-20 u-flex-1">
        <view class="u-p-10 u-font-xl u-flex u-row-between"
          ><text>{{ userInfo.nickName }}</text>
          <image
            v-if="userInfo.nickName !== '未登录'"
            style="width: 40rpx; height: 40rpx"
            src="/static/assets/svg/10007.svg"
            @click.stop="handleLogout($event)"
          ></image>
        </view>
        <view class="u-p-10">{{ loginTips }}</view>
      </view>
    </view>
    <view class="mine-box">
      <view class="mine-group-header u-flex" @click="handleInfoClick">
        <text>我的成就</text>
        <view style="font-size: 24rpx; color: #999">
          <u-icon
            name="info-circle-fill"
            size="26"
            class="u-m-l-10 u-m-r-10"
          ></u-icon>
          <text>点击已解锁成就可生成图片</text>
        </view>
      </view>
      <view>
        <u-grid :col="3">
          <u-grid-item
            v-for="item in chengjiuList"
            :key="item.name"
            :class="item.unlock ? 'u-opacity-10' : 'u-opacity-5'"
            @click="handleChengjiuClick(item)"
          >
            <u-icon :name="item.icon" :size="100"></u-icon>
            <view class="grid-text">{{ item.name }}</view>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <view class="mine-box">
      <view class="mine-group-header u-flex">
        <text>云同步</text>
        <view style="font-size: 24rpx; color: #999"
          >(如首页数据清空，请点击从云端同步恢复数据)</view
        >
      </view>
      <view class="u-text-center u-font-xl"><text>未同步</text></view>
      <view class="u-flex u-row-between u-p-l-10 u-p-r-10">
        <u-button type="primary" shape="circle" @click="syncToRemote"
          >同步到云端</u-button
        >
        <u-button type="primary" shape="circle" @click="syncFromRemote"
          >从云端同步</u-button
        >
      </view>
    </view>
    <view class="mine-box" style="padding-bottom: 0">
      <view class="mine-group-header">其他功能</view>
      <view>
        <u-cell-group>
          <u-cell-item
            :arrow="true"
            arrow-direction="right"
            v-for="item in btnList"
            :key="item.id"
            :title="item.name"
            @click="handleCommand(item)"
          >
            <template v-slot:icon>
              <image
                :src="item.iconPath"
                style="width: 40rpx; height: 40rpx; padding: 0 20rpx"
              ></image>
            </template>
          </u-cell-item>
        </u-cell-group>
      </view>
      <u-modal v-model="show" :title="modalTitle">
        <view class="slot-content">
          <rich-text :nodes="content"></rich-text>
        </view>
      </u-modal>
    </view>
    <u-popup v-model="showPoster" mode="center" border-radius="14">
      <view class="u-p-20" style="background: transparent; width: 100vw">
        <view class="u-text-center" v-if="showPoster">
          <dynamic-poster
            ref="dynamicPosterRef"
            :text-items="textItems"
            :image-items="imageItems"
            :qr-code-options="qrOptions"
            :canvasSize="canvasSize"
            :autoBackground="true"
          ></dynamic-poster>
        </view>
        <view class="u-flex u-row-between u-p-20 u-m-t-40">
          <view @click="sharePoster">
            <view class="u-text-center">
              <u-icon name="share-fill" size="80" color="#83cbac"></u-icon>
            </view>
            <view class="u-font-xl u-color-white">发送给朋友</view>
          </view>
          <view @click="collectPoster">
            <view class="u-text-center">
              <u-icon name="gift-fill" size="80" color="#83cbac"></u-icon>
            </view>
            <view class="u-font-xl u-color-white">收藏</view>
          </view>
          <view @click="savePoster">
            <view class="u-text-center">
              <u-icon name="bookmark-fill" size="80" color="#83cbac"></u-icon>
            </view>
            <view class="u-font-xl u-color-white">保存图片</view>
          </view>
        </view>
        <view class="u-flex u-row-center u-m-t-40">
          <u-icon
            name="close-circle"
            size="80"
            color="#83cbac"
            @click="showPoster = false"
          ></u-icon>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { formateDate } from "@/utils/common";
import { aboutTips, feedbackTips } from "@/utils/tips";
import { getUserInfo, clearUserInfo, getPlans } from "@/api/modules/startlife";
import dynamicPoster from "@/components/dynamic-poster/index.vue";

const userInfo = ref({
  nickName: "未登录",
  avatar: "",
});
const loginTips = computed(() => {
  return userInfo.value.nickName === "未登录"
    ? "点击登录以使用完整功能"
    : "已登录";
});

const handleLogout = (e: {
  stopPropagation: () => void;
  preventDefault: () => void;
}) => {
  e.stopPropagation();
  e.preventDefault();
  clearUserInfo();
  userInfo.value.nickName = "未登录";
  uni.showToast({
    title: "已退出登录",
    icon: "success",
  });
};

const btnList = ref([
  // {
  //   id: "time",
  //   name: "时光胶囊",
  //   iconPath: "/static/assets/svg/10001.svg",
  // },
  // {
  //   id: "degree",
  //   name: "重启积分",
  //   iconPath: "/static/assets/svg/10002.svg",
  // },
  {
    id: "manual",
    name: "使用手册",
    iconPath: "/static/assets/svg/10003.svg",
  },
  {
    id: "somewords",
    name: "想说的话",
    iconPath: "/static/assets/svg/10004.svg",
  },
  {
    id: "about",
    name: "关于我们",
    iconPath: "/static/assets/svg/10005.svg",
  },
  {
    id: "feedback",
    name: "用户反馈",
    iconPath: "/static/assets/svg/10006.svg",
  },
  {
    id: "labubu",
    name: "labubu测试",
    iconPath: "/static/assets/svg/10003.svg",
  },
]);

const handleLogin = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/login",
  });
};

const show = ref(false);
const content = ref("");

const modalTitle = ref("");

const handleCommand = (item: { id: string; name: string }) => {
  if (item.id === "labubu") {
    uni.navigateTo({
      url: "/pages/startlife/mine/labubu",
    });
    return;
  }
  if (item.id === "manual") {
    uni.navigateTo({
      url: "/pages/startlife/mine/useBook",
    });
    return;
  }
  if (item.id === "somewords") {
    uni.navigateTo({
      url: "/pages/startlife/mine/someWords",
    });
    return;
  }
  modalTitle.value = item.name;

  if (item.id === "about") {
    content.value = `<div style="padding:20px">${aboutTips}</div>`;
  } else if (item.id === "feedback") {
    content.value = `<div style="padding:20px">${feedbackTips}</div>`;
  }

  show.value = true;
};
const syncToRemote = () => {
  if (!userInfo.value.nickName || userInfo.value.nickName === "未登录") {
    uni.showToast({
      title: "请先登录",
      icon: "none",
    });
    return;
  }
  uni.showToast({
    title: "同步到云端,敬请期待",
    icon: "none",
  });
};
const syncFromRemote = () => {
  if (!userInfo.value.nickName || userInfo.value.nickName === "未登录") {
    uni.showToast({
      title: "请先登录",
      icon: "none",
    });
    return;
  }
  uni.showToast({
    title: "从云端同步,敬请期待",
    icon: "none",
  });
};
const chengjiuList = ref([
  {
    id: 7,
    name: "7天觉醒者",
    desc: "在同一个计划中连续打卡7天",
    // icon: "/static/chengjiu/chengjiu-1.png",
    icon: "https://s21.ax1x.com/2025/08/18/pVBVKrq.md.png",
    unlock: false,
  },
  {
    id: 21,
    name: "21天蜕变者",
    desc: "在同一个计划中连续打卡21天",
    // icon: "/static/chengjiu/chengjiu-2.png",
    icon: "https://s21.ax1x.com/2025/08/18/pVBVuMn.md.png",
    unlock: false,
  },
  {
    id: 50,
    name: "50天涅槃者",
    desc: "在同一个计划中连续打卡50天",
    // icon: "/static/chengjiu/chengjiu-3.png",
    icon: "https://s21.ax1x.com/2025/08/18/pVBVMq0.md.png",
    unlock: false,
  },
]);

const handleInfoClick = () => {
  modalTitle.value = "成就说明";
  let result = "";
  chengjiuList.value.forEach((item) => {
    result += `
    <div style="color:#8ad2b3;">${item.name}</div>
    <div style="padding:10px;color:gray;">${item.desc}</div>`;
  });

  content.value = `<div style="padding:20px">${result}</div>`;
  show.value = true;
};

const dynamicPosterRef = ref<any>();

const showPoster = ref(false);

const { windowWidth } = uni.getWindowInfo();
const width = windowWidth - 160;

const height = (width * 16) / 9;

const canvasSize = ref({
  width,
  height,
});
const textItems = ref([
  {
    text: "7天觉醒者",
    x: 80,
    y: 240,
    font: "500 16px PingFang SC,Microsoft YaHei,sans-serif",
    color: "#ffffff",
  },
  {
    text: `达成时间:${formateDate(new Date(), "yyyy-mm-dd")}`,
    x: 40,
    y: 260,
    font: "500 16px PingFang SC,Microsoft YaHei,sans-serif",
    color: "#ffffff",
  },
]);
const imageItems = ref([
  {
    src: "https://s21.ax1x.com/2025/08/18/pVBVKrq.md.png",
    x: 40,
    y: 20,
    width: 160,
    height: 160,
  },
]);
const qrOptions = ref({
  src: "https://s21.ax1x.com/2025/08/22/pVD6779.jpg",
  x: width - 60,
  y: height - 60,
  width: 50,
  height: 50,
});

const handleChengjiuClick = (item: {
  name: string;
  desc: string;
  icon: string;
  unlock: boolean;
}) => {
  if (!item.unlock) {
    uni.showToast({
      title: "该成就尚未解锁",
      icon: "none",
    });
  } else {
    showPoster.value = true;
  }
};

const sharePoster = () => {
  dynamicPosterRef.value.sharePoster();
};

const collectPoster = () => {
  dynamicPosterRef.value.collectPoster();
};

const savePoster = () => {
  dynamicPosterRef.value.savePoster();
};

const checkUnLock = () => {
  const myPlans = getPlans();
  const plan = myPlans.find((item: any) => item.checked);
  if (!plan) {
    return;
  }
  const endDate = new Date();
  const startDate = new Date(plan.startTime);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  chengjiuList.value.forEach((item: any) => {
    if (diffDays >= item.id) {
      // eslint-disable-next-line no-param-reassign
      item.unlock = true;
    }
  });
  // 测试
  // chengjiuList.value.forEach((item: any) => {
  //   if (item.id === 7) {
  //     // eslint-disable-next-line no-param-reassign
  //     item.unlock = true;
  //   }
  // });
};

const initData = () => {
  const userInfoData = getUserInfo();
  if (userInfoData) {
    userInfo.value.nickName = userInfoData.nickName || "未登录";
    userInfo.value.avatar = userInfoData.avatar || "";
  }
  // 检查哪些需要解锁
  checkUnLock();
};

onShow(() => {
  initData();
});
</script>
<style lang="scss" scoped>
.mine {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.mine-box {
  background-color: #fff;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
}

.mine-group-header {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  border-left: 4rpx solid $main-color;
  padding-left: 20rpx;
  margin: 20rpx 0;
}

::v-deep.u-mode-center-box {
  background: transparent !important;
}
</style>
