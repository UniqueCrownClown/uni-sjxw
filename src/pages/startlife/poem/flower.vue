<template>
  <view class="w-full min-h-screen bg-slate-50">
    <view class="u-m-l-20 u-p-t-50 u-text-left" style="width: 100%">
      <u-icon
        name="home"
        color="#D9D919"
        size="50"
        @click="handleTomine"
      ></u-icon>
    </view>

    <view class="box-border p-4 w-full">
      <view
        class="text-xl font-blod text-center text-gray-600 my-2 drop-shadow-md"
        >妙语生花</view
      >
      <view class="text-base text-center text-gray-500 my-2"
        >要是能重来 我要选李白 至少我还能写写诗来澎湃 逗逗女孩</view
      >

      <!-- 情诗生成表单 -->
      <view class="bg-white rounded-lg p-4 mt-4 shadow-slate-300">
        <view class="flex items-center mb-4">
          <view class="w-200 font-blod">对方昵称</view>
          <u-input
            v-model="formData.nickname"
            placeholder="请输入对方昵称"
            :custom-style="inputStyle"
          ></u-input>
        </view>

        <view class="flex items-center mb-4" @click="emotionShow = true">
          <view class="w-200 font-blod">核心情感</view>
          <view class="flex-1">
            <u-input
              v-model="formData.emotionValue"
              placeholder="请输入核心情感"
              :custom-style="inputStyle"
              disabled
            ></u-input>
          </view>

          <u-select
            v-model="emotionShow"
            :list="emotionList"
            @confirm="handleEmotionSelect"
          ></u-select>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>

        <view class="flex items-center mb-4" @click="sceneShow = true">
          <view class="w-200 font-blod">场景关键词</view>
          <view class="flex-1">
            <u-input
              v-model="formData.sceneValue"
              placeholder="请输入场景关键词"
              :custom-style="inputStyle"
              disabled
            ></u-input>
          </view>

          <u-select
            v-model="sceneShow"
            :list="sceneList"
            @confirm="handleSceneSelect"
          ></u-select>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>

        <view class="flex items-center mb-4" @click="styleShow = true">
          <view class="w-200 font-blod">诗词风格</view>
          <view class="flex-1">
            <u-input
              v-model="formData.styleValue"
              placeholder="请输入诗词风格"
              :custom-style="inputStyle"
              disabled
            ></u-input>
          </view>
          <u-select
            v-model="styleShow"
            :list="styleList"
            @confirm="handleStyleSelect"
          ></u-select>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>

        <view class="btn-container">
          <u-button
            type="primary"
            @click="generatePoem"
            :loading="isLoading"
            loading-text="生成中..."
            >生成情诗</u-button
          >
        </view>

        <!-- 生成结果展示 -->
        <view
          v-if="generatedPoem"
          class="mt-4 p-4 rounded-lg bg-light-300 shadow-slate-300"
        >
          <view class="text-center text-xl font-blod"
            >致{{ formData.nickname }}</view
          >
          <view
            class="poem-content text-base rounded-lg bg-light-400 my-4 whitespace-pre-line text-center"
            >{{ generatedPoem }}</view
          >
          <view class="text-sm text-center text-gray-500 my-4">
            {{ explanation }}
          </view>
          <view class="mt-4 flex justify-evenly items-center">
            <u-button type="primary" @click="copyPoem">复制情诗</u-button>
            <button
              class="action-button"
              open-type="share"
              style="
                height: 40px;
                line-height: 40px;
                font-size: 15px;
                padding: 0 20px;
              "
            >
              分享好友
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShareAppMessage } from "@dcloudio/uni-app";
import { createAiClient } from "@/api/modules/ai";
import { getTextGenerationConfig } from "@/utils/apiConfig";

// 返回按钮
const handleTomine = () => {
  uni.switchTab({
    url: "/pages/startlife/mine/index",
  });
};

// 表单数据
const formData = ref({
  nickname: "刘亦菲",
  emotionValue: "告白",
  sceneValue: "星河",
  styleValue: "浪漫豪放",
});

// 输入框样式
const inputStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "10rpx",
};

// 核心情感选项
const emotionList = [
  { value: "爱慕", label: "爱慕" },
  { value: "思念(星河寄思，豪放不扭捏)", label: "思念" },
  { value: "倾心", label: "倾心" },
  { value: "迷恋", label: "迷恋" },
  { value: "痴情", label: "痴情" },
  { value: "暗恋", label: "暗恋" },
  { value: "相思", label: "相思" },
  { value: "告白", label: "告白" },
  { value: "相守", label: "相守" },
  { value: "久别重逢", label: "久别重逢" },
];

// 场景关键词选项
const sceneList = [
  { value: "月下", label: "月下" },
  { value: "江畔", label: "江畔" },
  { value: "星河", label: "星河" },
  { value: "酒肆(适配醉里告白、酒中思君)", label: "酒肆" },
  { value: "长风", label: "长风" },
  { value: "高山", label: "高山" },
  { value: "花前(花间酒、桃花潭，非柔媚)", label: "花前" },
  { value: "窗前", label: "窗前" },
  { value: "梦中", label: "梦中" },
  { value: "初见", label: "初见" },
  { value: "离别", label: "离别" },
  { value: "云间", label: "云间" },
];

// 诗词风格选项
const styleList = [
  { value: "浪漫豪放", label: "浪漫豪放" },
  { value: "清新婉约", label: "清新婉约" },
];

// 处理核心情感选择
const emotionShow = ref(false);
const handleEmotionSelect = (e: any) => {
  formData.value.emotionValue = e[0].value;
};

// 处理场景关键词选择
const sceneShow = ref(false);
const handleSceneSelect = (e: any) => {
  formData.value.sceneValue = e[0].value;
};

// 处理诗词风格选择
const styleShow = ref(false);
const handleStyleSelect = (e: any) => {
  formData.value.styleValue = e[0].value;
};

// 生成结果
const generatedPoem = ref("");
const explanation = ref("");
const isLoading = ref(false);

// 生成情诗
const generatePoem = async () => {
  if (!formData.value.nickname) {
    uni.showToast({
      title: "请输入对方昵称",
      icon: "none",
    });
    return;
  }

  isLoading.value = true;

  const poemData = await geneateByAi();
  console.log(poemData);

  generatedPoem.value = poemData.poem;
  explanation.value = poemData.explanation;

  isLoading.value = false;

  uni.showToast({
    title: "情诗生成成功",
    icon: "success",
  });
};

// 复制情诗
const copyPoem = () => {
  uni.setClipboardData({
    data: generatedPoem.value,
    success: () => {
      uni.showToast({
        title: "复制成功",
        icon: "success",
      });
    },
    fail: () => {
      uni.showToast({
        title: "复制失败",
        icon: "none",
      });
    },
  });
};
//
const geneateByAi = async () => {
  const prompt = `请以李白的浪漫豪放风格创作一首情诗（七言律诗/绝句，4-8句，可灵活调整），核心要求如下：

1. 【个性化核心要素】
- 倾诉对象昵称：${formData.value.nickname}
- 核心情感：${formData.value.emotionValue}
- 场景关键词：${formData.value.sceneValue}
- 诗词风格：${formData.value.styleValue}
- 禁止元素：避免婉约柔媚的表达，不使用低俗艳俗词汇，保持诗仙的洒脱与仙气。

2. 【李白风格强制约束】
- 意象要求：必须使用李白高频宏大意象（优先选星、月、银河、酒、风、云、剑、江河、高山等），用天地山河衬深情；
- 情感表达：直白炽热，不含蓄扭捏（如李白“思君如潮水”式直抒胸臆），可带一丝侠气与酒气；
- 句式要求：语言雄浑流畅，朗朗上口，押韵自然（平水韵/新韵均可，需统一），适当用夸张、比喻手法（如“银河为媒”“酒浇相思”）；
- 风格基调：浪漫不羁，既有“举杯邀月”的仙气，又有“天生我材”的自信，哪怕写思念，也不失豪放气场。

3. 【创作细节引导】
- 开头：用场景关键词切入（如“星垂平野”“月照江楼”），快速营造意境；
- 中间：融入昵称与核心情感，让情感与场景深度绑定；
- 结尾：要么盼重逢（豪迈版，如“何日同饮星河”），要么诉执念（深情版，如“此心不负星辰约”），留有余味；
- 加分项：可加入李白式“酒”元素（如“醉里思君”“举杯邀月”），或“剑”元素（如“剑挑相思”“仗剑赴君”），强化风格辨识度。

4. 【输出格式】
- 先给出完整情诗（诗句用李白风格字体感呈现，如加粗或分行）；
- 再附1-2句简短解析：说明诗中李白风格的体现（如意象、句式、情感）与个性化元素的融合点。

请严格遵循以上要求，拒绝模板化、平庸化表达，创作一首让人惊艳的专属情诗！
请按照以下JSON格式返回结果：
{
"poem": "",
"explanation": "",
}`;

  const aiClient = createAiClient();
  const apiConfig = getTextGenerationConfig();

  const response = await aiClient.post("/chat/completions", {
    model: apiConfig.model,
    messages: [
      {
        role: "system",
        content:
          "你是一位深耕诗词领域的创作大师，饱读诗词，既擅长李白的浪漫豪放和也精通李白的清新婉约风格。请严格按照JSON格式返回，不要包含任何其他文字。",
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
    cleanResponse = cleanResponse.replace(/```\s*/, "").replace(/```\s*$/, "");
  }

  return JSON.parse(cleanResponse);
};
onShareAppMessage(() => {
  return {
    title: "妙语生花,快来生成李白式的情诗~",
    path: "/pages/startlife/poem/flower",
  };
});
</script>

<style lang="scss" scoped></style>
