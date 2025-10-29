<template>
  <view class="zhanbu">
    <view class="u-m-l-20 u-m-t-50 u-text-left" style="width: 100%">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>

    <view class="container">
      <!-- 星座选择区域 -->
      <view class="section">
        <view class="section-title">选择你的星座</view>
        <view class="grid-container">
          <view
            v-for="zodiac in zodiacConfigs"
            :key="zodiac.id"
            :class="[
              'grid-item',
              { selected: selectedZodiac?.id === zodiac.id },
            ]"
            @click="selectZodiac(zodiac)"
          >
            <view class="item-symbol">{{ zodiac.symbol }}</view>
            <view class="item-name">{{ zodiac.name }}</view>
          </view>
        </view>
      </view>

      <!-- 生肖选择区域 -->
      <view class="section">
        <view class="section-title">选择你的生肖</view>
        <view class="grid-container">
          <view
            v-for="animal in animalConfigs"
            :key="animal.id"
            :class="[
              'grid-item',
              { selected: selectedAnimal?.id === animal.id },
            ]"
            @click="selectAnimal(animal)"
          >
            <view class="item-symbol">{{ animal.symbol }}</view>
            <view class="item-name">{{ animal.name }}</view>
          </view>
        </view>
      </view>

      <!-- 开始占卜按钮 -->
      <view class="button-container">
        <view class="custom-button" @click="startDivination">
          <view class="button-text">今日运势占卜</view>
          <view class="button-icon">✨</view>
        </view>
      </view>
    </view>

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
        <view class="loading-text">{{ currentPhrase }}</view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { onShareAppMessage } from "@dcloudio/uni-app";
import { createAiClient } from "@/api/modules/ai";
import { getTextGenerationConfig } from "@/utils/apiConfig";
import { useZhanbuStore } from "@/store/modules/zhanbuStore";

// 占卜类型
export type FortuneType = "daily" | "mood" | "couple" | "number";

// 星座配置
export interface ZodiacConfig {
  id: string;
  name: string;
  symbol: string;
  element: string; // 火、土、风、水
  traits: string[];
  luckyColors: string[];
  dates: string;
}

// 生肖配置
export interface AnimalConfig {
  id: string;
  name: string;
  symbol: string;
  element: string; // 金、木、水、火、土
  traits: string[];
  luckyNumbers: number[];
  years: number[];
}

// 占卜请求参数
export interface DailyFortuneParams {
  zodiac: string; // 星座
  animal: string; // 生肖
  date: string;
}

// 占卜结果
export interface FortuneResult {
  id: string;
  type: FortuneType;
  date: string;
  luckyNumber: string; // 幸运数字
  luckyColor: string; // 幸运颜色
  conclusion: string; // 短评
  should: string; // 今日宜
  shouldNot: string; // 今日忌
  careerScore: number; // 事业运势分
  loveScore: number; // 爱情运势分
  healthScore: number; // 健康运势分
  wealthScore: number; // 财富运势分
  score: number; // 综合运势分
  description: string; // 综合运势描述
  careerDescription: string; // 事业运势描述
  loveDescription: string; // 爱情运势描述
  healthDescription: string; // 健康运势描述
  wealthDescription: string; // 财富运势描述
  loveLocation: string; // 桃花方位
  healthLocation: string; // 喜神方位
  wealthLocation: string; // 财神方位
}

const handleTomine = () => {
  uni.navigateTo({
    url: "/pages/startlife/mine/zhanbu",
  });
};

const zhanbuStore = useZhanbuStore();

// 选中的星座和生肖
const selectedZodiac = ref<ZodiacConfig | null>(null);
const selectedAnimal = ref<AnimalConfig | null>(null);

// loading状态和当前提示语
const isLoading = ref(false);
const currentPhrase = ref("");
let loadingInterval: NodeJS.Timeout | null = null;

// 选择星座
const selectZodiac = (zodiac: ZodiacConfig) => {
  selectedZodiac.value = zodiac;
};

// 选择生肖
const selectAnimal = (animal: AnimalConfig) => {
  selectedAnimal.value = animal;
};

// 计算组合性格特点
const combinedTraits = computed(() => {
  if (!selectedZodiac.value || !selectedAnimal.value) return "";

  // 从星座和生肖的特质中各随机选择一个
  const zodiacTrait =
    selectedZodiac.value.traits[
      Math.floor(Math.random() * selectedZodiac.value.traits.length)
    ];
  const animalTrait =
    selectedAnimal.value.traits[
      Math.floor(Math.random() * selectedAnimal.value.traits.length)
    ];

  return `${zodiacTrait}、${animalTrait}`;
});

const generateDailyFortune = async (
  params: DailyFortuneParams
): Promise<FortuneResult> => {
  try {
    const prompt = `你是一位深耕东西方命理交汇领域的资深占卜师，兼具东方生肖命理的深邃积淀与西方星座占星的精准洞察，更通晓五行生克、天干地支与黄道十二宫的呼应关系。请根据以下信息为用户推算运势：
  
  星座：${params.zodiac}
  生肖：${params.animal}
  日期：${params.date}
  
  请基于用户提供的星座、生肖及当前日期，构建多维度运势分析框架，实现东西方命理逻辑的自然融合。解读需紧扣 “星座 + 生肖 + 当前日期” 的核心要素，避免生硬拼接，确保解读逻辑自洽。
  
  请按照以下JSON格式返回占卜结果：
  {
    "luckyNumber": "根据推算得到的幸运数",
    "luckyColor": "根据推算得到的幸运颜色",
    "conclusion":"根据推算得到简短的运势小结",
    "should":"根据用户的幸运指数，推荐今天适宜做的事情",
    "shouldNot":"根据用户的幸运指数，推荐今天不适宜做的事情",
    "careerScore":"根据用户的幸运指数，1-5之间推荐一个用户可能的事业运势分数",
    "loveScore":"根据用户的幸运指数，1-5之间推荐一个用户可能的爱情运势分数",
    "healthScore":"根据用户的幸运指数，1-5之间推荐一个用户可能的健康运势分数",
    "wealthScore":"根据用户的幸运指数，1-5之间推荐一个用户可能的财富运势分数",
    "score":"根据用户的综合幸运指数，1-5之间推荐一个用户可能的综合运势分数",
    "description":"根据推算得到的综合运势分析",
    "careerDescription": "根据推算得到的事业运势分析",
    "loveDescription": "根据推算得到的爱情运势分析",
    "healthDescription": "根据推算得到的健康运势分析",
    "wealthDescription": "根据推算得到的财富运势分析",
    "loveLocation": "根据用户的幸运指数，推荐一个用户可能的爱情方向",
    "healthLocation": "根据用户的幸运指数，推荐一个用户可能的健康方向",
    "wealthLocation": "根据用户的幸运指数，推荐一个用户可能的财富方向"
  }`;

    const aiClient = createAiClient();
    const apiConfig = getTextGenerationConfig();

    const response = await aiClient.post("/chat/completions", {
      model: apiConfig.model,
      messages: [
        {
          role: "system",
          content:
            "你是一位深耕东西方命理交汇领域的资深占卜师，精通星座学、生肖学。你的话语充满神秘色彩，解读富有权威和感染力。请严格按照JSON格式返回，不要包含任何其他文字。请务必用中文回答。",
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

    const fortuneData = JSON.parse(cleanResponse);

    const fortune: FortuneResult = {
      id: `daily-fortune-${Date.now()}`,
      type: "daily",
      date: params.date,
      luckyNumber: fortuneData.luckyNumber,
      luckyColor: fortuneData.luckyColor,
      conclusion: fortuneData.conclusion,
      should: fortuneData.should,
      shouldNot: fortuneData.shouldNot,
      careerScore: fortuneData.careerScore,
      loveScore: fortuneData.loveScore,
      healthScore: fortuneData.healthScore,
      wealthScore: fortuneData.wealthScore,
      score: fortuneData.score,
      description: fortuneData.description,
      careerDescription: fortuneData.careerDescription,
      loveDescription: fortuneData.loveDescription,
      healthDescription: fortuneData.healthDescription,
      wealthDescription: fortuneData.wealthDescription,
      loveLocation: fortuneData.loveLocation,
      healthLocation: fortuneData.healthLocation,
      wealthLocation: fortuneData.wealthLocation,
    };

    return fortune;
  } catch (error) {
    console.error(error);
    throw new Error("占卜师暂时无法感应到星象，请稍后重试");
  }
};
const phrases = [
  "让我感应今日的星象能量...",
  "星座与生肖的力量正在汇聚...",
  "今日宇宙能量将指引走向...",
  "正在解读星座的秘密...",
  "生肖的智慧正在显现...",
  "宇宙的能量正在汇聚...",
  "命运之轮正在转动...",
  "星辰指引着方向...",
  "水晶球正在感知...",
];
// 开始占卜
const startDivination = () => {
  // 检查是否选择了星座和生肖
  if (!selectedZodiac.value || !selectedAnimal.value) {
    // 根据未选择的项目显示不同的提示信息
    let message = "请选择";
    if (!selectedZodiac.value && !selectedAnimal.value) {
      message = "请选择星座和生肖";
    } else if (!selectedZodiac.value) {
      message = "请选择星座";
    } else if (!selectedAnimal.value) {
      message = "请选择生肖";
    }

    // 显示提示弹窗
    uni.showToast({
      title: message,
      icon: "none",
      duration: 2000,
    });
    return;
  }

  // 随机选择一个提示语
  const randomIndex = Math.floor(Math.random() * phrases.length);
  currentPhrase.value = phrases[randomIndex];

  // 显示自定义loading
  isLoading.value = true;

  // 每3秒更换一次提示语
  let phraseIndex = randomIndex;
  loadingInterval = setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    currentPhrase.value = phrases[phraseIndex];
  }, 3000);

  generateDailyFortune({
    zodiac: selectedZodiac.value.name,
    animal: selectedAnimal.value.name,
    date: new Date().toLocaleDateString(),
  })
    .then((result: FortuneResult) => {
      console.log(result);
      // 保存AI返回的占卜结果
      // 保存到Pinia状态管理
      zhanbuStore.setFortuneResult({
        ...result,
        selectedZodiac: selectedZodiac.value,
        selectedAnimal: selectedAnimal.value,
      });

      // 跳转到占卜结果页面
      navigateToResultPage();
    })
    .catch((error) => {
      console.error("占卜失败:", error);
      uni.showToast({
        title: "占卜失败，请重试",
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

// 跳转到占卜结果页面
const navigateToResultPage = () => {
  // 跳转到结果页面
  uni.navigateTo({
    url: `/pages/startlife/mine/animalSignResult`,
  });
};

// 十二星座配置
const zodiacConfigs: ZodiacConfig[] = [
  {
    id: "aries",
    name: "白羊座",
    symbol: "♈",
    element: "火",
    traits: ["热情", "冲动", "勇敢", "直率"],
    luckyColors: ["红色", "橙色"],
    dates: "3.21-4.19",
  },
  {
    id: "taurus",
    name: "金牛座",
    symbol: "♉",
    element: "土",
    traits: ["稳重", "固执", "实际", "美食家"],
    luckyColors: ["绿色", "粉色"],
    dates: "4.20-5.20",
  },
  {
    id: "gemini",
    name: "双子座",
    symbol: "♊",
    element: "风",
    traits: ["机智", "多变", "好奇", "善交际"],
    luckyColors: ["黄色", "银色"],
    dates: "5.21-6.21",
  },
  {
    id: "cancer",
    name: "巨蟹座",
    symbol: "♋",
    element: "水",
    traits: ["温柔", "顾家", "敏感", "直觉强"],
    luckyColors: ["白色", "银色"],
    dates: "6.22-7.22",
  },
  {
    id: "leo",
    name: "狮子座",
    symbol: "♌",
    element: "火",
    traits: ["自信", "慷慨", "领导力", "戏剧性"],
    luckyColors: ["金色", "橙色"],
    dates: "7.23-8.22",
  },
  {
    id: "virgo",
    name: "处女座",
    symbol: "♍",
    element: "土",
    traits: ["完美主义", "细心", "实用", "分析力强"],
    luckyColors: ["深蓝", "灰色"],
    dates: "8.23-9.22",
  },
  {
    id: "libra",
    name: "天秤座",
    symbol: "♎",
    element: "风",
    traits: ["和谐", "优雅", "犹豫", "社交"],
    luckyColors: ["粉色", "浅蓝"],
    dates: "9.23-10.23",
  },
  {
    id: "scorpio",
    name: "天蝎座",
    symbol: "♏",
    element: "水",
    traits: ["神秘", "专注", "激情", "直觉"],
    luckyColors: ["深红", "黑色"],
    dates: "10.24-11.22",
  },
  {
    id: "sagittarius",
    name: "射手座",
    symbol: "♐",
    element: "火",
    traits: ["自由", "乐观", "冒险", "哲学"],
    luckyColors: ["紫色", "深蓝"],
    dates: "11.23-12.21",
  },
  {
    id: "capricorn",
    name: "摩羯座",
    symbol: "♑",
    element: "土",
    traits: ["务实", "有野心", "保守", "负责"],
    luckyColors: ["黑色", "深绿"],
    dates: "12.22-1.19",
  },
  {
    id: "aquarius",
    name: "水瓶座",
    symbol: "♒",
    element: "风",
    traits: ["独立", "创新", "人道主义", "理想"],
    luckyColors: ["蓝色", "银色"],
    dates: "1.20-2.18",
  },
  {
    id: "pisces",
    name: "双鱼座",
    symbol: "♓",
    element: "水",
    traits: ["梦幻", "同情心", "艺术", "直觉"],
    luckyColors: ["海蓝", "紫色"],
    dates: "2.19-3.20",
  },
];

// 十二生肖配置
const animalConfigs: AnimalConfig[] = [
  {
    id: "rat",
    name: "鼠",
    symbol: "🐭",
    element: "水",
    traits: ["机智", "灵活", "适应力强", "节俭"],
    luckyNumbers: [2, 3],
    years: [2020, 2008, 1996, 1984, 1972, 1960],
  },
  {
    id: "ox",
    name: "牛",
    symbol: "🐮",
    element: "土",
    traits: ["勤劳", "稳重", "诚实", "固执"],
    luckyNumbers: [1, 9],
    years: [2021, 2009, 1997, 1985, 1973, 1961],
  },
  {
    id: "tiger",
    name: "虎",
    symbol: "🐯",
    element: "木",
    traits: ["勇敢", "自信", "竞争", "冲动"],
    luckyNumbers: [1, 3, 4],
    years: [2022, 2010, 1998, 1986, 1974, 1962],
  },
  {
    id: "rabbit",
    name: "兔",
    symbol: "🐰",
    element: "木",
    traits: ["温和", "谨慎", "优雅", "善良"],
    luckyNumbers: [3, 4, 6],
    years: [2023, 2011, 1999, 1987, 1975, 1963],
  },
  {
    id: "dragon",
    name: "龙",
    symbol: "🐲",
    element: "土",
    traits: ["威严", "热情", "创新", "领导"],
    luckyNumbers: [1, 6, 7],
    years: [2024, 2012, 2000, 1988, 1976, 1964],
  },
  {
    id: "snake",
    name: "蛇",
    symbol: "🐍",
    element: "火",
    traits: ["智慧", "神秘", "直觉", "优雅"],
    luckyNumbers: [2, 8, 9],
    years: [2025, 2013, 2001, 1989, 1977, 1965],
  },
  {
    id: "horse",
    name: "马",
    symbol: "🐴",
    element: "火",
    traits: ["自由", "热情", "独立", "冒险"],
    luckyNumbers: [2, 3, 7],
    years: [2026, 2014, 2002, 1990, 1978, 1966],
  },
  {
    id: "goat",
    name: "羊",
    symbol: "🐐",
    element: "土",
    traits: ["温柔", "艺术", "同情", "和平"],
    luckyNumbers: [3, 4, 5],
    years: [2027, 2015, 2003, 1991, 1979, 1967],
  },
  {
    id: "monkey",
    name: "猴",
    symbol: "🐵",
    element: "金",
    traits: ["聪明", "机智", "活泼", "好奇"],
    luckyNumbers: [1, 7, 8],
    years: [2028, 2016, 2004, 1992, 1980, 1968],
  },
  {
    id: "rooster",
    name: "鸡",
    symbol: "🐓",
    element: "金",
    traits: ["勤奋", "准时", "诚实", "自信"],
    luckyNumbers: [5, 7, 8],
    years: [2029, 2017, 2005, 1993, 1981, 1969],
  },
  {
    id: "dog",
    name: "狗",
    symbol: "🐕",
    element: "土",
    traits: ["忠诚", "诚实", "负责", "公正"],
    luckyNumbers: [3, 4, 9],
    years: [2030, 2018, 2006, 1994, 1982, 1970],
  },
  {
    id: "pig",
    name: "猪",
    symbol: "🐷",
    element: "水",
    traits: ["善良", "慷慨", "诚实", "乐观"],
    luckyNumbers: [2, 5, 8],
    years: [2031, 2019, 2007, 1995, 1983, 1971],
  },
];

// 分享功能
onShareAppMessage(() => {
  // 获取选中的星座和生肖名称
  const zodiacName = selectedZodiac.value
    ? selectedZodiac.value.name
    : "未知星座";
  const animalName = selectedAnimal.value
    ? selectedAnimal.value.name
    : "未知生肖";

  return {
    title: `来测一测你的${zodiacName}${animalName}今日运势`,
    path: "/pages/startlife/mine/zhanbu",
    imageUrl: "https://crownclown.xyz/zhanbu_share.png", // 分享图片
  };
});
</script>
<style lang="scss" scoped>
.zhanbu {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 1000px; /* 3D透视效果 */
  background-image: url("https://crownclown.xyz/zhanbu_bg.png");
  background-size: cover;
}

.container {
  width: 100%;
  max-width: 1200px;
  padding: 20rpx;
}

.section {
  margin-bottom: 40rpx;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  text-align: center;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

.grid-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5rpx);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  &.selected {
    border-color: #d9d919;
    background-color: rgba(217, 217, 25, 0.1);
    transform: translateY(-5rpx);
    box-shadow: 0 6px 16px rgba(217, 217, 25, 0.3);
  }
}

.item-symbol {
  font-size: 60rpx;
  margin-bottom: 10rpx;
}

.item-name {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.button-container {
  margin-top: 40rpx;
  width: 100%;
  display: flex;
  justify-content: center;
}

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
}

/* 自定义按钮样式 */
.custom-button {
  width: 80%;
  max-width: 600rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #d9d919 0%, #f0e68c 100%);
  border-radius: 50rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(217, 217, 25, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.custom-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.5s ease;
}

.custom-button:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(217, 217, 25, 0.4);
}

.custom-button:active::before {
  left: 100%;
}

.button-text {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-right: 20rpx;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

.button-icon {
  font-size: 40rpx;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
