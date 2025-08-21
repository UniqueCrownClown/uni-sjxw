<template>
  <view style="background-color: #f5f5f5; height: 100vh">
    <u-navbar
      back-text="返回"
      title="用户设置"
      :background="{ backgroundColor: '#83cbac' }"
      title-color="#fff"
      back-icon-color="#fff"
      :back-text-style="{ color: '#fff' }"
    ></u-navbar>
    <view class="u-p-20 u-m-20" style="background-color: #fff">
      <view class="u-p-10 u-m-10 u-flex u-row-center">
        <!-- <u-avatar :src="avatar" size="large" @click="chooseAvatar"></u-avatar> -->
        <button
          class="avatar-wrapper"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image class="avatar" :src="avatar"></image>
        </button>
      </view>
      <view class="u-p-10 u-m-10 u-flex u-row-center">
        <view style="width: 320rpx">
          <u-input
            v-model="nickName"
            type="text"
            :border="true"
            input-align="center"
            placeholder="请输入昵称"
          />
        </view>
      </view>
      <view class="u-p-10 u-m-10 u-flex u-row-center">
        <view style="width: 240rpx">
          <u-button
            type="primary"
            shape="circle"
            @click="handleSubmit"
            v-if="showSubmit"
            >保存</u-button
          >
          <u-button type="primary" shape="circle" @click="handleLogout" v-else
            >退出登录</u-button
          >
        </view>
      </view>
    </view>
    <view class="u-p-20 u-m-20" style="background-color: #fff">
      <view class="u-font-xl u-p-10">
        <text>提示</text>
      </view>
      <view class="u-p-10">
        <text>1. 设置头像和昵称后，点击按钮保存</text>
      </view>
      <view class="u-p-10">
        <text>2. 您的信息仅用于个性化显示，不会被用于其他用途</text>
      </view>
      <view class="u-p-10">
        <text>3. 退出登录不影响您已有数据的展示，可随时修改头像 & 昵称</text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import {
  setUserInfo,
  getUserInfo,
  clearUserInfo,
} from "@/api/modules/startlife";

const nickName = ref("");
const avatar = ref("");

const showSubmit = ref(true);

const onChooseAvatar = (e: any) => {
  avatar.value = e.detail.avatarUrl;
};

// const chooseAvatar = () => {
//   uni.showActionSheet({
//     itemList: ["使用微信头像", "从相册选择", "拍照"],
//     success: async (res) => {
//       switch (res.tapIndex) {
//         case 0:
//           // 使用微信头像
//           const userProfile = await uni.getUserProfile({
//             desc: "用于完善用户资料",
//           });
//           avatar.value = userProfile.userInfo.avatarUrl;
//           break;
//         case 1:
//           // 从相册选择
//           const albumRes = await uni.chooseImage({
//             count: 1,
//             sourceType: ["album"],
//           });
//           const [tempFilePath] = albumRes.tempFilePaths;
//           avatar.value = tempFilePath;
//           break;
//         case 2:
//           // 拍照
//           const cameraRes = await uni.chooseImage({
//             count: 1,
//             sourceType: ["camera"],
//           });
//           const [cameraFilePath] = cameraRes.tempFilePaths;
//           avatar.value = cameraFilePath;
//           break;
//         default:
//           break;
//       }
//     },
//   });
// };

const handleSubmit = () => {
  // 提交昵称
  if (nickName.value === "") {
    uni.showToast({
      title: "请输入昵称",
      icon: "none",
    });
    return;
  }
  if (avatar.value === "") {
    uni.showToast({
      title: "请选择头像",
      icon: "none",
    });
    return;
  }

  setUserInfo({
    nickName: nickName.value,
    avatar: avatar.value,
  });

  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

const handleLogout = () => {
  // 弹出确认退出对话框
  uni.showModal({
    title: "确认退出",
    content: "确定要退出登录吗？",
    confirmText: "退出",
    cancelText: "取消",
    success: (res) => {
      if (res.confirm) {
        // 用户点击确认后执行退出逻辑
        clearUserInfo();

        nickName.value = "";
        showSubmit.value = true;
      }
      // 用户点击取消则不执行任何操作
    },
  });
};

onShow(() => {
  const userInfo = getUserInfo();

  if (userInfo) {
    nickName.value = userInfo.nickName;
    avatar.value = userInfo.avatar;
    showSubmit.value = false;
  }
});
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  padding: 0;
  width: 80px !important;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.avatar {
  display: block;
  width: 80px;
  height: 80px;
}
</style>
