<template>
  <view class="container">
    <!-- 自定义loading组件 -->
    <view v-if="isLoading" class="custom-loading">
      <view class="loading-mask"></view>
      <view class="loading-content">
        <view class="loading-animation">
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
        </view>
        <view class="loading-text">
          <view
            v-for="(phrase, index) in currentPhrase.split('，')"
            :key="index"
            class="phrase-line"
          >
            {{ phrase }}
          </view>
        </view>
      </view>
    </view>

    <view class="header">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>

    <view class="scrollable-content">
      <view class="main-content">
        <view class="shell-container" @click="handleShake">
          <u-image
            src="https://crownclown.xyz/liuyao/guixiao.gif"
            width="300"
            height="300"
            mode="aspectFit"
            class="shell-image"
          ></u-image>
        </view>

        <view class="input-container">
          <u-input
            v-model="question"
            placeholder="输入你心中的疑问"
            :clearable="true"
            :border="true"
            class="question-input"
            input-align="center"
          ></u-input>
        </view>

        <view class="tip-text">
          <text v-if="count === 1">输入你的疑问后，</text>
          <text v-if="count <= 6"
            >点击龟壳开始第{{ count }}次摇卦，还剩{{ 7 - count }}次</text
          >
        </view>

        <view class="result-container">
          <view
            v-for="(item, index) in resultArr"
            :key="index"
            class="result-item"
          >
            <u-image
              :src="
                item === '阳'
                  ? 'https://crownclown.xyz/liuyao/1.png'
                  : 'https://crownclown.xyz/liuyao/0.png'
              "
              width="80"
              height="80"
              mode="aspectFit"
            ></u-image>
          </view>
        </view>

        <view class="gua-container">
          <view v-for="(item, index) in result" :key="index" class="gua-item">
            <view class="gua-text">
              <text class="gua-name">{{ number_dict[index] }}: {{ item }}</text>
            </view>
            <view class="gua-image">
              <u-image
                :src="getGuaImage(item)"
                width="150"
                mode="widthFix"
              ></u-image>
            </view>
          </view>
        </view>
      </view>

      <view class="instruction-section">
        <u-section
          title="六爻占卜流程"
          line-color="#D9D919"
          :right="false"
        ></u-section>
        <view class="instruction-content">
          <view class="instruction-item">
            <u-icon
              name="checkmark-circle"
              color="#D9D919"
              size="26"
              style="margin-top: 10rpx"
            ></u-icon>
            <text class="instruction-text"
              >进行占卜之前，默念所测之事，点击龟壳开始摇卦占卜；</text
            >
          </view>
          <view class="instruction-item">
            <u-icon
              name="checkmark-circle"
              color="#D9D919"
              size="26"
              style="margin-top: 10rpx"
            ></u-icon>
            <text class="instruction-text"
              >使用的铜钱为乾隆通宝，写有汉字的一面为阳面，写有满文的一面的为阴面；</text
            >
          </view>
          <view class="instruction-item">
            <u-icon
              name="checkmark-circle"
              color="#D9D919"
              size="26"
              style="margin-top: 10rpx"
            ></u-icon>
            <text class="instruction-text"
              >每点击一次可求得一爻，反复六次成卦；成卦区按照从下往上，初爻到上爻的方式来生成卦。</text
            >
          </view>
        </view>
      </view>
      <view class="instruction-section">
        <u-section
          title="预测程序说明"
          line-color="#D9D919"
          :right="false"
          class="section-spacing"
        ></u-section>
        <view class="instruction-content">
          <view class="instruction-item">
            <u-icon
              name="checkmark-circle"
              color="#D9D919"
              size="26"
              style="margin-top: 10rpx"
            ></u-icon>
            <text class="instruction-text"
              >预测人将三枚铜钱放于手中，双手紧扣，默念所测之事；</text
            >
          </view>
          <view class="instruction-item">
            <u-icon
              name="checkmark-circle"
              color="#D9D919"
              size="26"
              style="margin-top: 10rpx"
            ></u-icon>
            <text class="instruction-text"
              >合掌摇晃后放入卦盘中，掷六次而成卦；</text
            >
          </view>
          <view class="instruction-item">
            <u-icon
              name="checkmark-circle"
              color="#D9D919"
              size="26"
              style="margin-top: 10rpx"
            ></u-icon>
            <text class="instruction-text"
              >配以卦爻，及动变以后。通过测卦当日的干支，配以六亲及六兽，主要依靠用神的五行生旺，结合易经的爻辞，而判断事物的发展过程和结果。</text
            >
          </view>
        </view>
      </view>
    </view>

    <!-- 固定在底部的按钮容器 -->
    <view class="fixed-bottom-container">
      <button
        v-if="count > 6"
        class="submit-btn"
        @click="handleSubmit"
      >
        起卦
      </button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onShareAppMessage, onShow } from "@dcloudio/uni-app";
import { createAiClient } from "@/api/modules/ai";
import { getTextGenerationConfig } from "@/utils/apiConfig";
import { LiuYaoResult, useZhanbuStore } from "@/store/modules/zhanbuStore";
// 返回按钮
const handleTomine = () => {
  uni.navigateTo({
    url: "/pages/startlife/zhanbu/zhanbu",
  });
};

const question = ref("");

const count = ref(1);

const number_dict = ref<Record<number, string>>({
  0: "初爻",
  1: "二爻",
  2: "三爻",
  3: "四爻",
  4: "五爻",
  5: "上爻",
});

const getGuaImage = (gua: string) => {
  const guaImageUrl: Record<string, string> = {
    少阳: "https://crownclown.xyz/liuyao/shaoyang.png",
    少阴: "https://crownclown.xyz/liuyao/shaoyin.png",
    老阳: "https://crownclown.xyz/liuyao/laoyang.png",
    老阴: "https://crownclown.xyz/liuyao/laoyin.png",
  };
  return guaImageUrl[gua];
};

const result = ref<string[]>([]);
const generateDailyFortune = async (params: any): Promise<LiuYaoResult> => {
  try {
    const prompt = `问题：${question.value}
  当前时间：${new Date().toLocaleString()}
  六爻结果：按 “初爻→二爻→三爻→四爻→五爻→六爻”的顺序，分别为${result.value.join(
    "，"
  )}
  请按照以下JSON格式返回占卜结果：
  {
    "time": "当前的起卦时间包含星期几和农历日期",
    "ganzhi": "根据推算得到的干支,无需包括‘年’，‘月’，‘日’，’时‘等时间单位",
    "gua_xiang":"根据起卦时间和每爻结果，得到的每爻的干支，六亲，六神，包含世爻、应爻的标注，严格遵循‘日干定六神’‘宫位定六亲’的规则,每爻之间内容用‘|’分割",
    "gua_degree":"基于起卦时间对应的六爻结果，得到的卦象等级：【XX】（XX替换为 “上上卦 / 上中卦 / 上下卦 / 中中卦 / 中下卦 / 下下卦”）",
    "gua_name":"基于起卦时间对应的六爻结果，判断出的卦名（本卦）",
    "gua_biaozhu":"基于起卦时间对应的六爻结果，得到的卦序标注：第 XX 卦：XX 卦（XXX）（替换为 “第 N 卦：简卦名（卦象全称）”，如 “第六十一卦：中孚卦（风泽中孚）”）",
    "gua_ci":"基于起卦时间对应的六爻结果，直接粘贴该卦对应的完整卦辞原文",
    "gua_xiang_ci":"基于起卦时间对应的六爻结果，直接粘贴该卦对应的完整象辞原文",
    "gua_explain": "单独标注 “白话文解释：” 板块，粘贴该卦卦辞 + 象辞对应的完整白话文翻译（需与原文含义一致，不增删语义）"
    "gua_detail": "基于起卦时间对应的六爻结果，判断出的卦名，对该卦进行详细解读",
    "gua_advice": "基于起卦时间对应的六爻结果，判断出的卦名及解读，结合询问的问题，给出具体的建议"
  }`;
    const aiClient = createAiClient();
    const apiConfig = getTextGenerationConfig();

    const response = await aiClient.post("/chat/completions", {
      model: apiConfig.model,
      messages: [
        {
          role: "system",
          content:
            "你是一位传承中华六爻术数世家的资深卜卦专家，深耕卦理数十年，精通《周易》象、数、理，擅长结合现实场景解析卦象玄机。你的核心任务的是：根据卜卦者明确提出的具体问题（如事业抉择、人际调和、学业规划等），以及其提供的完整卦象（含本卦、变卦、动爻信息），提供兼具卦理依据与实践价值的指导建议。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      stream: false,
    });
    const aiResponse = response.data.choices[0].message.content;
    let cleanResponse = aiResponse.trim();
    if (cleanResponse.startsWith("```json")) {
      cleanResponse = cleanResponse
        .replace(/```json\s*/, "")
        .replace(/```\s*$/, "");
    } else if (cleanResponse.startsWith("```")) {
      cleanResponse = cleanResponse
        .replace(/```\s*/, "")
        .replace(/```\s*$/, "");
    }

    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error(error);
    throw new Error("暂时无法感应到天意，请稍后重试");
  }
};
const resultArr = ref<string[]>([]);
const get_random_gua = () => {
  resultArr.value = new Array(3)
    .fill("")
    .map(() => (Math.random() > 0.5 ? "阳" : "阴"));
  // 统计每个元素出现的次数
  const countMap: Record<string, number> = {};
  resultArr.value.forEach((item) => {
    countMap[item] = (countMap[item] || 0) + 1;
  });

  // 找出出现两次的元素
  for (const [key, value] of Object.entries(countMap)) {
    if (value === 2) {
      return "少" + key; // 返回出现两次的元素
    }
    if (value === 3) {
      return "老" + key; // 返回出现三次的元素
    }
  }

  // 如果没有出现两次的元素，则返回数组中的第一个元素
  return resultArr.value[0];
};
const handleShake = () => {
  if (question.value === "") {
    uni.showToast({
      title: "请先输入你心中的疑问",
      icon: "none",
    });
    return;
  }
  if (count.value > 6) {
    uni.showToast({
      title: "请先完成六爻",
      icon: "none",
    });
    return;
  }
  result.value = [...result.value, get_random_gua()];
  count.value++;
};
const zhanbuStore = useZhanbuStore();

// loading状态和当前提示语
const isLoading = ref(false);
const currentPhrase = ref("");
let loadingInterval: NodeJS.Timeout | null = null;
const handleSubmit = () => {
  if (question.value === "") {
    uni.showToast({
      title: "请先输入你心中的疑问",
      icon: "none",
    });
    return;
  }

  // 从第一个提示语开始
  currentPhrase.value = phrases[0];
  let phraseIndex = 0;

  // 显示自定义loading
  isLoading.value = true;

  // 每4秒更换一次提示语，顺序循环
  loadingInterval = setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    currentPhrase.value = phrases[phraseIndex];
  }, 4000);

  generateDailyFortune({ date: new Date().toISOString().split("T")[0] })
    .then((res) => {
      zhanbuStore.setLiuyaoResult(res);
      // 跳转到占卜结果页面
      uni.navigateTo({
        url: "/pages/startlife/zhanbu/liuyaoResult",
      });
    })
    .catch((error) => {
      console.error("起卦失败:", error);
      uni.showToast({
        title: "起卦失败，请重试",
        icon: "none",
      });
    })
    .finally(() => {
      // 清除定时器
      if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
      }
      // 隐藏自定义loading
      isLoading.value = false;
    });
};
const phrases = [
  "三枚铜钱熏炉上，至诚祝告感穹苍",
  "焚香叩问无余事，掷币成爻定吉昌",
  "炉烟袅袅通神意，爻象沉沉映道章",
  "六爻排布乾坤理，一卦参详祸福机",
  "钱落阴阳分动静，爻成八卦显幽微",
  "掌中躔度含星象，卦里玄机透往今",
  "三掷初成内卦象，再祈外变释疑深",
  "心无妄念方求卦，意有精诚始应灵",
  "圣典昭昭凭卦断，神机默默顺天行",
  "爻辞暗合人间事，蓍法明通天地情",
  "竹桥边畔排爻象，案几之前问吉凶",
  "八卦图开凝静气，六爻演罢见分明",
];
onShow(() => {
  const liuyaoResult = zhanbuStore.getLiuyaoResult();
  if (!liuyaoResult) {
    // 清空结果
    count.value = 1;
    question.value = "我要怎么变好看";
    resultArr.value = [];
    result.value = [];
  }
});
onShareAppMessage(() => {
  return {
    title: "快来使用六爻解答你的疑问吧~~",
    path: "/pages/startlife/zhanbu/liuyao",
  };
});
</script>

<style lang="scss" scoped>
// 自定义loading样式
.custom-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.loading-content {
  position: relative;
  width: 300rpx;
  height: 300rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.loading-animation {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 30rpx;
}

.star {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20rpx;
  height: 20rpx;
  background-color: #d9d919;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  transform-origin: center;
  animation: twinkle 1.5s infinite ease-in-out;
}

.star:nth-child(1) {
  transform: translate(-50%, -50%) translateY(-40rpx) scale(1);
  animation-delay: 0s;
  --scale: 1;
  --rotation: 0deg;
}

.star:nth-child(2) {
  transform: translate(-50%, -50%) rotate(72deg) translateY(-40rpx) scale(0.8);
  animation-delay: 0.3s;
  --scale: 0.8;
  --rotation: 72deg;
}

.star:nth-child(3) {
  transform: translate(-50%, -50%) rotate(144deg) translateY(-40rpx) scale(0.6);
  animation-delay: 0.6s;
  --scale: 0.6;
  --rotation: 144deg;
}

.star:nth-child(4) {
  transform: translate(-50%, -50%) rotate(216deg) translateY(-40rpx) scale(0.8);
  animation-delay: 0.9s;
  --scale: 0.8;
  --rotation: 216deg;
}

.star:nth-child(5) {
  transform: translate(-50%, -50%) rotate(288deg) translateY(-40rpx) scale(1);
  animation-delay: 1.2s;
  --scale: 1;
  --rotation: 288deg;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg))
      translateY(-40rpx) scale(var(--scale, 1));
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg))
      translateY(-40rpx) scale(calc(var(--scale, 1) * 1.2));
  }
}

.loading-text {
  font-size: 28rpx;
  color: #333;
  text-align: center;
  max-width: 240rpx;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.phrase-line {
  width: 100%;
  text-align: center;
}

// 新增样式
.container {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  position: relative;
}

.header {
  display: flex;
  justify-content: flex-start;
  padding: 20rpx;
  margin-top: 50rpx;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 120rpx; /* 为底部固定按钮留出空间 */
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
}

.shell-container {
  margin: 20rpx 0;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}

.shell-image {
  border-radius: 10rpx;
}

.input-container {
  width: 80%;
  margin: 30rpx 0;
}

.question-input {
  background-color: #fff;
}

.tip-text {
  margin: 20rpx 0;
  font-size: 28rpx;
  color: #666;
  text-align: center;
}

.result-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
}

.result-item {
  margin: 10rpx;
  padding: 10rpx;
  border-radius: 10rpx;
  background-color: #f9f9f9;
}

.gua-container {
  width: 90%;
  margin: 30rpx 0;
}

.gua-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20rpx 0;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.gua-text {
  margin-bottom: 15rpx;
}

.gua-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.gua-image {
  margin-top: 10rpx;
}

.fixed-bottom-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(248, 248, 248, 0.95);
  backdrop-filter: blur(10px);
  padding: 20rpx;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-btn {
  width: 80%;
  height: 90rpx;
  line-height: 90rpx;
  background: linear-gradient(135deg, #D9D919, #F0F032);
  color: #333;
  font-size: 32rpx;
  font-weight: bold;
  border-radius: 45rpx;
  border: none;
  box-shadow: 0 6px 20px rgba(217, 217, 25, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 3px 10px rgba(217, 217, 25, 0.2);
  }
  
  &:hover {
    background: linear-gradient(135deg, #E0E02A, #F5F547);
  }
}

.instruction-section {
  margin-top: 40rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-spacing {
  margin-top: 40rpx;
}

.instruction-content {
  margin-top: 20rpx;
}

.instruction-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.instruction-text {
  margin-left: 15rpx;
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  flex: 1;
}
</style>