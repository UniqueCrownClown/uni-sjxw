<template>
  <view class="container">
    <view class="u-m-l-20 u-m-t-50">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleBack"
      ></u-icon>
    </view>

    <!-- 测试引导页 -->
    <view class="intro-container" v-if="showIntro">
      <view class="intro-header">
        <view class="intro-title">{{ headline }}</view>
      </view>

      <view class="intro-content">
        <!-- <view class="intro-text">{{ desc1 }}</view> -->
        <view class="intro-text">{{ desc2 }}</view>
        <view class="intro-text">{{ desc3 }}</view>
      </view>

      <view class="intro-actions">
        <button @click="startTest" class="btn start-btn">开始测试</button>
      </view>

      <view class="intro-characters">
        <view class="characters-preview-title">角色预览</view>
        <view class="characters-preview-tags">
          <view
            v-for="character in allCharacters"
            :key="character.name"
            class="character-preview-tag"
          >
            {{ character.name }}
          </view>
        </view>
      </view>
    </view>

    <!-- 测试进度 -->
    <view class="progress-container" v-if="!showResult && !showIntro">
      <view class="progress-bar">
        <view class="progress-fill" :style="{ width: progressWidth }"></view>
      </view>
      <view class="progress-text"
        >{{ currentQuestionIndex + 1 }}/{{ questions.length }}</view
      >
    </view>

    <!-- 测试内容 -->
    <view
      class="test-content"
      v-if="currentQuestion && !showResult && !showIntro"
    >
      <view class="test-question">
        <view class="question-number">Q{{ currentQuestionIndex + 1 }}</view>
        <view class="question-text">{{ currentQuestion.question }}</view>
      </view>

      <view class="options-container">
        <view
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          class="option-item"
          :class="{ selected: selectedOption === index }"
          @click="selectOption(index, option, currentQuestion.qid)"
        >
          <view class="option-text">{{ option.text }}</view>
        </view>
      </view>

      <view class="navigation-buttons">
        <button
          v-if="currentQuestionIndex > 0"
          @click="prevQuestion"
          class="btn prev-btn"
        >
          上一题
        </button>
        <button v-else class="btn prev-btn disabled" disabled>上一题</button>
      </view>
      <view class="navigation-buttons">
        <!-- 新增：随机查看结果按钮 -->
        <button @click="randomResult" class="btn random-btn">
          随机查看结果
        </button></view
      >
    </view>

    <!-- 测试结果 -->
    <view class="result-container" v-if="showResult">
      <!-- 结果头部 -->
      <view class="result-header">
        <view class="result-title">你是《海贼王》里的</view>
        <view class="character-name">{{ matchedCharacter?.name }}</view>

        <!-- 角色图片展示 -->
        <view class="character-image-container">
          <image
            v-if="matchedCharacter?.imageUrl"
            :src="matchedCharacter.imageUrl"
            class="character-image"
            mode="widthFix"
            @error="handleImageError"
          ></image>
          <view v-else class="character-image-placeholder">
            <text>图片加载中...</text>
          </view>
        </view>
      </view>

      <!-- 角色信息卡片 -->
      <view class="character-info">
        <view class="character-details">
          <view class="detail-item">
            <text class="detail-label">昵称：</text>
            <text class="detail-value">{{ matchedCharacter?.nickname }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">称号：</text>
            <text class="detail-value">{{ matchedCharacter?.title }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">生日：</text>
            <text class="detail-value">{{ matchedCharacter?.birthday }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">星座：</text>
            <text class="detail-value">{{
              matchedCharacter?.constellation
            }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">血型：</text>
            <text class="detail-value">{{ matchedCharacter?.bloodType }}</text>
          </view>
          <view v-if="matchedCharacter?.devilFruit" class="detail-item">
            <text class="detail-label">恶魔果实：</text>
            <text class="detail-value">{{ matchedCharacter?.devilFruit }}</text>
          </view>
        </view>
      </view>

      <!-- 角色介绍 -->
      <view class="character-intro">
        <view class="intro-title">角色介绍</view>
        <view class="intro-text">{{ matchedCharacter?.introduction }}</view>
      </view>

      <!-- 性格匹配度 -->
      <view class="matching-description">
        <view class="description-title">性格匹配度</view>
        <view class="description-text">{{
          matchedCharacter?.personalityMatch || "无"
        }}</view>
      </view>

      <!-- 操作按钮 -->
      <view class="result-actions">
        <button @click="restartTest" size="default" class="btn restart-btn">
          重新测试
        </button>
        <button
          open-type="share"
          @click="shareResult"
          size="default"
          class="btn share-btn"
        >
          分享结果
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import {
  questions,
  matchCharacter,
  characters,
  headline,
  desc1,
  desc2,
  desc3,
} from "@/utils/onepiece";

// 状态管理
const currentQuestionIndex = ref(0);
const selectedOption = ref<number | null>(null);
const selectedContent = ref<{ qid: string; selectedValue: number } | null>(
  null
);
const userAnswers = ref<Array<{ qid: string; selectedValue: number }>>([]);
const showResult = ref(false);
const showIntro = ref(true); // 新增：控制引导页显示
const matchedCharacter = ref<any>(null);
const loadingResult = ref(false);

// 所有可能的角色数据
const allCharacters = ref<any[]>(
  characters.map((item) => ({ name: item.name }))
);

// 计算属性
const currentQuestion = computed(() => {
  return questions[currentQuestionIndex.value];
});

const progressWidth = computed(() => {
  return (
    ((currentQuestionIndex.value + (selectedOption.value !== null ? 1 : 0)) /
      questions.length) *
      100 +
    "%"
  );
});

// 生命周期
onLoad(() => {
  // 重置测试状态
  resetTest();
});

// 方法
const startTest = () => {
  showIntro.value = false;
};

const selectOption = (index: number, option: any, qid: string) => {
  selectedOption.value = index;
  selectedContent.value = {
    qid,
    selectedValue: option.value,
  };

  // 选择选项后自动进入下一题
  nextQuestion();
};

const nextQuestion = () => {
  if (selectedOption.value === null) return;

  // 保存当前答案
  if (selectedContent.value) {
    userAnswers.value[currentQuestionIndex.value] = selectedContent.value;
  }

  if (currentQuestionIndex.value < questions.length - 1) {
    // 进入下一题
    currentQuestionIndex.value++;
    // 检查是否已有该题的答案
    selectedContent.value =
      userAnswers.value[currentQuestionIndex.value] ?? null;
    if (selectedContent.value === null) {
      selectedOption.value = null;
    }
  } else {
    // 完成测试，计算结果
    showResult.value = true;
    calculateResult();
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedContent.value =
      userAnswers.value[currentQuestionIndex.value] ?? null;
    if (selectedContent.value === null) {
      selectedOption.value = null;
    }
  }
};

const calculateResult = () => {
  loadingResult.value = true;

  // 模拟加载延迟
  setTimeout(() => {
    // 使用 onePiece.ts 中的匹配函数计算结果
    const character = matchCharacter(userAnswers.value);
    matchedCharacter.value = character;
    loadingResult.value = false;
  }, 1000);
};

const restartTest = () => {
  resetTest();
  showResult.value = false;
  showIntro.value = true; // 重新测试时返回引导页
};

const resetTest = () => {
  currentQuestionIndex.value = 0;
  selectedOption.value = null;
  userAnswers.value = [];
  matchedCharacter.value = null;
  showIntro.value = true; // 重置测试时显示引导页
};

const handleBack = () => {
  if (showResult.value) {
    showResult.value = false;
    showIntro.value = true; // 从结果页返回时显示引导页
  } else if (!showIntro.value) {
    // 在测试过程中返回时显示引导页
    showIntro.value = true;
  } else {
    // 在引导页状态下返回到测试工具页
    uni.navigateTo({
      url: "/pages/startlife/test/testTools",
    });
  }
};

const shareResult = () => {
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};

// 新增：图片加载失败处理函数
const handleImageError = () => {
  console.log("角色图片加载失败");
};

// 新增：随机查看结果方法
const randomResult = () => {
  // 随机生成用户答案
  const randomAnswers = questions.map((question) => ({
    qid: question.qid,
    selectedValue:
      question.options[Math.floor(Math.random() * question.options.length)]
        .value,
  }));

  // 设置用户答案
  userAnswers.value = randomAnswers;

  // 直接显示结果
  showResult.value = true;
  calculateResult();
};
onShareAppMessage(() => {
  return {
    title: "测测你是《海贼王》里的哪个角色~~",
    path: "/pages/startlife/test/onepiece",
  };
});
</script>

<style lang="scss" scoped>
// 引导页样式
.intro-container {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 15px;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease-out;
}

.intro-header {
  text-align: center;
  margin-bottom: 24px;
}

.intro-title {
  font-size: 22px;
  font-weight: bold;
  color: #ff8c00;
  text-shadow: 0 2px 4px rgba(255, 140, 0, 0.2);
  letter-spacing: 1px;
  line-height: 1.4;
}

.intro-content {
  margin-bottom: 24px;
}

.intro-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.8;
  text-align: justify;
  margin-bottom: 16px;
}

.intro-characters {
  margin-bottom: 30px;
}

.characters-preview-title {
  font-size: 16px;
  font-weight: 600;
  color: #ff8c00;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(255, 140, 0, 0.3);
}

.characters-preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.character-preview-tag {
  padding: 4px 8px;
  background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.character-preview-tag::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: all 0.6s ease;
}

.character-preview-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.4);
}

.character-preview-tag:hover::before {
  left: 100%;
}

.intro-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.start-btn {
  width: 80%;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);
}

.start-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.6s ease;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4);
}

.start-btn:hover::before {
  left: 100%;
}

.start-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(255, 140, 0, 0.3);
}

.container {
  min-height: 100vh;
  background-image: url("https://crownclown.xyz/onepiece/onepiece_bg.webp");
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.progress-container {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 15px;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.progress-bar {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff8c00 0%, #ff4500 100%);
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progress-text {
  text-align: right;
  font-size: 12px;
  color: #666666;
}

.test-content {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 15px 15px 15px;
  min-height: 50vh;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.test-question {
  margin-bottom: 20px;
}

.question-number {
  display: inline-block;
  background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
  margin-bottom: 12px;
}

.question-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
}

.options-container {
  margin-bottom: 25px;
}

.option-item {
  padding: 12px;
  border: 2px solid rgba(224, 224, 224, 0.8);
  border-radius: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
}

.option-item:hover {
  border-color: #ff8c00;
}

.option-item.selected {
  border-color: #ff8c00;
  background-color: rgba(255, 248, 225, 0.9);
}

.option-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.prev-btn,
.next-btn {
  flex: 1;
  border-radius: 10px;
  height: 40px;
  font-size: 14px;
  border: none;
  background-color: #f0f0f0;
  color: #333333;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn:active:not(.disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 主要按钮样式 */
.btn.primary {
  background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
  color: #ffffff;
}

.btn.primary:hover:not(.disabled) {
  opacity: 0.9;
}

/* 禁用状态 */
.btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* 导航按钮样式微调 */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

/* 结果页按钮样式 */
.result-actions {
  display: flex;
  gap: 16px;
}

.result-actions .btn {
  flex: 1;
  border-radius: 10px;
  height: 40px;
  font-size: 14px;
}

/* 移除原生按钮样式 */
.btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.btn::-moz-focus-inner {
  border: 0;
}

.result-header {
  text-align: center;
  margin-bottom: 20px;
}

.result-title {
  font-size: 16px;
  color: #666666;
  margin-bottom: 12px;
}

.character-name {
  font-size: 24px;
  font-weight: bold;
  color: #ff8c00;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

/* 新增：角色图片样式 */
.character-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.character-image {
  border: 4px solid #ff8c00;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.character-image-placeholder {
  border: 4px solid #e0e0e0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 12px;
}

// 新增：随机查看结果按钮样式
.random-btn {
  width: 100%;
  margin-top: 12px;
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  transition: all 0.3s ease;
}

.random-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(106, 17, 203, 0.4);
}

.random-btn:active {
  transform: translateY(0);
}

// 结果容器样式优化
.result-container {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 15px;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 结果头部样式
.result-header {
  text-align: center;
  margin-bottom: 30px;
}

.result-title {
  font-size: 16px;
  color: #666666;
  margin-bottom: 12px;
  font-weight: 500;
}

.character-name {
  font-size: 26px;
  font-weight: bold;
  color: #ff8c00;
  text-shadow: 0 2px 4px rgba(255, 140, 0, 0.2);
  margin-bottom: 20px;
  letter-spacing: 1px;
}

// 角色图片样式优化
.character-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.character-image {
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.3);
  background-color: #f5f5f5;
  transition: transform 0.3s ease;
}

.character-image:hover {
  transform: scale(1.05);
}

.character-image-placeholder {
  width: 260px;
  height: 140px;
  border: 4px solid #e0e0e0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 12px;
}

// 角色信息样式优化
.character-info {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.character-details {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
}

.detail-label {
  font-weight: 600;
  color: #666666;
  margin-right: 8px;
  font-size: 13px;
}

.detail-value {
  color: #333333;
  font-size: 13px;
  flex: 1;
}

// 性格匹配度样式优化
.matching-description {
  background: linear-gradient(
    135deg,
    rgba(255, 140, 0, 0.1) 0%,
    rgba(255, 69, 0, 0.1) 100%
  );
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 20px;
  border-left: 4px solid #ff8c00;
}

.description-title {
  font-size: 16px;
  font-weight: 600;
  color: #ff8c00;
  margin-bottom: 12px;
}

.description-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.8;
  text-align: justify;
}

// 角色介绍样式优化
.character-intro {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.intro-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ff8c00;
  display: inline-block;
}

.intro-text {
  font-size: 14px;
  color: #555555;
  line-height: 1.8;
  text-align: justify;
  white-space: pre-wrap;
}

// 结果操作按钮样式优化
.result-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.restart-btn {
  flex: 1;
  border-radius: 12px;
  height: 45px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  background-color: #f0f0f0;
  color: #333333;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  background-color: #e6e6e6;
}

.restart-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.share-btn {
  flex: 1;
  border-radius: 12px;
  height: 45px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  position: relative;
  overflow: hidden;
}

.share-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.6s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4);
}

.share-btn:hover::before {
  left: 100%;
}

.share-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(255, 140, 0, 0.3);
}
</style>
