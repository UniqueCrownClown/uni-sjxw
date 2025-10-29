<template>
  <view class="poster-container u-flex u-row-center">
    <!-- 生成的图片预览 -->
    <image
      :src="posterImageUrl"
      mode="aspectFit"
      class="poster-preview"
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
      v-if="posterImageUrl && !showCanvas"
      @longpress="handleLongPress"
    ></image>
    <!-- 画布组件，用于绘制海报 -->
    <canvas
      type="2d"
      canvas-id="posterCanvas"
      id="posterCanvas"
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
      class="poster-canvas"
      v-if="showCanvas"
    ></canvas>
    <u-popup v-model="showActionSheet" mode="bottom" :closeable="true">
      <view class="u-p-t-60 u-p-b-30">
        <view
          class="operation-btn"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          "
          ><text>转发</text>
          <button
            open-type="share"
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              z-index: 1;
            "
          >
            转发
          </button>
        </view>
        <view class="operation-btn" @click="handleActionClick(1)"
          >保存图片</view
        >
        <view class="operation-btn" @click="handleActionClick(2)">收藏</view>
      </view>
    </u-popup>
    <!-- 操作按钮 -->
    <view class="button-group" v-if="false">
      <button
        @click="generatePoster"
        class="operation-btn primary"
        :loading="isGenerating"
      >
        生成海报
      </button>
      <button
        @click="savePoster"
        class="operation-btn"
        :disabled="!posterImageUrl"
      >
        保存图片
      </button>
      <button @click="resetPoster" class="operation-btn" v-if="posterImageUrl">
        重新生成
      </button>
      <button open-type="share" class="share-btn">分享给好友</button>
    </view>
  </view>
</template>

<script lang="ts">
import { onReady, onShareAppMessage } from "@dcloudio/uni-app";
import { defineComponent, ref, getCurrentInstance } from "vue";

export default defineComponent({
  name: "DynamicPoster",
  props: {
    // 海报背景图URL
    backgroundImage: {
      type: String,
      default: "",
    },
    // 是否自动添加渐变背景
    autoBackground: {
      type: Boolean,
      default: false,
    },
    // 要添加的文字内容列表
    textItems: {
      type: Array,
      default: () => [
        {
          text: "默认标题",
          x: 50,
          y: 100,
          fontSize: 24,
          color: "#000000",
          fontWeight: "bold",
        },
        { text: "默认描述文字", x: 50, y: 150, fontSize: 16, color: "#666666" },
      ],
    },
    // 二维码URL,位置和大小
    qrCodeOptions: {
      type: Object,
      default: () => ({
        src: "",
        x: 300,
        y: 500,
        width: 120,
        height: 120,
      }),
    },
    // 要添加的图片内容列表
    imageItems: {
      type: Array,
      default: () => [],
    },
    // 画布尺寸
    canvasSize: {
      type: Object,
      default: () => ({ width: 750, height: 1334 }), // 微信小程序常用尺寸
    },
  },
  setup(props) {
    // 组件实例
    let instance: any;

    // canvas实例
    let canvas: any;

    const canvasContext = ref<CanvasRenderingContext2D | null>(null);
    const posterImageUrl = ref("");
    const isGenerating = ref(false);
    const showCanvas = ref(true);

    // 从props获取画布尺寸
    const canvasWidth = ref(props.canvasSize.width);
    const canvasHeight = ref(props.canvasSize.height);

    const getCanvas = () => {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(instance)
          .select("#posterCanvas")
          .fields(
            {
              node: true,
              size: true,
            } as any,
            () => {}
          )
          .exec((res) => {
            console.log("canvas", res);
            const canvasIns = res[0].node || res[0].context;
            resolve(canvasIns);
          });
      });
    };

    // 初始化画布
    const initCanvas = async () => {
      canvas = await getCanvas();
      // 获取2D上下文
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const { pixelRatio } = uni.getWindowInfo();
      if (ctx) {
        canvasContext.value = ctx;

        // // 设置Canvas尺寸
        // const { windowWidth } = uni.getWindowInfo();
        // // eslint-disable-next-line no-param-reassign
        // canvas.width = windowWidth - 20;
        // // eslint-disable-next-line no-param-reassign
        // canvas.height = (canvas.width * 16) / 9;

        // canvasWidth.value = canvas.width;
        // canvasHeight.value = canvas.height;

        canvas.width = canvasWidth.value * pixelRatio;
        canvas.height = canvasHeight.value * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        return true;
      }
      return false;
    };
    // 绘制渐变的背景色
    const drawGradientBackground = () => {
      if (!canvasContext.value) return;

      const gradient = canvasContext.value.createLinearGradient(
        0,
        0,
        0,
        canvasHeight.value
      );
      gradient.addColorStop(0, "#8ad2b3");
      gradient.addColorStop(1, "#FFFFFF");
      canvasContext.value.fillStyle = gradient;
      canvasContext.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
    };

    // 绘制单张图片
    const drawImage = (data: {
      src: string;
      x: number;
      y: number;
      width: number;
      height: number;
    }) => {
      if (!canvasContext.value) return false;

      return new Promise((resolve) => {
        uni.getImageInfo({
          src: data.src,
          success: (res) => {
            const img = canvas.createImage();
            img.src = res.path;
            img.onload = function () {
              canvasContext.value?.drawImage(
                img,
                data.x,
                data.y,
                data.width,
                data.height
              );
              resolve(true);
            };
            // Handle image load errors
            img.onerror = function (error: any) {
              uni.showToast({ title: "Image load failed", icon: "error" });
              resolve(false);
              throw error;
            };
          },
          fail: (error) => {
            resolve(false);
            throw error;
          },
        });
      });
    };

    // 绘制背景图
    const drawBackground = async () => {
      return drawImage({
        src: props.backgroundImage,
        x: 0,
        y: 0,
        width: canvasWidth.value,
        height: canvasHeight.value,
      });
    };

    // 绘制文字
    const drawTexts = () => {
      if (!canvasContext.value) return;

      props.textItems.forEach((item: any) => {
        (canvasContext.value as CanvasRenderingContext2D).fillStyle =
          item.color || "#000000";
        // 设置字体
        (canvasContext.value as CanvasRenderingContext2D).font =
          item?.font || "500 16px PingFang SC,Microsoft YaHei,sans-serif";

        (canvasContext.value as CanvasRenderingContext2D).textBaseline =
          item?.textBaseline || "middle";

        // 设置水平对齐 (left|right|center|start|end)
        (canvasContext.value as CanvasRenderingContext2D).textAlign =
          item?.textAlign || "left";
        let adjustedX = item.x;
        // 配置为9999的时候自动居中
        if (adjustedX === 9999) {
          // 获取文本宽度
          const textWidth =
            canvasContext.value?.measureText(item.text).width ||
            canvasWidth.value;
          // 根据宽度调整位置
          adjustedX = canvasWidth.value / 2 - textWidth / 2; // 居中
        }

        canvasContext.value?.fillText(item.text, adjustedX, item.y);
      });
    };
    // 绘制图片
    const drawImages = () => {
      const imageItems = props.imageItems.map((item: any) => {
        return drawImage({
          src: item.src,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
        });
      });
      return Promise.all(imageItems).then((res) => {
        return res.every((item) => item);
      });
    };

    // 绘制二维码
    const drawQrCode = async () => {
      return drawImage({
        src: props.qrCodeOptions.src,
        x: props.qrCodeOptions.x,
        y: props.qrCodeOptions.y,
        width: props.qrCodeOptions.width,
        height: props.qrCodeOptions.height,
      });
    };

    // 生成海报
    const generatePoster = async () => {
      isGenerating.value = true;
      posterImageUrl.value = "";

      // 添加加载提示
      uni.showLoading({
        title: "海报生成中...",
        mask: true,
      });

      try {
        // 初始化画布
        const initSuccess = await initCanvas();
        if (!initSuccess) {
          throw new Error("初始化画布失败");
        }

        // 绘制渐变背景
        if (props.autoBackground) {
          drawGradientBackground();
        }

        // 绘制背景
        if (props.backgroundImage) {
          const bgSuccess = await drawBackground();
          if (!bgSuccess) {
            throw new Error("绘制背景失败");
          }
        }

        // 绘制文字
        drawTexts();

        // 绘制二维码
        if (props.qrCodeOptions?.src) {
          const qrSuccess = await drawQrCode();
          if (!qrSuccess) {
            throw new Error("绘制二维码失败");
          }
        }

        // 绘制图片
        const imgSuccess = await drawImages();
        if (!imgSuccess) {
          throw new Error("绘制图片失败");
        }

        // 获取临时图片路径
        const tempFilePath = await new Promise<string>((resolve, reject) => {
          uni.canvasToTempFilePath(
            {
              canvasId: "posterCanvas",
              canvas,
              success: (res) => {
                resolve(res.tempFilePath);
              },
              fail: (err) => {
                reject(err);
                throw err;
              },
            },
            instance
          );
        });

        posterImageUrl.value = tempFilePath;
        showCanvas.value = false; // 隐藏画布，显示图片
        isGenerating.value = false;
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: "生成海报失败",
          icon: "none",
        });
        isGenerating.value = false;
        throw error;
      } finally {
        uni.hideLoading();
      }
    };

    // 保存海报到相册
    const savePoster = async () => {
      if (!posterImageUrl.value) return;

      // 检查是否有保存图片权限
      const setting = await uni.getSetting();
      if (!setting.authSetting["scope.writePhotosAlbum"]) {
        // 没有权限，申请权限
        const auth = await uni.authorize({
          scope: "scope.writePhotosAlbum",
        } as any);

        if (auth.errMsg.indexOf("fail") !== -1) {
          // 用户拒绝授权，引导用户去设置页面开启
          uni.showModal({
            title: "权限提示",
            content: "需要获取保存图片到相册的权限，请在设置中开启",
            success: (res) => {
              if (res.confirm) {
                uni.openSetting();
              }
            },
          });
          return;
        }
      }

      // 保存图片
      try {
        await uni.saveImageToPhotosAlbum({
          filePath: posterImageUrl.value,
        } as any);

        uni.showToast({
          title: "保存成功",
          icon: "success",
        });
      } catch (error) {
        uni.showToast({
          title: "保存失败",
          icon: "none",
        });
        throw error;
      }
    };
    // 收藏海报
    const collectPoster = () => {
      uni.showToast({
        title: "收藏成功",
        icon: "none",
      });
    };
    // 分享海报
    const sharePoster = () => {
      if (!posterImageUrl.value) return;
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 2,
        imageUrl: posterImageUrl.value,
        success: () =>
          uni.showToast({
            title: "分享成功",
            icon: "none",
          }),
        fail: (error: any) => {
          uni.showToast({
            title: "分享失败",
            icon: "none",
          });
          throw error;
        },
      });
    };
    // 重置海报
    const resetPoster = () => {
      posterImageUrl.value = "";
      showCanvas.value = true;
    };

    // 操作弹窗
    const showActionSheet = ref(false);
    const handleActionClick = (index: number) => {
      switch (index) {
        case 0:
          sharePoster();
          break;
        case 1:
          savePoster();
          break;
        case 2:
          collectPoster();
          break;
        default:
          break;
      }
      showActionSheet.value = false;
    };
    // 长按图片
    const handleLongPress = () => {
      showActionSheet.value = true;
    };

    // 组件就绪时初始化
    onReady(async () => {
      // 可以在这里预加载资源
      instance = getCurrentInstance();
      generatePoster();
    });

    onShareAppMessage(() => {
      return {
        title: "快来和我一起快乐打卡吧~~", // 分享卡片标题
        path: "/pages/startlife/index/index", // 分享后打开的页面路径（可带参数）
        imageUrl: posterImageUrl.value,
      };
    });

    return {
      canvasWidth,
      canvasHeight,
      posterImageUrl,
      isGenerating,
      showCanvas,
      generatePoster,
      savePoster,
      collectPoster,
      sharePoster,
      resetPoster,
      handleLongPress,
      showActionSheet,
      handleActionClick,
      onShareAppMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.poster-container {
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
  transition: none !important;
}

.poster-canvas,
.poster-preview {
  background-color: #f5f5f5;
  transition: none !important;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
  margin-top: 30rpx;
  width: 100%;
  max-width: 750rpx;
}

.operation-btn {
  width: 100%;
  padding: 24rpx 0;
  border-radius: 12rpx;
  font-size: 32rpx;
  text-align: center;
}

.operation-btn.primary {
  background-color: $main-color;
  color: white;
}
</style>
