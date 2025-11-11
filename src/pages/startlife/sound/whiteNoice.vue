<template>
  <view class="white-noise-container" :style="{ background: currentGradient }">
    <view class="u-m-l-20 u-m-t-50">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>
    <view class="header">
      <text class="title">白噪音</text>
      <text class="text-sm opacity-80">助眠 · 专注 · 放松</text>
    </view>

    <!-- 白噪音网格列表 -->
    <view class="noise-grid">
      <view
        class="noise-item glass-card"
        v-for="noise in whiteNoiseList"
        :key="noise.id"
        @click="togglePlay(noise)"
        :class="{ 'is-playing': noise.isPlaying }"
      >
        <view class="noise-icon">
          <image :src="noise.icon" mode="aspectFit"></image>
        </view>
        <text class="noise-name">{{ noise.name }}</text>
        <view class="play-icon">
          <text :class="noise.isPlaying ? 'icon-pause' : 'icon-play'">
            {{ noise.isPlaying ? "❚❚" : "▶" }}
          </text>
        </view>
      </view>
    </view>

    <!-- 音量控制区域 -->
    <view class="volume-controls glass-card" v-if="showVolumeControls">
      <view
        class="volume-item"
        v-for="noise in whiteNoiseList"
        :key="'volume-' + noise.id"
        v-show="noise.isPlaying"
      >
        <text class="volume-label">{{ noise.name }}</text>
        <slider
          :value="noise.volume * 100"
          @change="updateVolume($event, noise)"
          min="0"
          max="100"
          show-value
          backgroundColor="rgba(255, 255, 255, 0.3)"
          activeColor="#9b59b6"
          blockSize="20"
        />
      </view>
    </view>

    <!-- 定时控制区域 -->
    <view class="time-controls glass-card" v-if="showVolumeControls">
      <view class="timer-container" @click="showTimerModal">
        <text class="timer-text">{{ timerDisplay }}</text>
      </view>
      <view class="timer-count" v-show="selectedTimer > 0"
        >剩余时间:<text>{{ timerCount }}</text></view
      >
    </view>
    <!-- 定时器弹窗 -->
    <view class="timer-modal" v-if="showTimer">
      <view class="modal-mask" @click="closeTimerModal"></view>
      <view class="modal-content glass-card">
        <view class="modal-header">
          <text class="modal-title">设置定时</text>
          <text class="modal-close" @click="closeTimerModal">×</text>
        </view>
        <view class="timer-options">
          <view
            class="timer-option"
            v-for="option in timerOptions"
            :key="option.value"
            @click="setTimer(option.value)"
          >
            <text :class="{ active: selectedTimer === option.value }">{{
              option.label
            }}</text>
          </view>
          <!-- 添加取消定时选项 -->
          <view
            class="timer-option cancel-option"
            v-if="selectedTimer > 0"
            @click="cancelTimer"
          >
            <text>取消定时</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

interface WhiteNoise {
  id: string; // 唯一标识
  name: string; // 名称
  url: string; // 音频地址（本地路径或CDN）
  icon: string; // 图标路径
  volume: number; // 音量（0-1）
  isPlaying: boolean; // 播放状态
  audioContext?: UniApp.InnerAudioContext | null; // 音频上下文
}

interface TimerOption {
  label: string;
  value: number; // 定时时间，单位：毫秒
}

const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

// 白噪音列表
const whiteNoiseList = ref<WhiteNoise[]>([
  {
    id: "1",
    name: "鸟叫声",
    url: "https://crownclown.xyz/sound/Birdsong.mp3",
    icon: "/static/assets/svg/10001.svg",
    volume: 0.5,
    isPlaying: false,
  },
  {
    id: "2",
    name: "篝火",
    url: "https://crownclown.xyz/sound/Campfire.mp3",
    icon: "/static/assets/svg/10002.svg",
    volume: 0.5,
    isPlaying: false,
  },
  {
    id: "3",
    name: "蟋蟀叫声",
    url: "https://crownclown.xyz/sound/Crickets.mp3",
    icon: "/static/assets/svg/10003.svg",
    volume: 0.5,
    isPlaying: false,
  },
  {
    id: "4",
    name: "雨声",
    url: "https://crownclown.xyz/sound/Rain.mp3",
    icon: "/static/assets/svg/10004.svg",
    volume: 0.5,
    isPlaying: false,
  },
  {
    id: "5",
    name: "海浪声",
    url: "https://crownclown.xyz/sound/Waves.mp3",
    icon: "/static/assets/svg/10005.svg",
    volume: 0.5,
    isPlaying: false,
  },
  {
    id: "6",
    name: "风声",
    url: "https://crownclown.xyz/sound/Wind.mp3",
    icon: "/static/assets/svg/10006.svg",
    volume: 0.5,
    isPlaying: false,
  },
  {
    id: "7",
    name: "夏夜声",
    url: "https://crownclown.xyz/sound/summer.mp3",
    icon: "/static/assets/svg/10007.svg",
    volume: 0.5,
    isPlaying: false,
  },
  {
    id: "8",
    name: "风铃声",
    url: "https://crownclown.xyz/sound/wind-chime.mp3",
    icon: "/static/assets/svg/10008.svg",
    volume: 0.5,
    isPlaying: false,
  },
  {
    id: "9",
    name: "FiresideDate",
    url: "https://crownclown.xyz/sound/piano.mp3",
    icon: "/static/assets/svg/10009.svg",
    volume: 0.5,
    isPlaying: false,
  },
]);

// 显示音量控制区域
const showVolumeControls = computed(() => {
  // 检查是否有噪音在播放
  return whiteNoiseList.value.some((noise) => noise.isPlaying);
});

// 测试音频URL是否可访问
// const testAudioUrl = (url: string) => {
//   console.log(`测试音频URL: ${url}`);
//   // 创建一个临时的音频对象来测试URL
//   const testAudio = uni.createInnerAudioContext();
//   testAudio.src = url;

//   testAudio.onCanplay(() => {
//     console.log(`URL可访问: ${url}`);
//     testAudio.destroy();
//   });

//   testAudio.onError((err) => {
//     console.error(`URL不可访问: ${url}`, err);
//     testAudio.destroy();
//   });
// };

// 组件挂载时初始化
onMounted(() => {
  // 测试所有音频URL
  // whiteNoiseList.value.forEach((noise) => {
  //   testAudioUrl(noise.url);
  // });

  // 设置后台播放
  // #ifdef APP-PLUS
  try {
    const main = plus.android.runtimeMainActivity();
    const Context = plus.android.importClass("android.content.Context");
    const AudioManager = plus.android.importClass("android.media.AudioManager");
    const audioManager = main.getSystemService(Context.AUDIO_SERVICE);

    // 请求音频焦点
    audioManager.requestAudioFocus(
      null,
      AudioManager.STREAM_MUSIC,
      AudioManager.AUDIOFOCUS_GAIN
    );
  } catch (error) {
    console.error("设置后台播放失败:", error);
  }
  // #endif

  // 初始化屏幕常亮状态为false
  // try {
  //   uni.setKeepScreenOn({
  //     keepScreenOn: false
  //   });
  //   console.log("初始化屏幕常亮状态为false");
  // } catch (error) {
  //   console.error("初始化屏幕常亮失败:", error);
  // }
});

// 定时器相关
const showTimer = ref<boolean>(false);
const selectedTimer = ref<number>(0); // 当前选中的定时时间，0表示不定时
const timerStartTime = ref<number>(0); // 定时开始时间
const timerInterval = ref<NodeJS.Timeout | null>(null); // 定时器ID
const currentTime = ref<number>(Date.now()); // 当前时间，用于触发计算属性更新

// 动态渐变背景
const currentGradient = computed(() => {
  // 获取当前播放的声音
  const playingSounds = whiteNoiseList.value.filter((noise) => noise.isPlaying);

  if (playingSounds.length === 0) {
    // 默认渐变背景
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  }

  // 根据播放的声音类型返回不同的渐变背景
  const soundNames = playingSounds.map((noise) => noise.name);

  if (soundNames.includes("雨声")) {
    return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
  } else if (soundNames.includes("海浪声")) {
    return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
  } else if (soundNames.includes("鸟叫声")) {
    return "linear-gradient(135deg, #fa709a 0%, #fee140 100%)";
  } else if (soundNames.includes("篝火")) {
    return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
  } else if (soundNames.includes("蟋蟀叫声")) {
    return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
  } else if (soundNames.includes("风声")) {
    return "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)";
  } else if (soundNames.includes("夏夜声")) {
    return "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
  } else if (soundNames.includes("风铃声")) {
    return "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)";
  } else if (soundNames.includes("FiresideDate")) {
    return "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)";
  } 
  // 默认紫色渐变
  return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
});

// 定时选项
const timerOptions: TimerOption[] = [
  { label: "取消定时", value: 0 },
  { label: "5秒钟", value: 5000 },
  { label: "15分钟", value: 15 * 60 * 1000 },
  { label: "30分钟", value: 30 * 60 * 1000 },
  { label: "1小时", value: 60 * 60 * 1000 },
];
// 计算剩余时间显示
const timerDisplay = ref("设置定时");

const timerCount = computed(() => {
  if (selectedTimer.value === 0) return "";

  const elapsed = currentTime.value - timerStartTime.value;
  const remaining = selectedTimer.value - elapsed;

  // 如果时间已到，重置定时器状态
  if (remaining <= 0) {
    // 延迟重置，确保定时器逻辑先执行
    setTimeout(() => {
      if (
        selectedTimer.value > 0 &&
        currentTime.value - timerStartTime.value >= selectedTimer.value
      ) {
        selectedTimer.value = 0;
        if (timerInterval.value) {
          clearInterval(timerInterval.value);
          timerInterval.value = null;
        }
      }
    }, 100);
    return "";
  }

  const minutes = Math.floor(remaining / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

// 设置屏幕常亮
const setKeepScreenOn = (keepOn: boolean) => {
  try {
    uni.setKeepScreenOn({
      keepScreenOn: keepOn,
    });
    console.log(`设置屏幕常亮: ${keepOn ? "开启" : "关闭"}`);
  } catch (error) {
    console.error("设置屏幕常亮失败:", error);
  }
};

// 检查是否有音频在播放，并设置屏幕常亮状态
const checkAndSetKeepScreenOn = () => {
  const hasPlayingAudio = whiteNoiseList.value.some((noise) => noise.isPlaying);
  setKeepScreenOn(hasPlayingAudio);
};

// 切换播放状态
const togglePlay = (noise: WhiteNoise) => {
  // 使用局部变量引用音频上下文
  let ac: any = noise.audioContext;

  if (noise.isPlaying) {
    console.log(
      `尝试停止 ${noise.name}, 当前状态: ${noise.isPlaying}, 音频上下文状态: ${
        ac ? "存在" : "无音频上下文"
      }`
    );

    // 对于正在播放的音频，直接停止
    try {
      if (ac) {
        // 在微信小程序中，直接调用stop方法停止播放
        if (typeof ac.stop === "function") {
          console.log(`停止音频上下文: ${noise.name}`);
          ac.stop();
        }

        // 延迟处理状态更新和资源清理
        setTimeout(() => {
          try {
            // 重置状态
            noise.isPlaying = false;
            
            // 安全销毁音频上下文
            safeDestroyAudioContext(noise);

            console.log(`已停止并重置 ${noise.name} 的状态`);

            // 检查是否还有其他音频在播放，如果没有则关闭屏幕常亮
            checkAndSetKeepScreenOn();
          } catch (e) {
            console.error(`延迟处理失败: ${noise.name}`, e);
            // 即使处理失败，也重置状态
            noise.isPlaying = false;
            // 安全销毁音频上下文
            safeDestroyAudioContext(noise);
            // 检查是否还有其他音频在播放，如果没有则关闭屏幕常亮
            checkAndSetKeepScreenOn();
          }
        }, 200);
      } else {
        // 如果没有音频上下文，直接重置状态
        noise.isPlaying = false;
        // 检查是否还有其他音频在播放，如果没有则关闭屏幕常亮
        checkAndSetKeepScreenOn();
      }
    } catch (error) {
      console.error(`停止音频失败: ${noise.name}`, error);
      // 即使停止失败，也重置状态
      noise.isPlaying = false;
      // 安全销毁音频上下文
      safeDestroyAudioContext(noise);
      // 检查是否还有其他音频在播放，如果没有则关闭屏幕常亮
      checkAndSetKeepScreenOn();
    }
  } else {
    // 如果没有音频上下文，创建一个新的
    if (!ac) {
      console.log(`创建新的音频上下文: ${noise.name}`);
      ac = uni.createInnerAudioContext();
      ac.src = noise.url;
      ac.volume = noise.volume;
      ac.loop = true; // 循环播放

      // 监听音频可以播放事件
      ac.onCanplay(() => {
        console.log(`音频 ${noise.name} 可以播放`);
      });

      // 监听音频播放事件
      ac.onPlay(() => {
        console.log(`开始播放 ${noise.name}`);
        noise.isPlaying = true;
        // 开始播放时，开启屏幕常亮
        setKeepScreenOn(true);
      });

      // 监听音频暂停事件
      ac.onPause(() => {
        console.log(`暂停播放 ${noise.name}`);
        noise.isPlaying = false;
        // 检查是否还有其他音频在播放，如果没有则关闭屏幕常亮
        checkAndSetKeepScreenOn();
      });

      // 监听音频停止事件
      ac.onStop(() => {
        console.log(`停止播放 ${noise.name}`);
        noise.isPlaying = false;
        // 检查是否还有其他音频在播放，如果没有则关闭屏幕常亮
        checkAndSetKeepScreenOn();
      });

      // 监听音频错误事件
      ac.onError((err: any) => {
        console.error(`音频播放错误: ${noise.name}`, err);
        noise.isPlaying = false;
        uni.showToast({
          title: `${noise.name}播放失败`,
          icon: "none",
        });
        // 检查是否还有其他音频在播放，如果没有则关闭屏幕常亮
        checkAndSetKeepScreenOn();
      });

      // 将创建的音频上下文保存到 noise 对象
      noise.audioContext = ac;
    }

    // 重新设置音量，确保音量设置生效
    ac.volume = noise.volume;

    // 检查音频是否已经在播放，避免重复播放
    try {
      // 在微信小程序中，没有直接的方法检查音频是否在播放
      // 所以我们依赖于noise.isPlaying状态
      if (!noise.isPlaying) {
        console.log(`尝试播放 ${noise.name}，音量: ${noise.volume}`);
        ac.play();
      } else {
        console.log(`${noise.name} 已经在播放，跳过播放操作`);
      }
    } catch (error) {
      console.error(`播放失败: ${noise.name}`, error);
      // 播放失败时，重置状态
      noise.isPlaying = false;
    }
  }
};

// 安全销毁音频上下文
const safeDestroyAudioContext = (noise: WhiteNoise) => {
  // 使用局部变量保存音频上下文引用
  // const audioCtx = noise.audioContext;
  
  // 先将noise.audioContext设置为null，防止后续引用
  noise.audioContext = null;
  
  // 然后尝试销毁音频上下文
  // if (audioCtx && typeof audioCtx.destroy === "function") {
  //   try {
  //     audioCtx.destroy();
  //   } catch (error) {
  //     console.error(`销毁音频上下文失败: ${noise.name}`, error);
  //   }
  // }
};

// 更新音量
const updateVolume = (event: any, noise: WhiteNoise) => {
  const volume = event.detail.value / 100;
  noise.volume = volume;

  console.log(`更新 ${noise.name} 音量: ${volume}`);

  if (noise.audioContext) {
    noise.audioContext.volume = volume;
    // 在Android微信小程序中，如果正在播放，不要暂停再播放，直接更新音量
    // 这可以避免与暂停逻辑冲突
    if (noise.isPlaying) {
      console.log(`直接更新音量，不中断播放: ${noise.name}`);
    }
  }
};

// 显示定时器弹窗
const showTimerModal = () => {
  showTimer.value = true;
};

// 关闭定时器弹窗
const closeTimerModal = () => {
  showTimer.value = false;
};

// 设置定时器
const setTimer = (value: number) => {
  console.log(`设置定时器: ${value}ms`);

  // 清除之前的定时器
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }

  selectedTimer.value = value;
  timerStartTime.value = Date.now();
  currentTime.value = Date.now(); // 初始化当前时间

  // 如果设置了定时时间，启动定时器
  if (value > 0) {
    // 使用一个每秒更新的定时器，用于更新显示和倒计时
    timerInterval.value = setInterval(() => {
      // 更新当前时间，触发计算属性重新计算
      currentTime.value = Date.now();

      // 检查是否到达定时时间
      const elapsed = currentTime.value - timerStartTime.value;
      if (elapsed >= value) {
        console.log(`定时器时间到，停止所有声音`);
        stopAllSounds();
        selectedTimer.value = 0;
        if (timerInterval.value) {
          clearInterval(timerInterval.value);
          timerInterval.value = null;
        }
      }
    }, 1000); // 每秒更新一次，确保倒计时显示正确
  }

  closeTimerModal();
};

// 取消定时器
const cancelTimer = () => {
  console.log("取消定时器");

  // 清除定时器
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }

  // 重置定时器状态
  selectedTimer.value = 0;
  timerStartTime.value = 0;

  closeTimerModal();

  uni.showToast({
    title: "已取消定时",
    icon: "success",
    duration: 1500,
  });
};

// 停止所有声音
const stopAllSounds = () => {
  console.log("停止所有声音");
  whiteNoiseList.value.forEach((noise) => {
    if (noise.audioContext) {
      try {
        console.log(`停止 ${noise.name}`);
        // 先尝试暂停
        if (typeof noise.audioContext.pause === "function") {
          noise.audioContext.pause();
        }

        // 延迟处理状态更新和资源清理
        setTimeout(() => {
          try {
            // 在微信小程序中，不检查paused属性，直接尝试停止
            if (
              noise.audioContext &&
              typeof noise.audioContext.stop === "function"
            ) {
              console.log(`尝试停止音频上下文: ${noise.name}`);
              noise.audioContext.stop();
            }

            // 重置状态
            noise.isPlaying = false;

            // 安全销毁音频上下文
            safeDestroyAudioContext(noise);
          } catch (error) {
            console.error(`延迟处理失败: ${noise.name}`, error);
            // 即使处理失败，也重置状态
            noise.isPlaying = false;
            // 安全销毁音频上下文
            safeDestroyAudioContext(noise);
          }
        }, 200); // 减少延迟时间
      } catch (error) {
        console.error(`停止 ${noise.name} 失败:`, error);
        // 即使停止失败，也重置状态
        noise.isPlaying = false;
        // 安全销毁音频上下文
        safeDestroyAudioContext(noise);
      }
    }
  });

  // 停止所有声音后，关闭屏幕常亮
  setKeepScreenOn(false);
};

// 组件卸载时清理资源
onUnmounted(() => {
  // 清理所有音频上下文
  whiteNoiseList.value.forEach((noise) => {
    if (noise.audioContext) {
      try {
        if (typeof noise.audioContext.stop === "function") {
          noise.audioContext.stop();
        }
      } catch (error) {
        console.error(`停止音频失败: ${noise.name}`, error);
      }
      
      // 安全销毁音频上下文
      safeDestroyAudioContext(noise);
    }
  });

  // 清理定时器
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
  // 组件卸载时，关闭屏幕常亮
  setKeepScreenOn(false);
});
</script>

<style lang="scss" scoped>
.white-noise-container {
  padding: 40rpx;
  min-height: 100vh;
  transition: background 1s ease;

  // 毛玻璃效果和卡片样式
  .glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 24rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8rpx 32rpx rgba(31, 38, 135, 0.2);
  }
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
  padding: 20rpx;

  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: white;
    margin-bottom: 10rpx;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
  }

  .text-sm {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
  }
}

.noise-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  margin-bottom: 40rpx;

  .noise-item {
    padding: 30rpx 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    height: 240rpx; /* 固定高度确保一致性 */

    &:active {
      transform: scale(0.95);
    }

    // 播放状态的卡片效果
    &.is-playing {
      background: rgba(255, 255, 255, 0.25);
      border: 1rpx solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 8rpx 32rpx rgba(155, 89, 182, 0.3);

      &::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
        transform: rotate(45deg);
        animation: shine 3s infinite;
      }
    }

    .noise-icon {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 15rpx;
      filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.1));

      image {
        width: 100%;
        height: 100%;
      }
    }

    .noise-name {
      font-size: 28rpx;
      color: white;
      margin-bottom: 15rpx;
      text-align: center;
      font-weight: 500;
      text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
      max-height: 80rpx; /* 限制最大高度，约等于两行文本 */
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 最多显示2行 */
      -webkit-box-orient: vertical;
      width: 100%;
      flex-shrink: 0; /* 防止被压缩 */
    }

    .play-icon {
      width: 50rpx;
      height: 50rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #9b59b6, #8e44ad);
      border-radius: 50%;
      box-shadow: 0 4rpx 8rpx rgba(155, 89, 182, 0.4);
      margin-top: auto; /* 推到底部 */
      flex-shrink: 0; /* 防止被压缩 */

      .icon-play,
      .icon-pause {
        color: white;
        font-size: 24rpx;
      }
    }
  }
}

.volume-controls {
  padding: 30rpx;
  margin-bottom: 30rpx;

  .volume-item {
    margin-bottom: 30rpx;

    &:last-child {
      margin-bottom: 0;
    }

    .volume-label {
      display: block;
      font-size: 28rpx;
      color: white;
      margin-bottom: 15rpx;
      font-weight: 500;
      text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
    }
  }
}

.time-controls {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .timer-container {
    width: 100%;
    padding: 20rpx;
    background: linear-gradient(135deg, #9b59b6, #8e44ad);
    border-radius: 30rpx;
    text-align: center;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 15rpx rgba(155, 89, 182, 0.4);

    .timer-text {
      color: white;
      font-size: 32rpx;
      font-weight: 500;
    }
  }

  .timer-count {
    padding: 10rpx 20rpx;
    text-align: center;
    color: white;
    font-size: 28rpx;
    text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);

    text {
      font-weight: 500;
      margin-left: 10rpx;
    }
  }
}

.timer-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 40rpx 30rpx;
    animation: slideUp 0.3s ease-out;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 30rpx 30rpx 0 0;
    border-top: 1rpx solid rgba(255, 255, 255, 0.3);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;

    .modal-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }

    .modal-close {
      font-size: 40rpx;
      color: #999;
      width: 60rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .timer-options {
    .timer-option {
      padding: 30rpx 0;
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

      &:last-child {
        border-bottom: none;
      }

      text {
        font-size: 32rpx;
        color: #333;
        display: block;
        text-align: center;

        &.active {
          color: #9b59b6;
          font-weight: bold;
        }
      }

      // 取消定时选项的特殊样式
      &.cancel-option {
        border-top: 1rpx solid rgba(0, 0, 0, 0.1);
        margin-top: 20rpx;

        text {
          color: #e74c3c;
          font-weight: bold;
        }

        &:active {
          background-color: rgba(231, 76, 60, 0.1);
        }
      }
    }
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}
</style>