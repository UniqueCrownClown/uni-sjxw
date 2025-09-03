// name要保证唯一
export interface Plan {
  name: string;
  startTime: string;
  endTime: string;
  location?: string;
  content: string;
  type: "1" | "2";
  checked: boolean;
  count: number; // 统计打卡次数
}
export interface PlanRecord {
  time: string;
  location?: string;
  content: string;
  planName: string; // 作为索引
}

function getPlans() {
  return uni.getStorageSync("myPlans");
}

function addPlan(plan: Plan) {
  let plans = getPlans();
  if (!plans) {
    uni.setStorageSync("myPlans", [{ ...plan, checked: true }]);
    return;
  }
  // 兼容处理一下plan.checked,保证同时只有一个是true
  if (plan.checked) {
    // 先把其他的checked都设为false
    plans = plans.map((item: Plan) => ({ ...item, checked: false }));
  }
  if (plans.find((item: Plan) => item.name === plan.name)) {
    uni.showToast({
      title: "计划名称已存在",
      icon: "none",
    });
    return;
  }

  plans.push(plan);
  uni.setStorageSync("myPlans", plans);
}

function updatePlan(plan: Plan) {
  const plans = getPlans();
  const index = plans.findIndex((item: Plan) => item.name === plan.name);
  if (index !== -1) {
    plans[index] = plan;
    uni.setStorageSync("myPlans", plans);
  }
}

// 打卡记录
function getRecords() {
  return uni.getStorageSync("myRecords") || [];
}

// 获取计划的打卡记录
function getRecord(planName: string) {
  const records = getRecords();
  return records.filter((item: PlanRecord) => item.planName === planName);
}

// 检查记录是否存在
function isRecordExist(planName: string, time: string) {
  const records = getRecords();
  return records.find(
    (item: PlanRecord) => item.planName === planName && item.time === time
  );
}

// 打卡
function addRecord(record: PlanRecord) {
  if (isRecordExist(record.planName, record.time)) {
    uni.showToast({
      title: "记录已存在",
      icon: "none",
    });
    return;
  }

  const records = getRecords();
  records.push(record);
  uni.setStorageSync("myRecords", records);
}

// 取消打卡
function deleteRecord(planName: string, time: string) {
  const records = getRecords();
  const index = records.findIndex(
    (item: PlanRecord) => item.planName === planName && item.time === time
  );

  if (index !== -1) {
    records.splice(index, 1);
    uni.setStorageSync("myRecords", records);
  }
}

function deletePlan(planName: string) {
  const plans = getPlans();
  const index = plans.findIndex((plan: Plan) => plan.name === planName);
  if (index !== -1) {
    plans.splice(index, 1);
    uni.setStorageSync("myPlans", plans);
  }
  // 把对应的打卡记录也清空?
  getRecord(planName).forEach((item: PlanRecord) => {
    deleteRecord(item.planName, item.time);
  });
}

export interface User {
  nickName: string;
  avatar: string;
}

function setUserInfo(userInfo: User) {
  uni.setStorageSync("userInfo", userInfo);
}

function getUserInfo() {
  return uni.getStorageSync("userInfo");
}

function clearUserInfo() {
  uni.removeStorageSync("userInfo");
}

export {
  addPlan,
  getPlans,
  deletePlan,
  updatePlan,
  getRecords,
  getRecord,
  addRecord,
  deleteRecord,
  isRecordExist,
  setUserInfo,
  getUserInfo,
  clearUserInfo,
};
