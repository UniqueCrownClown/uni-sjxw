import conversion from "@/components/wan-calendar/calendar";

export const saveImage = (url: string) => {
  uni.downloadFile({
    url,
    success(res) {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success() {
            uni.showToast({
              title: "保存成功",
            });
          },
          fail() {
            uni.showToast({
              title: "保存失败",
            });
          },
        });
      }
    },
  });
};

export const formateDate = (date: any, fmt: any) => {
  const o = {
    "y+": date.getFullYear(),
    "m+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "i+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  // 使用 forEach 循环遍历 o 对象的键
  Object.keys(o).forEach((k) => {
    // 构建正则表达式
    const regex = new RegExp(`(${k})`);
    if (regex.test(fmt)) {
      // 使用 match 方法获取匹配结果
      const match = fmt.match(regex);
      if (match) {
        const value = String(o[k as keyof typeof o]);
        // 使用 padStart 方法替代 substr 进行补零操作
        const formattedValue =
          match[1].length === 1 ? value : value.padStart(match[1].length, "0");
        // 替换格式化字符串
        // eslint-disable-next-line no-param-reassign
        fmt = fmt.replace(regex, formattedValue);
      }
    }
  });

  return fmt;
};

export const getDateAfter = (date: Date, num: number) => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + num);
  return formateDate(dateObj, "yyyy-mm-dd");
};

// 重复类型0-唯一 1-每月 2-每年
export type RepeatType = "0" | "1" | "2";

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
export const getTimeDesc = (
  type: RepeatType,
  time: string = "2025-09-08",
  isLunar: boolean = false
): string[] => {
  // 统一设置为中午12点避免时区和夏令时影响
  const now = new Date();
  now.setHours(12, 0, 0, 0);

  let target: Date;

  // 如果是农历日期处理
  if (isLunar) {
    try {
      // 解析农历日期格式 "2025-09-15"
      const [yearStr, monthStr, dayStr] = time.split("-");
      const lunarYear = parseInt(yearStr);
      const lunarMonth = parseInt(monthStr);
      const lunarDay = parseInt(dayStr);

      // 获取当前农历年份
      const nowSolarDate: any = conversion.solar2lunar(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      );
      const currentLunarYear = nowSolarDate.lYear;
      const currentLunarMonth = nowSolarDate.lMonth;
      const currentLunarDay = nowSolarDate.lDay;

      // 目标农历日期对象
      const targetLunar = {
        year: lunarYear,
        month: lunarMonth,
        day: lunarDay,
        isLeap: false, // 默认不是闰月
      };

      // 计算目标公历日期
      let targetSolarDate;

      // 处理重复类型
      if (type === "1") {
        // 每月重复
        // 计算当前农历月份，如果目标日期已过，则计算下个月
        let tempLunarMonth = currentLunarMonth;
        let tempLunarYear = currentLunarYear;

        // 检查当前农历日期是否已过目标日期
        const isCurrentDatePassed =
          currentLunarMonth > lunarMonth ||
          (currentLunarMonth === lunarMonth && currentLunarDay > lunarDay);

        if (isCurrentDatePassed) {
          tempLunarMonth += 1;
          if (tempLunarMonth > 12) {
            tempLunarMonth = 1;
            tempLunarYear += 1;
          }
        } else {
          tempLunarMonth = lunarMonth;
        }

        // 转换为公历日期
        targetSolarDate = conversion.lunar2solar(
          tempLunarYear,
          tempLunarMonth,
          lunarDay,
          targetLunar.isLeap
        );
      } else if (type === "2") {
        // 每年重复
        // 计算目标农历年份
        let tempLunarYear = currentLunarYear;

        // 检查当前农历日期是否已过目标日期
        const isCurrentDatePassed =
          currentLunarYear > lunarYear ||
          (currentLunarYear === lunarYear && currentLunarMonth > lunarMonth) ||
          (currentLunarYear === lunarYear &&
            currentLunarMonth === lunarMonth &&
            currentLunarDay > lunarDay);

        if (isCurrentDatePassed) {
          tempLunarYear += 1;
        } else {
          tempLunarYear = lunarYear;
        }

        // 转换为公历日期
        targetSolarDate = conversion.lunar2solar(
          tempLunarYear,
          lunarMonth,
          lunarDay,
          targetLunar.isLeap
        );
      } else {
        // 唯一日期
        targetSolarDate = conversion.lunar2solar(
          lunarYear,
          lunarMonth,
          lunarDay,
          targetLunar.isLeap
        );
      }

      // 验证转换结果
      if (!targetSolarDate || targetSolarDate === -1) {
        throw new Error("农历日期转换失败");
      }

      // 创建目标日期对象
      target = new Date(
        `${targetSolarDate.cYear}-${targetSolarDate.cMonth}-${targetSolarDate.cDay}`
      );
      target.setHours(12, 0, 0, 0);
    } catch (error) {
      console.error("农历日期处理错误:", error);
      // 出错时使用原日期作为备选
      target = new Date(time);
      target.setHours(12, 0, 0, 0);
    }
  } else {
    // 原有公历逻辑
    // 验证日期格式是否有效
    const parseDate = (dateStr: string): Date | null => {
      const date = new Date(dateStr);
      return Number.isNaN(date.getTime()) ? null : date;
    };

    const targetDate = parseDate(time);
    if (!targetDate) {
      throw new Error("日期无效");
    }

    target = new Date(targetDate);
    target.setHours(12, 0, 0, 0);

    // 处理重复类型
    if (type !== "0") {
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      // 每月重复
      if (type === "1") {
        // 计算需要偏移的月份数
        let offsetMonths = 0;
        if (target < now) {
          // 目标日期在当前日期之前，计算需要多少个月才能超过当前日期
          const targetDay = target.getDate();
          const tempDate = new Date(currentYear, currentMonth, targetDay);
          tempDate.setHours(12, 0, 0, 0);

          offsetMonths = tempDate < now ? 1 : 0;
        }

        target.setFullYear(currentYear, currentMonth + offsetMonths);

        // 处理月末日期溢出问题（如3月31日转到4月30日）
        if (target.getDate() !== targetDate.getDate()) {
          target.setDate(0); // 设置为当月最后一天
        }
      }

      // 每年重复
      if (type === "2") {
        // 计算年份偏移
        const offsetYears = target < now ? 1 : 0;
        target.setFullYear(currentYear + offsetYears);

        // 处理闰年2月29日特殊情况
        if (targetDate.getMonth() === 1 && targetDate.getDate() === 29) {
          if (!isLeapYear(target.getFullYear())) {
            target.setDate(28);
          }
        }
      }
    }
  }

  // 计算天数差（使用Math.floor避免四舍五入误差）
  const diffMs = target.getTime() - now.getTime();
  const days = Math.floor(diffMs / (1000 * 3600 * 24));

  // 返回格式化结果
  if (days > 0) return ["剩", days.toString(), "天"];
  if (days < 0) return ["已", (-days).toString(), "天"];
  return ["", "今天", ""];
};
