import { defineStore } from "pinia";
// 六爻占卜结果
export interface LiuYaoResult {
  time: string;
  ganzhi: string;
  gua_xiang: string;
  gua_degree: string;
  gua_name: string;
  gua_biaozhu: string;
  gua_ci: string;
  gua_xiang_ci: string;
  gua_explain: string;
  gua_detail: string;
  gua_advice: string;
}
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

// 占卜类型
type FortuneType = "daily" | "mood" | "couple" | "number";

export interface CombineFortuneResult {
  id: string;
  type: FortuneType;
  date: string;
  selectedZodiac: ZodiacConfig | null;
  selectedAnimal: AnimalConfig | null;
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
export const useZhanbuStore = defineStore("zhanbu", {
  state: () => ({
    fortuneResult: null as CombineFortuneResult | null,
    liuyaoResult: null as LiuYaoResult | null,
  }),
  actions: {
    setFortuneResult(params: CombineFortuneResult) {
      this.fortuneResult = params;
    },
    getFortuneResult() {
      return this.fortuneResult;
    },
    clearFortuneResult() {
      this.fortuneResult = null;
    },
    setLiuyaoResult(params: LiuYaoResult) {
      this.liuyaoResult = params;
    },
    getLiuyaoResult() {
      return this.liuyaoResult;
    },
    clearLiuyaoResult() {
      this.liuyaoResult = null;
    },
  },
});
