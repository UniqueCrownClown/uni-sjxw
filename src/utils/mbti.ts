// MBTI测试题目数据
export const questions = [
  // E vs I 外向/内向 (23题)
  {
    text: "在社交场合中，我通常：",
    dimension: "EI",
    options: [
      "非常主动地与他人交谈，是活跃的中心",
      "积极主动地与他人交谈",
      "比较愿意与他人交谈",
      "偶尔会与他人交谈",
      "较少主动与他人交谈",
      "几乎不主动与他人交谈",
    ],
  },
  {
    text: "与陌生人相处时，我：",
    dimension: "EI",
    options: [
      "非常自在，能迅速建立关系",
      "感觉比较自在",
      "稍微有些自在",
      "稍微需要一些时间适应",
      "需要较长时间适应",
      "需要很长时间才能适应",
    ],
  },
  {
    text: "在团体活动中，我倾向于：",
    dimension: "EI",
    options: [
      "总是积极参与并引导讨论",
      "经常积极参与讨论",
      "适度参与讨论",
      "偶尔参与讨论",
      "更多时候保持安静",
      "几乎只是倾听",
    ],
  },
  {
    text: "休息时，我更喜欢：",
    dimension: "EI",
    options: ["和朋友一起", "独处"],
  },
  {
    text: "在工作中，我更倾向于：",
    dimension: "EI",
    options: ["与他人合作", "独立完成"],
  },
  {
    text: "面对新环境时，我会：",
    dimension: "EI",
    options: ["迅速融入", "需要时间适应"],
  },
  {
    text: "在聚会中，我通常：",
    dimension: "EI",
    options: ["认识很多新朋友", "与熟悉的人交谈"],
  },
  {
    text: "我更喜欢的工作环境是：",
    dimension: "EI",
    options: ["开放式办公", "独立办公室"],
  },
  {
    text: "遇到问题时，我倾向于：",
    dimension: "EI",
    options: ["与他人讨论", "自己思考"],
  },
  {
    text: "在团队中，我通常：",
    dimension: "EI",
    options: ["经常发表意见", "仔细考虑后再发言"],
  },
  {
    text: "我更喜欢的休闲方式是：",
    dimension: "EI",
    options: ["参加社交活动", "独处放松"],
  },
  {
    text: "在会议中，我倾向于：",
    dimension: "EI",
    options: ["积极发言", "认真记录"],
  },
  {
    text: "处理问题时，我习惯：",
    dimension: "EI",
    options: ["寻求他人建议", "独立思考"],
  },
  {
    text: "面对新项目，我会：",
    dimension: "EI",
    options: ["与团队讨论", "先自行规划"],
  },
  {
    text: "工作中遇到困难，我会：",
    dimension: "EI",
    options: ["立即寻求帮助", "尝试自己解决"],
  },
  {
    text: "在团体活动中，我感到：",
    dimension: "EI",
    options: ["精力充沛", "容易疲惫"],
  },
  {
    text: "我更擅长：",
    dimension: "EI",
    options: ["建立人际关系", "深入思考问题"],
  },
  {
    text: "在陌生环境中，我会：",
    dimension: "EI",
    options: ["主动结识新朋友", "观察周围环境"],
  },
  {
    text: "我更喜欢的学习方式是：",
    dimension: "EI",
    options: ["小组讨论", "独自学习"],
  },
  {
    text: "面对新机会，我会：",
    dimension: "EI",
    options: ["立即尝试", "仔细考虑"],
  },
  {
    text: "我在工作中更注重：",
    dimension: "EI",
    options: ["团队协作", "个人贡献"],
  },
  {
    text: "处理压力时，我倾向于：",
    dimension: "EI",
    options: ["与他人交流", "独自调节"],
  },
  {
    text: "我更喜欢的生活节奏是：",
    dimension: "EI",
    options: ["充满社交活动", "平静安宁"],
  },

  // S vs N 感知/直觉 (24题)
  {
    text: "在工作中，我更关注：",
    dimension: "SN",
    options: ["具体细节", "整体概念"],
  },
  {
    text: "解决问题时，我依靠：",
    dimension: "SN",
    options: ["实际经验", "直觉判断"],
  },
  {
    text: "我更相信：",
    dimension: "SN",
    options: ["已证实的事实", "未来的可能"],
  },
  {
    text: "在项目中，我更注重：",
    dimension: "SN",
    options: ["执行细节", "创新思路"],
  },
  {
    text: "我更喜欢处理：",
    dimension: "SN",
    options: ["具体问题", "抽象概念"],
  },
  {
    text: "做决定时，我依据：",
    dimension: "SN",
    options: ["现有数据", "未来趋势"],
  },
  {
    text: "我更看重：",
    dimension: "SN",
    options: ["实际应用", "理论创新"],
  },
  {
    text: "在学习时，我更喜欢：",
    dimension: "SN",
    options: ["循序渐进", "跳跃思考"],
  },
  {
    text: "我更倾向于：",
    dimension: "SN",
    options: ["保持现状", "寻求改变"],
  },
  {
    text: "我更相信：",
    dimension: "SN",
    options: ["亲身体验", "直觉感受"],
  },
  {
    text: "我更喜欢关注：",
    dimension: "SN",
    options: ["当下实际", "未来可能"],
  },
  {
    text: "工作中，我更擅长：",
    dimension: "SN",
    options: ["执行计划", "制定策略"],
  },
  {
    text: "我更喜欢的工作是：",
    dimension: "SN",
    options: ["有明确流程的", "需要创新的"],
  },
  {
    text: "我更容易记住：",
    dimension: "SN",
    options: ["具体细节", "整体印象"],
  },
  {
    text: "我更喜欢的领导是：",
    dimension: "SN",
    options: ["实干型的", "有远见的"],
  },
  {
    text: "我更看重：",
    dimension: "SN",
    options: ["实际效果", "创新想法"],
  },
  {
    text: "在团队中，我更擅长：",
    dimension: "SN",
    options: ["执行任务", "提供想法"],
  },
  {
    text: "我更喜欢的工作环境是：",
    dimension: "SN",
    options: ["稳定有序的", "充满变化的"],
  },
  {
    text: "我更擅长处理：",
    dimension: "SN",
    options: ["现实问题", "未来规划"],
  },
  {
    text: "在决策时，我更看重：",
    dimension: "SN",
    options: ["实际可行性", "创新可能性"],
  },
  {
    text: "我更喜欢的项目是：",
    dimension: "SN",
    options: ["明确具体的", "开放创新的"],
  },
  {
    text: "我对工作的要求是：",
    dimension: "SN",
    options: ["准确可靠", "富有创意"],
  },
  {
    text: "我更倾向于：",
    dimension: "SN",
    options: ["按计划执行", "随机应变"],
  },
  {
    text: "我更重视：",
    dimension: "SN",
    options: ["实践经验", "创新思维"],
  },

  // T vs F 思考/情感 (24题)
  {
    text: "做决定时，我更依赖：",
    dimension: "TF",
    options: ["逻辑分析", "个人感受"],
  },
  {
    text: "我认为更重要的是：",
    dimension: "TF",
    options: ["公平公正", "关心他人"],
  },
  {
    text: "在冲突中，我倾向于：",
    dimension: "TF",
    options: ["寻找事实", "考虑感受"],
  },
  {
    text: "评价他人时，我更看重：",
    dimension: "TF",
    options: ["能力水平", "为人品德"],
  },
  {
    text: "我更容易被打动的是：",
    dimension: "TF",
    options: ["有力论据", "真挚情感"],
  },
  {
    text: "处理问题时，我更强调：",
    dimension: "TF",
    options: ["客观分析", "价值认同"],
  },
  {
    text: "我更欣赏的是：",
    dimension: "TF",
    options: ["清晰思维", "真诚关怀"],
  },
  {
    text: "做选择时，我更依靠：",
    dimension: "TF",
    options: ["理性判断", "内心感受"],
  },
  {
    text: "我更看重：",
    dimension: "TF",
    options: ["公平正义", "人情关系"],
  },
  {
    text: "我更倾向于：",
    dimension: "TF",
    options: ["实事求是", "考虑他人"],
  },
  {
    text: "我认为更有说服力的是：",
    dimension: "TF",
    options: ["数据分析", "个人经历"],
  },
  {
    text: "在团队中，我更注重：",
    dimension: "TF",
    options: ["目标达成", "团队和谐"],
  },
  {
    text: "我更愿意：",
    dimension: "TF",
    options: ["直言不讳", "委婉表达"],
  },
  {
    text: "我更看重：",
    dimension: "TF",
    options: ["效率", "氛围"],
  },
  {
    text: "我更倾向于：",
    dimension: "TF",
    options: ["坚持原则", "灵活变通"],
  },
  {
    text: "我更重视：",
    dimension: "TF",
    options: ["真实", "和谐"],
  },
  {
    text: "我更擅长：",
    dimension: "TF",
    options: ["分析问题", "理解他人"],
  },
  {
    text: "我更看重：",
    dimension: "TF",
    options: ["专业能力", "人际关系"],
  },
  {
    text: "我更倾向于：",
    dimension: "TF",
    options: ["追求真相", "维护关系"],
  },
  {
    text: "我更看重：",
    dimension: "TF",
    options: ["公平", "善意"],
  },
  {
    text: "我更愿意：",
    dimension: "TF",
    options: ["直面问题", "照顾感受"],
  },
  {
    text: "我更看重：",
    dimension: "TF",
    options: ["事实", "情感"],
  },
  {
    text: "我更倾向于：",
    dimension: "TF",
    options: ["理性分析", "感性判断"],
  },
  {
    text: "我更重视：",
    dimension: "TF",
    options: ["客观标准", "个人价值"],
  },

  // J vs P 判断/知觉 (22题)
  {
    text: "我更喜欢：",
    dimension: "JP",
    options: ["按计划行事", "随机应变"],
  },
  {
    text: "我的工作方式是：",
    dimension: "JP",
    options: ["有条不紊", "灵活多变"],
  },
  {
    text: "我更倾向于：",
    dimension: "JP",
    options: ["提前准备", "临场发挥"],
  },
  {
    text: "我更喜欢：",
    dimension: "JP",
    options: ["确定的事", "未知的事"],
  },
  {
    text: "我的生活是：",
    dimension: "JP",
    options: ["规律有序", "随性自由"],
  },
  {
    text: "我更看重：",
    dimension: "JP",
    options: ["按时完成", "完美结果"],
  },
  {
    text: "我更喜欢：",
    dimension: "JP",
    options: ["固定计划", "即兴安排"],
  },
  {
    text: "我更倾向于：",
    dimension: "JP",
    options: ["按部就班", "随机应变"],
  },
  {
    text: "我的工作区域：",
    dimension: "JP",
    options: ["整齐有序", "创意混搭"],
  },
  {
    text: "我更喜欢：",
    dimension: "JP",
    options: ["明确目标", "探索可能"],
  },
  {
    text: "我更倾向于：",
    dimension: "JP",
    options: ["及时完成", "追求完美"],
  },
  {
    text: "我的决定通常：",
    dimension: "JP",
    options: ["快速明确", "保持开放"],
  },
  {
    text: "我更喜欢：",
    dimension: "JP",
    options: ["按计划进行", "随性发展"],
  },
  {
    text: "我更看重：",
    dimension: "JP",
    options: ["结果", "过程"],
  },
  {
    text: "我更倾向于：",
    dimension: "JP",
    options: ["按时交付", "持续改进"],
  },
  {
    text: "我的行事风格是：",
    dimension: "JP",
    options: ["有计划的", "随性的"],
  },
  {
    text: "我更喜欢：",
    dimension: "JP",
    options: ["确定性", "可能性"],
  },
  {
    text: "我的工作方式是：",
    dimension: "JP",
    options: ["循序渐进", "跳跃思考"],
  },
  {
    text: "我更倾向于：",
    dimension: "JP",
    options: ["按规矩办事", "灵活处理"],
  },
  {
    text: "我更喜欢：",
    dimension: "JP",
    options: ["明确截止日期", "弹性完成时间"],
  },
  {
    text: "我的生活节奏是：",
    dimension: "JP",
    options: ["规律的", "自由的"],
  },
  {
    text: "我更看重：",
    dimension: "JP",
    options: ["完成", "完美"],
  },
];

// MBTI性格类型数据
export const personalityTypes: Record<
  string,
  {
    description: string;
    strengths: string[];
    weaknesses: string[];
    careers: string[];
  }
> = {
  ISTJ: {
    description:
      "严谨、负责、实际的完美主义者。注重传统和秩序，追求稳定和可靠。",
    strengths: ["组织能力强", "注重细节", "可靠负责", "逻辑思维清晰"],
    weaknesses: ["过于严格", "不够灵活", "难以接受变化", "可能忽视他人感受"],
    careers: ["会计师", "项目经理", "质量检验员", "系统分析师", "军警人员"],
  },
  ISFJ: {
    description: "温和、细心、负责任的守护者。关心他人需求，重视和谐与稳定。",
    strengths: ["有同理心", "注重细节", "有责任心", "乐于助人"],
    weaknesses: ["不善于说不", "过分自我牺牲", "不擅长应对变化", "过度担忧"],
    careers: ["护士", "教师", "行政助理", "社工", "客户服务"],
  },
  INFJ: {
    description:
      "富有洞察力、理想主义的引导者。追求意义，致力于实现更美好的未来。",
    strengths: ["有远见", "富有同情心", "善于倾听", "追求完美"],
    weaknesses: ["过于理想化", "容易精疲力竭", "完美主义倾向", "难以放手"],
    careers: ["心理咨询师", "作家", "人力资源专员", "教育工作者", "艺术治疗师"],
  },
  INTJ: {
    description: "独立、创新的战略家。善于制定系统性解决方案，追求持续改进。",
    strengths: ["战略思维", "独立自主", "追求知识", "高效执行"],
    weaknesses: ["过于完美主义", "显得高傲", "不耐烦", "忽视情感需求"],
    careers: ["战略分析师", "科学家", "工程师", "建筑师", "投资顾问"],
  },
  ISTP: {
    description:
      "灵活、冷静的问题解决者。善于理解系统运作原理，追求效率与实用。",
    strengths: ["灵活应变", "实践能力强", "冷静理性", "善于解决问题"],
    weaknesses: ["容易感到无聊", "不喜欢承诺", "可能显得冷漠", "难以表达情感"],
    careers: ["技术专家", "工程师", "法医", "程序员", "机械师"],
  },
  ISFP: {
    description: "温和、敏感的艺术家。享受当下，追求自由与美的体验。",
    strengths: ["艺术感知力", "同理心强", "适应力强", "注重和谐"],
    weaknesses: ["不善规划", "难以做决定", "过度谦虚", "容易受伤"],
    careers: ["艺术家", "设计师", "摄影师", "美容师", "兽医"],
  },
  INFP: {
    description: "理想主义的治愈者。重视个人价值观，追求真实与和谐。",
    strengths: ["富有创意", "同理心强", "适应力强", "重视价值观"],
    weaknesses: ["过于理想化", "自我要求高", "难以接受批评", "组织能力弱"],
    careers: ["作家", "心理咨询师", "艺术家", "教师", "社工"],
  },
  INTP: {
    description: "创新、逻辑的思想家。善于发现规律，追求知识与理解。",
    strengths: ["分析能力强", "创造性思维", "追求真理", "独立思考"],
    weaknesses: ["过于理论化", "容易分心", "不擅社交", "可能忽视细节"],
    careers: ["研究员", "程序员", "数据分析师", "建筑师", "大学教授"],
  },
  ESTP: {
    description: "活力充沛的冒险家。善于解决实际问题，享受刺激与挑战。",
    strengths: ["行动力强", "解决问题能力强", "适应力强", "现实主义"],
    weaknesses: ["容易冲动", "不喜欢规划", "可能忽视他人感受", "难以长期专注"],
    careers: ["企业家", "销售", "运动员", "警察", "金融交易员"],
  },
  ESFP: {
    description: "热情、活力的表演者。享受生活，善于带给他人快乐。",
    strengths: ["乐观开朗", "善于社交", "实践能力强", "适应力强"],
    weaknesses: ["容易分心", "不善规划", "难以做决定", "可能过度依赖他人"],
    careers: ["演员", "销售", "活动策划", "导游", "公关"],
  },
  ENFP: {
    description: "热情、创新的激励者。善于发现可能性，激发他人潜能。",
    strengths: ["创造力强", "同理心强", "适应力强", "善于沟通"],
    weaknesses: ["注意力分散", "难以做决定", "情绪化", "难以完成细节"],
    careers: ["创意总监", "记者", "市场营销", "培训师", "创业者"],
  },
  ENTP: {
    description: "机智、创新的思想家。善于发现机会，享受智力挑战。",
    strengths: ["创新能力强", "适应力强", "分析能力强", "善于辩论"],
    weaknesses: ["不够持久", "容易分心", "可能过于好辩", "难以完成细节"],
    careers: ["企业家", "律师", "发明家", "管理咨询", "创意总监"],
  },
  ESTJ: {
    description: "务实、负责的组织者。善于制定和执行计划，追求效率与结果。",
    strengths: ["组织能力强", "领导力强", "务实高效", "注重传统"],
    weaknesses: ["可能过于武断", "不够灵活", "可能忽视感受", "难以接受变化"],
    careers: ["项目经理", "行政主管", "财务总监", "军警指挥官", "法官"],
  },
  ESFJ: {
    description: "友善、负责的协调者。重视和谐与合作，乐于服务他人。",
    strengths: ["人际关系好", "组织能力强", "注重细节", "乐于助人"],
    weaknesses: [
      "过分在意他人看法",
      "难以说不",
      "可能过度操心",
      "不善处理冲突",
    ],
    careers: ["人力资源", "教师", "销售经理", "护士长", "社区工作者"],
  },
  ENFJ: {
    description: "富有魅力的引导者。善于激励他人，致力于促进个人与团队发展。",
    strengths: ["领导能力强", "同理心强", "善于沟通", "富有远见"],
    weaknesses: ["过分理想化", "可能过度操心", "难以说不", "容易情绪化"],
    careers: [
      "培训师",
      "人力资源总监",
      "市场总监",
      "教育工作者",
      "非营利组织负责人",
    ],
  },
  ENTJ: {
    description:
      "果断、有魄力的领导者。善于制定战略和组织资源，追求效率与成功。",
    strengths: ["领导能力强", "战略思维", "决断力强", "追求卓越"],
    weaknesses: ["可能过于专制", "不够体贴", "容易显得专横", "工作狂倾向"],
    careers: ["企业高管", "管理咨询", "创业者", "政治家", "投资银行家"],
  },
};

// MBTI测试核心逻辑
export class MBTITest {
  answers: (number | null)[];
  currentQuestion: number;

  constructor() {
    this.answers = new Array(questions.length).fill(null);
    this.currentQuestion = 0;
    this.loadProgress();
  }

  loadProgress() {
    try {
      const savedProgress = uni.getStorageSync("mbtiProgress");
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        this.answers = progress.answers;
        this.currentQuestion = progress.currentQuestion;
      }
    } catch (e) {
      console.error("加载进度失败:", e);
    }
  }

  saveProgress() {
    try {
      const progress = {
        answers: this.answers,
        currentQuestion: this.currentQuestion,
      };
      uni.setStorageSync("mbtiProgress", JSON.stringify(progress));
    } catch (e) {
      console.error("保存进度失败:", e);
    }
  }

  clearProgress() {
    try {
      uni.removeStorageSync("mbtiProgress");
      this.answers = new Array(questions.length).fill(null);
      this.currentQuestion = 0;
    } catch (e) {
      console.error("清除进度失败:", e);
    }
  }

  setAnswer(questionIndex: number, answer: number) {
    this.answers[questionIndex] = answer;
    this.saveProgress();
  }

  getAnswer(questionIndex: number) {
    return this.answers[questionIndex];
  }

  calculateDimensionScore(dimension: string) {
    let score = 0;
    let total = 0;

    questions.forEach((question, index) => {
      if (question.dimension === dimension && this.answers[index] !== null) {
        total++;
        const answer = this.answers[index] as number;

        if (question.options.length === 6) {
          switch (answer) {
            case 1:
              score += 5;
              break;
            case 2:
              score += 3;
              break;
            case 3:
              score += 1;
              break;
            case 4:
              score -= 1;
              break;
            case 5:
              score -= 3;
              break;
            case 6:
              score -= 5;
              break;
          }
        } else if (question.options.length === 2) {
          score += answer === 1 ? 5 : -5;
        }
      }
    });

    const maxPossibleScore = total * 5;
    let normalizedScore =
      ((score + maxPossibleScore) / (maxPossibleScore * 2)) * 100;

    if (dimension === "EI") {
      normalizedScore = normalizedScore * 0.8 + 10;
    }

    return Math.min(Math.max(normalizedScore, 0), 100);
  }

  calculateType() {
    const scores = {
      E: this.calculateDimensionScore("EI"),
      I: 100 - this.calculateDimensionScore("EI"),
      S: this.calculateDimensionScore("SN"),
      N: 100 - this.calculateDimensionScore("SN"),
      T: this.calculateDimensionScore("TF"),
      F: 100 - this.calculateDimensionScore("TF"),
      J: this.calculateDimensionScore("JP"),
      P: 100 - this.calculateDimensionScore("JP"),
    };

    let type = "";
    type += scores.E > scores.I ? "E" : "I";
    type += scores.S > scores.N ? "S" : "N";
    type += scores.T > scores.F ? "T" : "F";
    type += scores.J > scores.P ? "J" : "P";

    const dimensionScores = {
      EI: { name: "外向-内向", score: scores.E },
      SN: { name: "感知-直觉", score: scores.S },
      TF: { name: "思考-情感", score: scores.T },
      JP: { name: "判断-知觉", score: scores.J },
    };

    return {
      type,
      dimensionScores,
      description: personalityTypes[type]?.description || "正在分析性格特点...",
      strengths: personalityTypes[type]?.strengths || ["正在分析优势..."],
      weaknesses: personalityTypes[type]?.weaknesses || ["正在分析发展方向..."],
      careers: personalityTypes[type]?.careers || ["正在生成职业建议..."],
    };
  }

  isComplete() {
    return this.answers.every((answer) => answer !== null);
  }

  getProgress() {
    const answered = this.answers.filter((answer) => answer !== null).length;
    return (answered / questions.length) * 100;
  }

  saveResults() {
    const results = {
      date: new Date().toISOString(),
      ...this.calculateType(),
    };
    try {
      let history = JSON.parse(uni.getStorageSync("mbtiHistory") || "[]");
      history.push(results);
      uni.setStorageSync("mbtiHistory", JSON.stringify(history));
    } catch (e) {
      console.error("保存结果失败:", e);
    }
    return results;
  }

  getHistory() {
    try {
      return JSON.parse(uni.getStorageSync("mbtiHistory") || "[]");
    } catch (e) {
      console.error("获取历史记录失败:", e);
      return [];
    }
  }
}

// AI分析功能
export class AIAnalyzer {
  personalityTraits: Record<string, string[]>;

  constructor() {
    this.personalityTraits = {
      E: ["外向", "善于社交", "精力充沛", "喜欢表达"],
      I: ["内向", "深思熟虑", "独立思考", "注重内心"],
      S: ["实际", "关注细节", "重视经验", "脚踏实地"],
      N: ["直觉", "重视创新", "关注可能", "富有想象"],
      T: ["理性", "逻辑分析", "客观决策", "追求真理"],
      F: ["感性", "重视情感", "关注和谐", "同理心强"],
      J: ["计划", "有序", "目标导向", "追求确定"],
      P: ["灵活", "适应力强", "开放包容", "享受过程"],
    };
  }

  generatePersonalityAnalysis(mbtiType: string, dimensionScores: any) {
    const traits = this.getTraits(mbtiType);
    const scores = this.normalizeScores(dimensionScores);

    return {
      personalityDescription: this.generateDescription(
        mbtiType,
        traits,
        scores
      ),
      relationships: this.generateRelationships(mbtiType, traits),
      careerAdvice: this.generateCareerAdvice(mbtiType, traits),
      growthAreas: this.generateGrowthAreas(mbtiType, traits),
      challenges: this.generateChallenges(mbtiType, traits),
    };
  }

  getTraits(type: string) {
    return type.split("").map((letter) => this.personalityTraits[letter]);
  }

  normalizeScores(scores: any) {
    return Object.entries(scores).reduce((acc, [key, data]: [string, any]) => {
      acc[key] = Math.round(data.score);
      return acc;
    }, {} as Record<string, number>);
  }

  generateDescription(
    type: string,
    traits: string[][],
    scores: Record<string, number>
  ) {
    const [ei, sn, tf, jp] = traits;
    return `作为${type}型人格，您展现出独特的性格特征组合。在人格倾向上，您${
      scores.EI > 50
        ? "更倾向于" + ei[0]
        : "偏向于" + this.personalityTraits[type[0]][0]
    }（${scores.EI}%），这表现在${ei[1]}和${
      ei[2]
    }方面。\n\n在信息处理方式上，您${
      scores.SN > 50
        ? "更注重" + sn[0]
        : "偏好" + this.personalityTraits[type[1]][0]
    }（${scores.SN}%），体现为${sn[1]}和${
      sn[2]
    }的特点。\n\n在决策方式上，您表现出${
      scores.TF > 50
        ? "明显的" + tf[0]
        : "显著的" + this.personalityTraits[type[2]][0]
    }倾向（${scores.TF}%），这使您在处理问题时${tf[1]}，同时也${
      tf[2]
    }。\n\n在生活方式上，您偏好${
      scores.JP > 50 ? tf[0] : this.personalityTraits[type[3]][0]
    }的方式（${scores.JP}%），表现为${jp[1]}和${jp[2]}的特征。`;
  }

  generateRelationships(type: string, traits: string[][]) {
    return `在人际关系方面，您的${traits[0][0]}特质使您${traits[0][1]}，这让您在社交场合中${traits[0][2]}。您的${traits[2][0]}倾向让您在处理关系时${traits[2][1]}，这有助于建立${traits[2][2]}的人际关系。`;
  }

  generateCareerAdvice(type: string, traits: string[][]) {
    return `基于您的性格特点，建议您在职业发展中重点关注需要${traits[0][1]}和${traits[2][1]}的领域，同时也要注意培养${traits[1][2]}和${traits[3][2]}的能力。`;
  }

  generateGrowthAreas(type: string, traits: string[][]) {
    return `建议您在以下方面继续发展：\n1. 加强${traits[0][2]}的能力\n2. 培养${traits[1][2]}的思维\n3. 发展${traits[2][2]}的特质\n4. 提升${traits[3][2]}的水平`;
  }

  generateChallenges(type: string, traits: string[][]) {
    return `您可能面临的主要挑战：\n1. 在${traits[0][1]}方面的平衡\n2. ${traits[1][1]}与创新的结合\n3. ${traits[2][1]}的适度把握\n4. ${traits[3][1]}的灵活运用`;
  }
}
