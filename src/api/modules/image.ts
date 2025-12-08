import axios from "axios";
import { getFullURL } from "@/utils/http";

// 图片生成模型配置 - 从环境变量读取
const IMAGE_CONFIG = {
  apiKey: import.meta.env.VITE_IMAGE_GENERATION_API_KEY,
  baseURL:
    import.meta.env.VITE_IMAGE_GENERATION_BASE_URL ||
    "https://open.bigmodel.cn/api/paas/v4/",
  model: import.meta.env.VITE_IMAGE_GENERATION_MODEL || "cogview-3-flash",
};

export interface GeneratedImage {
  url: string;
  id: string;
}

// 创建动态axios实例
export const createImageClient = () => {
  const config = {
    baseUrl: IMAGE_CONFIG.baseURL,
    timeout: 10000,
    apiKey: IMAGE_CONFIG.apiKey,
  };
  return axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${IMAGE_CONFIG.apiKey}`,
    },
    adapter(config) {
      console.log("request adapter ↓↓");
      console.log(config);
      const { url, method, data, params, headers, baseURL, paramsSerializer } =
        config;
      return new Promise((resolve, reject) => {
        uni.request({
          method: method!.toUpperCase() as any,
          url: getFullURL(baseURL || "", url!, params, paramsSerializer),
          header: headers,
          data,
          dataType: "json",
          responseType: config.responseType,
          success: (res: any) => {
            console.log("request success ↓↓");
            console.log(res);
            resolve(res);
          },
          fail: (err: any) => {
            reject(err);
          },
        });
      });
    },
  });
};

export const generateRecipeImage = async (
  recipe: any
): Promise<GeneratedImage> => {
  // 构建图片生成的提示词
  const prompt = buildImagePrompt(recipe);

  const sizeToUse = { width: 1024, height: 1024 };

  try {
    const imageClient = createImageClient();
    return imageClient
      .post("/", {
        model: IMAGE_CONFIG.model,
        prompt: prompt,
        size: `${sizeToUse.width}x${sizeToUse.height}`,
        n: 1,
        style: "vivid",
        quality: "hd",
      })
      .then((response: any) => {
        if (!response.ok) {
          throw new Error(`API请求失败: ${response.status}`);
        }
        return response.json();
      })
      .then((data: any) => {
        if (data.data && data.data.length > 0) {
          return {
            url: data.data[0].url,
            id: `${recipe.id}-${Date.now()}`,
          };
        } else {
          throw new Error("API返回数据格式错误");
        }
      });
  } catch (error) {
    console.error("生成图片失败:", error);
    throw error;
  }
};

const buildImagePrompt = (recipe: any): string => {
  return `龙珠反派弗利萨最终形态动漫画风，白色光滑皮肤，紫色纹路清晰可见，身穿迈阿密热火队 3 号黑色球衣，球衣红色队标与弗利萨的紫色身体形成鲜明对比，弗利萨悬浮在空中，双手背在身后，眼神邪魅冷酷，背景是暗色调的能量光晕，赛璐璐画法，线条流畅，色彩浓郁，完全还原原作角色的邪典气质，无写实化畸变`;
};
