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
