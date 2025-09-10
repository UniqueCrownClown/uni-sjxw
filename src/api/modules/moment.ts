export interface Moment {
  name: string;
  time: string;
  type: "0" | "1" | "2"; // 0-不重复 1-月重复 2-年重复
  remind?: boolean;
  toTop?: boolean;
  showDeleteIcon?: boolean;
}
function addMoment(data: Moment) {
  let moments = uni.getStorageSync("myMoments");
  if (moments) {
    moments.push(data);
  } else {
    moments = [data];
  }
  uni.setStorageSync("myMoments", moments);
}

function updateMoment(data: Moment) {
  // 用name做唯一id
  const moments = uni.getStorageSync("myMoments");
  if (moments) {
    const index = moments.findIndex((item: Moment) => item.name === data.name);
    if (index !== -1) {
      moments[index] = data;
    }
  }
  uni.setStorageSync("myMoments", moments);
}

function deleteMoment(data: Moment) {
  let moments = uni.getStorageSync("myMoments");
  if (moments) {
    moments = moments.filter((item: Moment) => item.name !== data.name) || [];
  }
  uni.setStorageSync("myMoments", moments);
}

function getMoments() {
  return uni.getStorageSync("myMoments") || [];
}

export { addMoment, getMoments, updateMoment, deleteMoment };
