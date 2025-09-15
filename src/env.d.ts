/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_APP_AXIOS_BASE_URL: string
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@/components/wan-calendar/calendar' {
  interface FestivalMap {
    [key: string]: { title: string };
  }

  interface LunarSolarData {
    date: string;
    lunarDate: string;
    festival: string | null;
    lunarFestival: string | null;
    lYear: number;
    lMonth: number;
    lDay: number;
    Animal: string;
    IMonthCn: string;
    IDayCn: string;
    cYear: number;
    cMonth: number;
    cDay: number;
    gzYear: string;
    gzMonth: string;
    gzDay: string;
    isToday: boolean;
    isLeap: boolean;
    nWeek: number;
    ncWeek: string;
    isTerm: boolean;
    Term: string | null;
    astro: string;
  }

  const calendar: {
    // 农历信息表
    lunarInfo: number[];
    // 公历每月天数
    solarMonth: number[];
    // 天干
    Gan: string[];
    // 地支
    Zhi: string[];
    // 生肖
    Animals: string[];
    // 阳历节日
    festival: FestivalMap;
    // 农历节日
    lfestival: FestivalMap;
    // 24节气
    solarTerm: string[];
    // 节气信息表
    sTermInfo: string[];
    // 数字转中文表
    nStr1: string[];
    nStr2: string[];
    nStr3: string[];
    nStr4: string[];

    // 获取农历年总天数
    lYearDays(y: number): number;
    // 获取农历年闰月
    leapMonth(y: number): number;
    // 获取农历年闰月天数
    leapDays(y: number): number;
    // 获取农历月天数
    monthDays(y: number, m: number): number;
    // 获取公历年月天数
    solarDays(y: number, m: number): number;
    // 农历年转干支纪年
    toGanZhiYear(lYear: number): string;
    // 公历转星座
    toAstro(cMonth: number, cDay: number): string;
    // 偏移量转干支
    toGanZhi(offset: number): string;
    // 获取公历年节气日期
    getTerm(y: number, n: number): number;
    // 农历年转中文表示
    toChinaYear(y: number): string;
    // 农历月转中文表示
    toChinaMonth(m: number): string | -1;
    // 农历日转中文表示
    toChinaDay(d: number): string;
    // 年份转生肖
    getAnimal(y: number): string;
    // 公历转农历
    solar2lunar(y: number, m: number, d: number): LunarSolarData | -1;
    // 农历转公历
    lunar2solar(y: number, m: number, d: number, isLeapMonth?: boolean): LunarSolarData | -1;
    // 获取阳历节日
    getFestival(): FestivalMap;
    // 获取农历节日
    getLunarFestival(): FestivalMap;
    // 设置阳历节日
    setFestival(param: FestivalMap): void;
    // 设置农历节日
    setLunarFestival(param: FestivalMap): void;
  };

  export default calendar;
}
