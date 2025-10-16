import axios from "axios";
import { getFullURL } from '@/utils/http'
import { getTextGenerationConfig } from "@/utils/apiConfig";

// 创建动态axios实例
export const createAiClient = () => {
  const config = getTextGenerationConfig();
  return axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
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