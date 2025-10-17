<template>
  <view class="container">
    <view class="u-m-l-20 u-m-t-50">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>
    <!-- 欢迎页面 -->
    <view v-if="currentPage === 'welcome'" class="section">
      <view class="welcome-title">MBTI-M 标准化性格测试</view>
      <view class="welcome-desc"
        >欢迎参加MBTI-M标准化性格测试！本测试包含93道专业题目，每个问题提供6个不同程度的选项，预计需要25-30分钟完成。</view
      >
      <view class="welcome-desc"
        >请根据您的真实想法，选择最符合您的选项。为确保测试结果的准确性，建议您在安静的环境下完成测试。</view
      >
      <view class="welcome-subtitle">本测试将帮助您：</view>
      <view class="welcome-list">
        <view class="list-item">深入了解您的MBTI性格类型</view>
        <view class="list-item">获得详细的性格特点分析（优势和发展方向）</view>
        <view class="list-item">发现最适合您的职业发展方向</view>
      </view>
      <button @click="startTest" class="btn start-btn">开始测试</button>
      <button
        @click="generateRandomAnswers"
        class="btn secondary-btn"
        style="margin-top: 12px"
      >
        随机生成答案查看结果
      </button>
    </view>

    <!-- 测试页面 -->
    <view v-if="currentPage === 'test'" class="section">
      <view class="progress-container">
        <view class="progress-info">
          <text class="question-number"
            >第 {{ currentQuestion + 1 }} 题 / 共
            {{ questions.length }} 题</text
          >
          <text class="progress-percentage">{{ Math.round(progress) }}%</text>
        </view>
        <view class="progress-bar">
          <view class="progress-fill" :style="{ width: progress + '%' }"></view>
        </view>
      </view>

      <view class="question-container">
        <view class="question-text">{{ currentQuestionData.text }}</view>
        <view class="options">
          <button
            v-for="(option, index) in currentQuestionData.options"
            :key="index"
            @click="selectOption(index + 1)"
            :class="[
              'option-btn',
              { selected: currentOptionSelected === index + 1 },
            ]"
          >
            {{ option }}
          </button>
        </view>
      </view>

      <view class="test-controls">
        <button
          @click="previousQuestion"
          class="btn secondary-btn"
          :disabled="currentQuestion === 0"
        >
          上一题
        </button>
        <button
          @click="nextQuestion"
          class="btn primary-btn"
          :disabled="currentOptionSelected === null"
        >
          {{ currentQuestion === questions.length - 1 ? "完成测试" : "下一题" }}
        </button>
      </view>

      <view class="abort-control">
        <button @click="abortTest" class="btn abort-btn">中止测试</button>
      </view>
    </view>

    <!-- 结果页面 -->
    <view v-if="currentPage === 'result'" class="section">
      <view class="result-title"
        ><text style="white-space: nowrap">您的MBTI类型是：</text>
        <text class="mbti-type">{{ resultData.type }}</text></view
      >

      <view class="result-container">
        <!-- 性格维度分析 -->
        <view class="analysis-section dimension-section">
          <view class="section-header">
            <text class="section-icon">📊</text>
            <text class="section-title">性格维度分析</text>
          </view>
          <view class="dimension-charts">
            <view
              v-for="(dimension, key) in resultData.dimensionScores"
              :key="key"
              class="dimension-item"
            >
              <view class="dimension-name">{{ dimension.name }}</view>
              <view class="dimension-bar">
                <view
                  class="dimension-fill"
                  :style="{ width: dimension.score + '%' }"
                ></view>
              </view>
              <view class="dimension-labels">
                <text>{{ key[0] }} {{ Math.round(dimension.score) }}%</text>
                <text
                  >{{ Math.round(100 - dimension.score) }}% {{ key[1] }}</text
                >
              </view>
            </view>
          </view>
        </view>

        <!-- 心理特点分析 -->
        <view class="analysis-section personality-section">
          <view class="section-header">
            <text class="section-icon">🧠</text>
            <text class="section-title">心理特点分析</text>
          </view>
          <view class="section-content">{{
            analysisData.personalityDescription
          }}</view>
        </view>

        <!-- 人际关系分析 -->
        <view class="analysis-section relationship-section">
          <view class="section-header">
            <text class="section-icon">💑</text>
            <text class="section-title">人际关系分析</text>
          </view>
          <view class="section-content">{{ analysisData.relationships }}</view>
        </view>

        <!-- 职业发展建议 -->
        <view class="analysis-section career-section">
          <view class="section-header">
            <text class="section-icon">💼</text>
            <text class="section-title">职业发展建议</text>
          </view>
          <view class="section-content">{{ analysisData.careerAdvice }}</view>
        </view>

        <!-- 成长方向 -->
        <view class="analysis-section growth-section">
          <view class="section-header">
            <text class="section-icon">🎯</text>
            <text class="section-title">成长方向</text>
          </view>
          <view class="section-content">{{ analysisData.growthAreas }}</view>
        </view>
      </view>

      <view class="result-actions">
        <button @click="restartTest" class="btn primary-btn">重新测试</button>
        <button @click="saveResults" class="btn secondary-btn">保存结果</button>
        <button open-type="share" class="btn secondary-btn">分享给好友</button>
      </view>

      <!-- 隐藏的canvas元素，用于绘制测试结果图片 -->
      <canvas
        canvas-id="resultCanvas"
        style="
          position: fixed;
          left: -9999px;
          top: -9999px;
          width: 750px;
          height: 1334px;
        "
      ></canvas>
    </view>
  </view>
</template>

<script setup lang="ts">
import { AIAnalyzer, MBTITest, questions } from "@/utils/mbti";
import { ref, computed, onMounted } from "vue";
import { onShareAppMessage } from "@dcloudio/uni-app";

const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

// 初始化MBTI测试和AI分析器
const mbtiTest = new MBTITest();
const aiAnalyzer = new AIAnalyzer();

// 响应式数据
const currentPage = ref<"welcome" | "test" | "result">("welcome");
const currentQuestion = ref(0);
const currentOptionSelected = ref<number | null>(null);
const isProcessingSelection = ref(false);

// 计算属性
const currentQuestionData = computed(() => {
  return questions[currentQuestion.value] || {};
});

const progress = computed(() => {
  return mbtiTest.getProgress();
});

const resultData = computed(() => {
  return mbtiTest.calculateType();
});

const analysisData = computed(() => {
  return aiAnalyzer.generatePersonalityAnalysis(
    resultData.value.type,
    resultData.value.dimensionScores
  );
});

// 方法
function startTest() {
  currentPage.value = "test";
  mbtiTest.clearProgress();
  currentQuestion.value = 0;
  currentOptionSelected.value = null;
  updateQuestion();
}

function updateQuestion() {
  currentOptionSelected.value = mbtiTest.getAnswer(currentQuestion.value);
}

function previousQuestion() {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
    updateQuestion();
  }
}

function nextQuestion() {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++;
    updateQuestion();
  } else if (mbtiTest.isComplete()) {
    showResults();
  }
}

function selectOption(optionIndex: number) {
  if (isProcessingSelection.value) return;
  isProcessingSelection.value = true;

  currentOptionSelected.value = optionIndex;
  mbtiTest.setAnswer(currentQuestion.value, optionIndex);

  if (currentQuestion.value < questions.length - 1) {
    setTimeout(() => {
      nextQuestion();
      isProcessingSelection.value = false;
    }, 500);
  } else {
    isProcessingSelection.value = false;
  }
}

function showResults() {
  currentPage.value = "result";
}

function restartTest() {
  mbtiTest.clearProgress();
  currentOptionSelected.value = null;
  currentPage.value = "welcome";
}

function abortTest() {
  // 显示确认对话框
  uni.showModal({
    title: "确认中止测试",
    content: "您确定要中止测试吗？当前进度将会丢失。",
    success: function (res) {
      if (res.confirm) {
        // 用户点击确定
        mbtiTest.clearProgress();
        currentOptionSelected.value = null;
        currentPage.value = "welcome";
      }
    },
  });
}

function saveResults() {
  const results = mbtiTest.saveResults();
  const date = new Date().toLocaleDateString();

  // 使用canvas绘制测试结果图片
  const ctx = uni.createCanvasContext("resultCanvas");

  // 设置画布背景
  ctx.setFillStyle("#ffffff");
  ctx.fillRect(0, 0, 750, 1334);

  // 绘制标题
  ctx.setFontSize(36);
  ctx.setFillStyle("#2c3e50");
  ctx.setTextAlign("center");
  ctx.fillText("MBTI性格测试结果", 375, 80);

  // 绘制日期
  ctx.setFontSize(24);
  ctx.setFillStyle("#5a6c7d");
  ctx.fillText(date, 375, 120);

  // 绘制MBTI类型
  ctx.setFontSize(48);
  ctx.setFillStyle("#4a6cf7");
  ctx.fillText(results.type, 375, 200);

  // 绘制分割线
  ctx.setStrokeStyle("#f0f0f0");
  ctx.setLineWidth(2);
  ctx.beginPath();
  ctx.moveTo(50, 240);
  ctx.lineTo(700, 240);
  ctx.stroke();

  // 绘制性格特征分析标题
  ctx.setFontSize(28);
  ctx.setFillStyle("#2c3e50");
  ctx.setTextAlign("left");
  ctx.fillText("性格特征分析", 50, 290);

  // 绘制性格特征描述（自动换行处理）
  ctx.setFontSize(24);
  ctx.setFillStyle("#5a6c7d");
  const descText = results.description;
  const maxWidth = 650;
  let lineY = 330;

  // 简单的文本换行处理
  let line = "";
  for (let i = 0; i < descText.length; i++) {
    line += descText[i];
    if (ctx.measureText(line).width > maxWidth || i === descText.length - 1) {
      ctx.fillText(line, 50, lineY);
      line = "";
      lineY += 35;
    }
  }

  // 绘制性格优势标题
  ctx.setFontSize(28);
  ctx.setFillStyle("#2c3e50");
  ctx.fillText("性格优势", 50, lineY + 40);

  // 绘制性格优势列表
  ctx.setFontSize(24);
  ctx.setFillStyle("#5a6c7d");
  let strengthY = lineY + 80;
  results.strengths.forEach((strength: string) => {
    ctx.fillText(`• ${strength}`, 50, strengthY);
    strengthY += 35;
  });

  // 绘制发展方向标题
  ctx.setFontSize(28);
  ctx.setFillStyle("#2c3e50");
  ctx.fillText("发展方向", 50, strengthY + 40);

  // 绘制发展方向列表
  ctx.setFontSize(24);
  ctx.setFillStyle("#5a6c7d");
  let weaknessY = strengthY + 80;
  results.weaknesses.forEach((weakness: string) => {
    ctx.fillText(`• ${weakness}`, 50, weaknessY);
    weaknessY += 35;
  });

  // 绘制维度分析标题
  ctx.setFontSize(28);
  ctx.setFillStyle("#2c3e50");
  ctx.fillText("维度分析", 50, weaknessY + 40);

  // 绘制维度分析
  ctx.setFontSize(24);
  ctx.setFillStyle("#5a6c7d");
  let dimensionY = weaknessY + 80;
  Object.entries(results.dimensionScores).forEach(
    ([d, data]: [string, any]) => {
      const dimensionText = `${data.name}：${Math.round(data.score)}% ${
        d[0]
      } - ${100 - Math.round(data.score)}% ${d[1]}`;
      ctx.fillText(dimensionText, 50, dimensionY);
      dimensionY += 35;
    }
  );

  // 绘制推荐职业方向标题
  ctx.setFontSize(28);
  ctx.setFillStyle("#2c3e50");
  ctx.fillText("推荐职业方向", 50, dimensionY + 40);

  // 绘制推荐职业方向列表
  ctx.setFontSize(24);
  ctx.setFillStyle("#5a6c7d");
  let careerY = dimensionY + 80;
  results.careers.forEach((career: string) => {
    ctx.fillText(`• ${career}`, 50, careerY);
    careerY += 35;
  });

  // 绘制底部装饰
  ctx.setFillStyle("#4a6cf7");
  ctx.fillRect(50, careerY + 40, 650, 5);

  // 绘制完成
  ctx.draw();

  // 延迟保存图片，确保canvas绘制完成
  setTimeout(() => {
    uni.canvasToTempFilePath({
      canvasId: "resultCanvas",
      success: (res) => {
        const posterImageUrl = res.tempFilePath;
        savePoster(posterImageUrl);
      },
      fail: (err) => {
        console.error("生成图片失败", err);
        uni.showToast({
          title: "生成图片失败",
          icon: "none",
        });
      },
    });
  }, 500);
}

// 保存到相册
const savePoster = async (posterImageUrl: string) => {
  if (!posterImageUrl) return;

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
      filePath: posterImageUrl,
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

// 随机生成测试答案
function generateRandomAnswers() {
  mbtiTest.clearProgress();

  // 为每个问题随机生成答案
  for (let i = 0; i < questions.length; i++) {
    // 根据选项数量随机生成答案
    const optionCount = questions[i].options.length;
    const randomAnswer = Math.floor(Math.random() * optionCount) + 1;
    mbtiTest.setAnswer(i, randomAnswer);
  }

  // 直接跳转到结果页面
  showResults();
}

// 生命周期钩子
onMounted(() => {
  updateQuestion();
});

onShareAppMessage(() => {
  return {
    title: "快来了解一下您的MBTI性格类型~~",
    path: "/pages/startlife/mine/mbti",
  };
});
</script>

<style>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.section {
  background-color: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  border: 1px solid #f0f0f0;
}

.welcome-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 16px;
}

.welcome-title:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #4a6cf7;
  border-radius: 2px;
}

.welcome-desc {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 20px;
  color: #5a6c7d;
  text-align: justify;
}

.welcome-subtitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #2c3e50;
}

.welcome-list {
  margin-bottom: 32px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
}

.list-item {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 12px;
  color: #5a6c7d;
  display: flex;
  align-items: flex-start;
}

.list-item:before {
  content: "•";
  color: #4a6cf7;
  font-weight: bold;
  margin-right: 10px;
}

.progress-container {
  margin-bottom: 32px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.question-number {
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
}

.progress-percentage {
  font-size: 16px;
  color: #4a6cf7;
  font-weight: bold;
}

.progress-bar {
  height: 10px;
  background-color: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  background-color: #4a6cf7;
  transition: width 0.4s ease;
  border-radius: 6px;
}

.question-container {
  margin-bottom: 32px;
}

.question-text {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
  line-height: 1.5;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.option-btn {
  padding: 8px 10px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  background-color: #fff;
  text-align: left;
  font-size: 16px;
  transition: all 0.3s ease;
  width: 85%;
  max-width: 520px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.option-btn:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #4a6cf7;
  transform: scaleY(0);
  transition: transform 0.3s ease;
  border-radius: 0 4px 4px 0;
}

.option-btn:hover {
  border-color: #4a6cf7;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 108, 247, 0.15);
}

.option-btn.selected {
  background-color: #f0f4ff;
  color: #4a6cf7;
  border-color: #4a6cf7;
  font-weight: 500;
}

.option-btn.selected:before {
  transform: scaleY(1);
}

.test-controls {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.test-controls .btn {
  flex: 1;
}

.abort-control {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

.abort-btn {
  color: #f8f9fa;
  background-color: #e74c3c;
  border: 1px solid #e74c3c;
  width: 100%;
  font-weight: 600;
}

.abort-btn:hover {
  background-color: #e74c3c;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
}

.btn {
  /* padding: 14px 24px; */
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.start-btn {
  width: 100%;
  background-color: #4a6cf7;
  color: white;
  margin-top: 16px;
}

.primary-btn {
  background-color: #4a6cf7;
  color: white;
  border: 1px solid #dee2e6;
}

.secondary-btn {
  background-color: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.result-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 16px;
}

.result-title:after {
  content: "";
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #4a6cf7;
  border-radius: 2px;
}

.mbti-type {
  color: #4a6cf7;
  font-weight: bold;
  font-size: 32px;
  line-height: 64px;
}

.result-container {
  margin-bottom: 32px;
}

.analysis-section {
  margin-bottom: 24px;
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 16px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.analysis-section:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
}

.section-icon {
  font-size: 24px;
  margin-right: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4a6cf7;
  color: white;
  border-radius: 10px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.section-content {
  font-size: 16px;
  line-height: 1.7;
  color: #5a6c7d;
  white-space: pre-line;
}

.dimension-charts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dimension-item {
  width: 100%;
}

.dimension-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #2c3e50;
}

.dimension-bar {
  height: 14px;
  background-color: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dimension-fill {
  height: 100%;
  background-color: #4a6cf7;
  transition: width 0.5s ease;
  border-radius: 8px;
}

.dimension-labels {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #5a6c7d;
}

.result-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  padding: 0 20px;
}

.result-actions .btn {
  width: 100%;
  max-width: 280px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
</style>
