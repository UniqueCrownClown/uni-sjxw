<template>
  <view class="naruto-test">
    <view class="u-m-l-20 u-m-t-50">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleBack"
      ></u-icon>
    </view>
    <!-- 引导页 -->
    <view v-if="currentPage === 'intro'" class="intro-page">
      <view class="intro-content">
        <text class="headline">{{ headline }}</text>
        <view class="description">
          <text>{{ desc1 }}</text>
          <text>{{ desc2 }}</text>
        </view>

        <!-- 角色预览 -->
        <view class="characters-preview">
          <text class="characters-preview-title">你可能成为的角色</text>
          <view class="characters-preview-tags">
            <text
              v-for="character in characters"
              :key="character.name"
              class="character-preview-tag"
            >
              {{ character.name }}
            </text>
          </view>
        </view>

        <button class="start-btn" @click="startTest">开始测试</button>
      </view>
    </view>

    <!-- 测试进度页 -->
    <view v-else-if="currentPage === 'progress'" class="progress-page">
      <view class="progress-container">
        <view class="progress-bar">
          <view
            class="progress-fill"
            :style="{
              width: (currentQuestionIndex / questions.length) * 100 + '%',
            }"
          ></view>
        </view>
        <view class="progress-text">
          {{ currentQuestionIndex }} / {{ questions.length }}
        </view>
      </view>
      <view class="question-container">
        <text class="question">{{ currentQuestion.question }}</text>
        <view class="options">
          <view
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option"
            :class="{ selected: selectedOption === option.value }"
            @click="selectOption(option.value)"
          >
            <text class="option-text">{{ option.text }}</text>
          </view>
        </view>
        <view class="action-buttons">
          <button
            v-if="currentQuestionIndex > 0"
            class="prev-btn"
            @click="prevQuestion"
          >
            上一题
          </button>
        </view>

        <!-- 随机查看结果按钮 -->
        <view class="navigation-buttons">
          <button @click="randomResult" class="btn random-btn">
            随机查看结果
          </button>
        </view>
      </view>
    </view>

    <!-- 结果页 -->
    <view v-else-if="currentPage === 'result'" class="result-page">
      <view class="result-container">
        <view class="character-image">
          <image
            :src="resultCharacter.imageUrl"
            :alt="resultCharacter.name"
            mode="aspectFit"
          />
        </view>
        <text class="character-name">{{ resultCharacter.name }}</text>
        <view class="character-info">
          <view class="info-item">
            <text class="label">称号：</text>
            <text class="value">{{ resultCharacter.title }}</text>
          </view>
          <view class="info-item">
            <text class="label">生日：</text>
            <text class="value">{{ resultCharacter.birthday }}</text>
          </view>
          <view class="info-item">
            <text class="label">血型：</text>
            <text class="value">{{ resultCharacter.bloodType }}</text>
          </view>
          <view class="info-item">
            <text class="label">查克拉属性：</text>
            <text class="value">{{ resultCharacter.chakra }}</text>
          </view>
          <view class="info-item">
            <text class="label">故乡：</text>
            <text class="value">{{ resultCharacter.hometown }}</text>
          </view>
        </view>
        <view class="character-quote">
          <text>"{{ resultCharacter.catchphrase }}"</text>
        </view>
        <view class="character-intro">
          <text class="intro-title">角色介绍</text>
          <text class="c-intro-content">{{
            resultCharacter.introduction
          }}</text>
        </view>
        <view class="personality-match">
          <text class="match-title">性格匹配</text>
          <text class="match-content">{{
            resultCharacter.personalityMatch
          }}</text>
        </view>
        <view class="action-buttons">
          <button class="restart-btn" @click="restartTest">重新测试</button>
          <button open-type="share" class="share-btn">分享结果</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { onShareAppMessage } from "@dcloudio/uni-app";
import {
  headline,
  desc1,
  desc2,
  questions,
  matchCharacter,
  characters,
} from "@/utils/naruto";

// 页面状态: 'intro' | 'progress' | 'result'
const currentPage = ref("intro");
// 当前问题索引
const currentQuestionIndex = ref(0);
// 用户选择的答案
const userAnswers = ref<Array<{ qid: string; selectedValue: number }>>([]);
// 当前选择的选项
const selectedOption = ref<number | null>(null);
// 匹配的角色结果
const resultCharacter = ref<any>(null);

// 当前问题
const currentQuestion = computed(() => {
  return questions[currentQuestionIndex.value];
});

const handleBack = () => {
  // 在引导页状态下返回到测试工具页
  uni.navigateTo({
    url: "/pages/startlife/test/testTools",
  });
};

// 开始测试
const startTest = () => {
  currentPage.value = "progress";
  currentQuestionIndex.value = 0;
  userAnswers.value = [];
  selectedOption.value = null;
};

// 选择选项
const selectOption = (value: number) => {
  selectedOption.value = value;

  // 保存当前答案
  const currentQid = currentQuestion.value.qid;
  const existingAnswerIndex = userAnswers.value.findIndex(
    (answer) => answer.qid === currentQid
  );

  if (existingAnswerIndex >= 0) {
    // 更新已存在的答案
    userAnswers.value[existingAnswerIndex].selectedValue = selectedOption.value;
  } else {
    // 添加新答案
    userAnswers.value.push({
      qid: currentQid,
      selectedValue: selectedOption.value,
    });
  }

  // 判断是否是最后一题
  if (currentQuestionIndex.value === questions.length - 1) {
    // 计算结果
    calculateResult();
  } else {
    // 使用nextTick确保DOM更新后再切换题目
    nextTick(() => {
      // 进入下一题
      currentQuestionIndex.value++;
      // 重置选择
      selectedOption.value = null;
    });
  }
};

// 上一题
const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    // 恢复上一题的选择
    const currentQid = currentQuestion.value.qid;
    const existingAnswer = userAnswers.value.find(
      (answer) => answer.qid === currentQid
    );
    selectedOption.value = existingAnswer ? existingAnswer.selectedValue : null;
  }
};

// 计算结果
const calculateResult = () => {
  resultCharacter.value = matchCharacter(userAnswers.value);
  currentPage.value = "result";
};

// 重新测试
const restartTest = () => {
  currentPage.value = "intro";
  currentQuestionIndex.value = 0;
  userAnswers.value = [];
  selectedOption.value = null;
  resultCharacter.value = null;
};

// 随机查看结果
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
  currentPage.value = "result";
  calculateResult();
};

// uni-app分享功能
onShareAppMessage(() => {
  return {
    title: "测测你是《naruto》里的哪个角色~~",
    path: "/pages/startlife/test/naruto",
  };
});

// 组件挂载时的处理
onMounted(() => {
  // 可以在这里添加一些初始化逻辑
});
</script>

<style>
/* 全局样式 */
.naruto-test {
  font-family: "Helvetica Neue", Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-image: url("https://crownclown.xyz/naruto/naruto_bg.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
}

/* 通用容器样式 */
.intro-content,
.progress-container,
.question-container,
.result-container {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease-out;
}

.intro-content {
  padding: 20px;
  margin: 15px;
  text-align: center;
}

.progress-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px;
  margin: 15px;
  border-radius: 10px;
  backdrop-filter: blur(8px);
}

.question-container {
  padding: 25px;
  backdrop-filter: blur(8px);
}

.result-container {
  padding: 30px;
  text-align: center;
}

/* 通用按钮样式 */
.start-btn,
.next-btn,
.share-btn,
.random-btn {
  background: linear-gradient(135deg, #db667f 0%, #c55a72 100%);
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(219, 102, 127, 0.3);
  font-weight: 500;
}

.start-btn:hover,
.next-btn:hover,
.share-btn:hover,
.random-btn:hover {
  background-color: #c55a72;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(219, 102, 127, 0.4);
}

.prev-btn,
.restart-btn {
  background-color: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.prev-btn:hover,
.restart-btn:hover {
  background-color: #e0e0e0;
  transform: translateY(-1px);
}

/* 动画 */
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

/* 引导页样式 */
.intro-page {
  padding: 40px 20px;
}

.headline {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #db667f;
  text-shadow: 0 2px 4px rgba(219, 102, 127, 0.2);
  letter-spacing: 1px;
  display: block;
}

.description {
  margin-bottom: 30px;
  line-height: 1.6;
}

.description text {
  display: block;
  margin-bottom: 15px;
  text-align: left;
}

/* 角色预览样式 */
.characters-preview {
  margin-bottom: 30px;
}

.characters-preview-title {
  font-size: 16px;
  font-weight: 600;
  color: #db667f;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(219, 102, 127, 0.3);
  display: block;
  width: 100%;
}

.characters-preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.character-preview-tag {
  padding: 4px 8px;
  background: linear-gradient(135deg, #db667f 0%, #c55a72 100%);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(219, 102, 127, 0.3);
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
  box-shadow: 0 4px 12px rgba(219, 102, 127, 0.4);
}

.character-preview-tag:hover::before {
  left: 100%;
}

.start-btn {
  padding: 10rpx 24rpx;
  font-size: 16px;
  border-radius: 20rpx;
}

/* 进度页样式 */
.progress-page {
  padding: 20px;
}

.progress-bar {
  flex-grow: 1;
  height: 8px;
  background-color: rgba(224, 224, 224, 0.8);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #db667f 0%, #c55a72 100%);
  transition: width 0.3s;
  border-radius: 4px;
}

.progress-text {
  margin-left: 15px;
  font-weight: bold;
  color: #333;
}

.question {
  font-size: 20px;
  margin-bottom: 25px;
  line-height: 1.5;
  color: #333;
  display: block;
}

.options {
  margin-bottom: 30px;
}

.option {
  padding: 15px;
  margin-bottom: 15px;
  border: 2px solid rgba(224, 224, 224, 0.8);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
}

.option:hover,
.option.selected {
  border-color: #db667f;
  background-color: rgba(255, 248, 225, 0.9);
}

.option-text {
  display: block;
  line-height: 1.5;
}

/* 按钮容器样式 */
.action-buttons {
  display: flex;
  justify-content: space-between;
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-radius: 10px;
}

/* 结果页按钮样式 */
.prev-btn,
.next-btn {
  padding: 8rpx 16rpx;
  font-size: 14px;
}

.next-btn:disabled {
  background-color: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.random-btn {
  padding: 6px 14px;
  font-size: 13px;
}

/* 结果页样式 */
.result-page {
  padding: 20px;
}

.character-image {
  margin-bottom: 20px;
}

.character-image image {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.character-image image:hover {
  transform: scale(1.05);
}

.character-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
  color: #333;
  text-shadow: 0 2px 4px rgba(219, 102, 127, 0.2);
  letter-spacing: 1px;
}

.character-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 25px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.info-item {
  width: 45%;
  margin-bottom: 10px;
  padding: 5px 10px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
  color: #555;
}

.value {
  color: #333;
}

.character-quote {
  margin-bottom: 25px;
  padding: 15px;
  background: linear-gradient(
    135deg,
    rgba(219, 102, 127, 0.1) 0%,
    rgba(219, 102, 127, 0.05) 100%
  );
  border-left: 4px solid #db667f;
  font-style: italic;
  text-align: left;
  border-radius: 0 14px 14px 0;
}

.character-intro,
.personality-match {
  text-align: left;
  margin-bottom: 25px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.intro-title,
.match-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 2px solid #db667f;
  display: block;
}

.c-intro-content,
.match-content {
  line-height: 1.6;
  color: #555;
}

/* 结果页按钮容器 */
.result-container .action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  border-radius: 10px;
}

.restart-btn,
.share-btn {
  padding: 8px 18px;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .naruto-test {
    padding: 10px;
  }

  .headline {
    font-size: 24px;
  }

  .question {
    font-size: 18px;
  }

  .character-info {
    flex-direction: column;
  }

  .info-item {
    width: 100%;
  }

  .action-buttons,
  .navigation-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .prev-btn,
  .next-btn,
  .restart-btn,
  .random-btn,
  .share-btn {
    width: 100%;
  }

  .intro-content,
  .progress-container,
  .question-container,
  .result-container {
    margin: 10px;
  }
}
</style>