import { Question } from "./onepiece";

export const headline = "你是火影忍者里的哪个角色";

export const desc1 =
  "《火影忍者》是日本漫画家岸本齐史的代表作，作品于1999年开始在《周刊少年JUMP》上连载，于2014年11月10日发售的JUMP第50号完结，故事成功地将原本隐藏在黑暗中，用世界上最强大的毅力和最艰辛的努力去做最密不可宣和隐讳残酷的事情的忍者，描绘成了太阳下最值得骄傲最光明无限的职业。在岸本齐史笔下的忍者世界中，每一位年轻的忍者都在开拓着属于自己的忍道。";

export const desc2 =
  "整个故事里，有人相信力量，有人相信精神，有人相信血统，有人相信眼睛，有人相信先天传承，有人相信后天努力。15年的历程，《火影》带给我们太多太多的回忆与感动，若踏上忍者之路，你又会是谁，与谁相伴而行呢？";

export const questions: Question[] = [
  {
    qid: "q1",
    question: "假如你是一个忍者部队的队长，你希望哪个学员加入你的部队？",
    options: [
      {
        text: "学员1：实力A；人品C；潜力B",
        value: 40,
      },
      {
        text: "学员2：实力B；人品B；潜力A",
        value: 41,
      },
      {
        text: "学员3：实力C；人品A；潜力B",
        value: 42,
      },
    ],
  },
  {
    qid: "q2",
    question:
      "在一次任务中，人质与你的同伴同时遭遇危险，但你只能保护其中一人。你选择保护？",
    options: [
      {
        text: "人质",
        value: 11,
      },
      {
        text: "同伴",
        value: 10,
      },
    ],
  },
  {
    qid: "q3",
    question:
      "在你看来，忍者最重要的品质是？",
    options: [
      {
        text: "勇敢",
        value: 10,
      },
      {
        text: "忠诚",
        value: 10,
      },
      {
        text: "冷静",
        value: 11,
      },
      {
        text: "聪慧",
        value: 11,
      },
    ],
  },
  {
    qid: "q4",
    question: "如果只能携带一种符咒在战斗中使用，你的选择是？",
    options: [
      {
        text: "引爆符：具有爆炸的能力",
        value: 40,
      },
      {
        text: "结界符：具有封闭空间的能力",
        value: 42,
      },
      {
        text: "封印符：具有束缚的能力",
        value: 41,
      },
    ],
  },
  {
    qid: "q5",
    question: "假如你是一个刚刚毕业的下忍，你想去完成哪个任务？",
    options: [
      {
        text: "讨伐猛兽",
        value: 20,
      },
      {
        text: "保护人质",
        value: 20,
      },
      {
        text: "调查忍者的品行",
        value: 21,
      },
      {
        text: "调查物品下落",
        value: 21,
      },
    ],
  },
  {
    qid: "q6",
    question:
      "对你而言，忍道中的哪一条要求更难做到？",
    options: [
      {
        text: "严格要求自己，保持修行状态",
        value: 1,
      },
      {
        text: "与同伴一起成长，互相支持和帮助",
        value: 0,
      },
    ],
  },
  {
    qid: "q7",
    question: "你更希望得到他人的：",
    options: [
      {
        text: "尊敬和听从",
        value: 30,
      },
      {
        text: "信任和喜爱",
        value: 31,
      },
    ],
  },
  {
    qid: "q8",
    question:
      "假如要与同伴进行「谁坚持的更久」比赛，你会选择？",
    options: [
      {
        text: "不说话的时间",
        value: 0,
      },
      {
        text: "不出门的时间",
        value: 1,
      },
      {
        text: "不吃甜食的时间",
        value: 1,
      },
      {
        text: "不睡觉的时间",
        value: 0,
      },
    ],
  },
  {
    qid: "q9",
    question: "忍界大战即将开始！你更想加入哪一个部队？",
    options: [
      {
        text: "情报部队",
        value: 10,
      },
      {
        text: "主力作战部队",
        value: 11,
      },
      {
        text: "潜入侦查部队",
        value: 11,
      },
      {
        text: "医疗后勤部队",
        value: 10,
      },
    ],
  },
  {
    qid: "q10",
    question: "你出色的完成了任务，面对奖励，你会选择？",
    options: [
      {
        text: "一瓶能够起死回生的药",
        value: 42,
      },
      {
        text: "成为你景仰已久忍者的学生",
        value: 41,
      },
      {
        text: "足够逍遥生活一年的报酬",
        value: 40,
      },
    ],
  },
  {
    qid: "q11",
    question:
      "如果你有潜力成为在某些方面具有独特才能的「特别上忍」，你想选择哪一个领域？",
    options: [
      {
        text: "教育",
        value: 21,
      },
      {
        text: "研发",
        value: 20,
      },
      {
        text: "封印",
        value: 21,
      },
      {
        text: "体术",
        value: 20,
      },
    ],
  },
  {
    qid: "q12",
    question: "你更期待的生活方式是：",
    options: [
      {
        text: "自由安逸；活出自我",
        value: 31,
      },
      {
        text: "肩负责任；砥砺前行",
        value: 30,
      },
    ],
  },
  {
    qid: "q13",
    question:
      "你更害怕得到的评价是？",
    options: [
      {
        text: "鲁莽无脑",
        value: 30,
      },
      {
        text: "特立独行",
        value: 30,
      },
      {
        text: "城府深沉",
        value: 31,
      },
      {
        text: "胆小懦弱",
        value: 31,
      },
    ],
  },
  {
    qid: "q14",
    question: "你为同伴精心准备了一道菜，但他却连碰都不碰一下，你觉得原因是？",
    options: [
      {
        text: "自己厨艺不佳，没发挥好",
        value: 1,
      },
      {
        text: "他心情不好，吃不下饭",
        value: 0,
      },
      {
        text: "你们之间有你不知情的误会和矛盾",
        value: 0,
      },
      {
        text: "他正在跟自己开玩笑",
        value: 1,
      },
    ],
  },
  {
    qid: "q15",
    question:
      "宝箱里有四瓶神奇药水，你可以选择一瓶或多瓶喝下去，你的选择是？（如果你不想喝任何一瓶药水，请不做选择直接点击得出结果）",
    options: [
      {
        text: "在梦境中穿梭到任意想去的地方，却永远也醒不来",
        value: 21,
      },
      {
        text: "拥有不老的容颜和身材，失去爱他人的能力",
        value: 21,
      },
      {
        text: "能够飞行和隐身，但永远不能落在地面",
        value: 20,
      },
      {
        text: "成为万众瞩目的传奇忍者，但每个夜晚会变成野兽",
        value: 20,
      },
    ],
  },
];

interface Character {
  name: string;
  attr1: number;
  attr2: number;
  attr3: number;
  attr4: number;
  attr5: number;
  title: string;
  birthday: string;
  bloodType: string;
  chakra: string;
  hometown: string;
  catchphrase: string;
  introduction: string;
  personalityMatch: string;
  colorCode: string;
  imageUrl: string;
}

export const characters: Array<Character> = [
  {
    name: "春野樱",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 0,
    attr5: 1,
    title: "上忍/木叶高层",
    birthday: "3月28日",
    bloodType: "O",
    hometown: "木叶忍者村",
    chakra: "水、土、阴、阳",
    catchphrase: "请你们...这次就好好的看著...我的背影吧！",
    introduction:
      "春野樱，新一代医疗忍者，第五代火影纲手的弟子，与漩涡鸣人、宇智波佐助隶属于旗木卡卡西领导的第七班。精通医疗忍术，在忍者学校中学习的非常刻苦，同时也在忍术修行方面不断努力，与同伴们之间的关系也非常紧密。童年时，樱比较自卑，和不取笑自己的山中井野是好朋友。第四次忍界大战落幕多年后，小樱和佐助结为夫妻，并育有一女宇智波纱罗妲。",
    personalityMatch:
      "你和春野樱的性格有相似之处。你有一颗单纯、善良的心，敢爱敢恨、敢做敢为，有很强的自我意识，能为了心中的理想不断奋斗。当和朋友们在一起时，你总展现出关怀的一面，乐于倾听和奉献。但当你独自承受着压力，或是心情跌落低谷时，你往往会独自消化，将痛苦掩藏在笑容里，而这笑容背后，却是你的独自忍耐和自我调节。你坚强的像是一个超人，关心着身边每个人却常常忘记心疼自己。",
    colorCode: "f38583",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/1.png",
  },
  {
    name: "日向雏田",
    attr1: 0,
    attr2: 0,
    attr3: 1,
    attr4: 0,
    attr5: 1,
    title: "中忍",
    birthday: "12月27日",
    bloodType: "A",
    hometown: "木叶忍者村",
    chakra: "雷、火",
    catchphrase: "我永远不会食言......因为那也是我的忍道，我的忍者之道！",
    introduction:
      "日向雏田，日向宗家的白眼公主，是日向一族秘术的正宗继承人，但因为曾被小她五岁的妹妹日向花火打败，导致父亲对雏田很失望，因此雏田表现为一个缺乏自信且容易放弃的人。雏田从忍者学校毕业后，加入了夕日红带领的“第八班”，为了保护同伴和家族，雏田不断提高自己的修行水平和忍术技能。后与漩涡鸣人结婚。",
    personalityMatch:
      "你的性格和日向雏田有相似之处。你心地善良、善解人意，乐于倾听他人的观点，容易与人和谐相处，很少与他人发生争执，也很有责任感。有时，你也会出现缺乏安全感的情况，不太擅长与陌生人交往，会表现得比较拘谨。但是，在你的心中也有着坚定的想要守护的东西，在维护心爱的人和物的时候非常勇敢，并愿意为之倾尽所有。",
    colorCode: "ff8c0a",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/2.png",
  },
  {
    name: "照美冥",
    attr1: 0,
    attr2: 1,
    attr3: 1,
    attr4: 1,
    attr5: 1,
    title: "水影",
    birthday: "5月21日",
    bloodType: "AB",
    hometown: "雾忍者村",
    chakra: "火、雷、土、水",
    catchphrase: "大人......我发誓以我作为水影的名誉，我会履行我的职责。",
    introduction:
      "照美冥，美貌型女忍者，水之国·雾忍者村的第五代水影，擅长使用水遁忍术，结束了雾忍在第四代水影执政以来“血雾之村”的恐怖时期，实行和平开放的政策，因而使雾忍者村复兴。面上总是带著一抹浅笑，性格可刚可柔，成熟、端庄，偶尔会发小脾气。由于她错过了婚期，所以在她面前提起结婚有关的字眼是禁忌。",
    personalityMatch:
      "在部分性格方面，你和照美冥相似。你往往表现出沉着、冷静、理性的一面，具有强大的分析和推理能力，对自己的判断和选择非常有信心，看待事物有独特的见解，也会非常专注于自己的目标和理想。人际关系方面，你公正、独立，不太喜欢依赖他人，更追求精神层面的共鸣，因此不会陷于幻想之中，也很难被他人欺骗。",
    colorCode: "ff6600",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/3.png",
  },
  {
    name: "小南",
    attr1: 0,
    attr2: 0,
    attr3: 1,
    attr4: 0,
    attr5: 2,
    title: "S级叛忍",
    birthday: "2月20日",
    bloodType: "O",
    hometown: "雨忍者村",
    chakra: "风、水、土、阳",
    catchphrase: "这次......我希望对你来说这些会是永不死去的希望之花。",
    introduction:
      "小南，“晓”中唯一的女性成员，也是“晓”组织的创立者之一，被称为“天使”。她是第二次忍界大战时雨忍者村的孤儿，幼年时期的小南喜欢折纸，是一个容易和人亲近的少女。性格冷静、沉稳、聪明，在饱受战争的摧残和挚友的逝去后内心逐渐变得冷酷，但仍然坚定自己对和平的信念追求。",
    personalityMatch:
      "在部分性格方面，你和小南有相似之处。如同一杯清茶一般，你有着令人羡慕的独特气质。富有智慧、谦虚谨慎，不喜欢制造麻烦，也不惹是生非，很少与他人计较。你对未来抱有无限的期待，但有时也会陷入悲观的情绪中。你的内心渴望被人关心和爱护，希望有一个理解自己的人能一起携手到老。",
    colorCode: "585cfc",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/4.png",
  },
  {
    name: "天天",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 1,
    attr5: 0,
    title: "中忍",
    birthday: "3月9日",
    bloodType: "B",
    hometown: "木叶忍者村",
    chakra: "风",
    catchphrase: "我想成为一名伟大而强大的忍者！追随传奇女忍者纲手的脚步！",
    introduction:
      "天天，火之国木叶忍者村的上忍，由迈特·凯所领导的第三班成员。擅长使用体术与操控“忍具”攻击，精通时空间忍术，可随时从卷轴中通灵出各种各样的忍具和道具，招式名中隐含“龙”。性格开朗活泼，喜爱研究，有着非常强烈的正义感，专注于自己的修行，目标是成为像“传说中的三忍”—纲手那样强悍的女忍者。",
    personalityMatch:
      "你的性格和天天有相似之处。你你热情随和、潇洒大方，有强烈的正义感，富有想象力和创意，对音乐、色彩、动作的感觉都极其敏锐。同时，「挑战」对你而言并不是可怕的因素，反而是推动你前进的动力，面对困难和挑战时，你不会轻易退缩，而是勇往直前。",
    colorCode: "fe2e5f",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/5.png",
  },
  {
    name: "山中井野",
    attr1: 0,
    attr2: 1,
    attr3: 1,
    attr4: 0,
    attr5: 1,
    title: "中忍",
    birthday: "9月23日",
    bloodType: "B",
    hometown: "木叶忍者村",
    chakra: "土、水、阴、阳",
    catchphrase:
      "他们对我来说同样重要，也是我想做的事情。这就是为什么我希望你也要做你想做的事，不要担心任何事情！",
    introduction:
      "山中井野，火之国·木叶忍者村的忍者，阿斯玛所领导的第十班的成员，在同届生中，井野表现优秀。作为山中一族花店店主的女儿，井野掌握了花艺，同时也精通家族忍术。井野忠诚、坚定、高傲，为了维护村子和忍者的利益不断努力，第四次忍界大战中作为忍者联军第五部队的一员。忍界大战结束若干年后，与佐井结婚并育有一子山中井阵。",
    personalityMatch:
      "在部分性格方面，你和山中井野相似。你具有很高的人格魅力，有领袖气质，且对自己坚持的东西非常忠诚。即便面对极端的情况，你也能保持冷静，注重条理和规则，并且具有强大的判断力和分析能力，能够在重要的时刻做出正确的决策。",
    colorCode: "00acfa",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/6.png",
  },
  {
    name: "漩涡鸣人",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 1,
    title: "第七代火影",
    birthday: "10月10日",
    bloodType: "B",
    hometown: "木叶忍者村",
    chakra: "火、风、雷、土、水、阳",
    catchphrase: "我未来的梦想是成为最伟大的火影！",
    introduction:
      "漩涡鸣人，火之国木叶忍者村的忍者，第四代火影波风水门和漩涡玖辛奈之子，刚出生时父母为保护村子而牺牲，成为孤儿的鸣人从小被村民歧视，成为忍者后，和旗木卡卡西、宇智波佐助以及春野樱组成第七班进行各种任务。性格乐观、坚强、热血、豪迈，在成为忍者的过程中经历了很多挑战和磨练在第四次忍界大战中跟宇智波佐助和春野樱被称为新的三忍，后为木叶忍者村的第七代火影。",
    personalityMatch:
      "你的身上有着漩涡鸣人的影子。你乐观、坚强，有强烈的正义感和责任感，无论面对任何困难和挫折都能保持积极的态度和勇敢的心态。但遇到他人无法解决的难题时，你并不会退缩，而是充满激情地挑战它。除此之外，你还有着很强的同理心，乐于帮助他人，能够关注到他人的情感和痛苦，因此，很值得依赖。",
    colorCode: "db667f",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/7.png",
  },
  {
    name: "宇智波佐助",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 1,
    attr5: 1,
    title: "火影辅佐/木叶高层",
    birthday: "7月23日",
    bloodType: "AB",
    hometown: "木叶忍者村",
    chakra: "雷、火、阴",
    catchphrase: "忍者的灵魂仍然是相同的，即使是你的孩子。",
    introduction:
      "宇智波佐助，宇智波一族的天才忍者，六道仙人长子因陀罗的查克拉转世者，木叶忍者村由老师卡卡西带领的第七小队成员。年幼时因目睹宇智波一族被哥哥宇智波鼬所歼灭，背负复仇的使命佐助想要得到强大的力量一心要对宇治波鼬复仇。最终佐助被鸣人感化，认同了鸣人的道路，终于回归木叶，并重新成为木叶的一员。",
    personalityMatch:
      "就部分性格而言，你和宇智波佐助有相似之处。你聪明、敏锐、内敛，善于分析和思考，具有很强的个人原则和行事风格，有着批判性思维，能够透过现象看本质，在面对挑战时不会有任何的犹豫。与此同时，你很重视「个人目标」，一旦明确方向，你会坚定地追求自己的理想。",
    colorCode: "2b9afc",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/8.png",
  },
  {
    name: "旗木卡卡西",
    attr1: 1,
    attr2: 1,
    attr3: 1,
    attr4: 1,
    attr5: 2,
    title: "第六代火影",
    birthday: "9月15日",
    bloodType: "O",
    hometown: "木叶忍者村",
    chakra: "风、雷、水、火、土、阴、阳",
    catchphrase: "下一代总是会超过上一代。这是生活中永无止境的循环之一。",
    introduction:
      "旗木卡卡西，第四代火影波风水门的弟子，第七班队长，漩涡鸣人、宇智波佐助、春野樱的老师。少年时封闭自我，冷漠、不苟言笑，年仅12岁就成为上忍；长大后懒散、阳光，但危急时刻十分冷静沉着。战争结束后成为了第六代火影，数年后把第七代火影之位交给鸣人，自己和迈特凯两人启程旅行，去寻找曾经的回忆。",
    personalityMatch:
      "你和旗木卡卡西有着相似的性格，你果断、自信，富有智慧且有责任心，对自己的任务和职责非常认真，无论面对任何情况都不会放弃。在和他人相处时，你往往会展现出坦率、幽默、公正的一面，善于用独特的方式缓解紧张的气氛，也能够和别人建立良好的关系，因此很受他人的依赖和信任。",
    colorCode: "00a7ff",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/9.png",
  },
  {
    name: "我爱罗",
    attr1: 0,
    attr2: 0,
    attr3: 0,
    attr4: 0,
    attr5: 2,
    title: "风影",
    birthday: "1月19日",
    bloodType: "AB",
    hometown: "砂忍者村",
    chakra: "风、雷、土",
    catchphrase: "也许和一个邪恶的人相伴比孤独更可取。",
    introduction:
      "我爱罗，砂忍者村的第五代风影。四代目风影·罗砂之子。可以自由操控砂子，能任意变化成各种形态进行攻击和防御。早期无法控制尾兽、遭到村民排斥、加上他已故的母亲称他为“村子的诅咒”，种种念头将我爱罗逼成一个冷血杀手，认为自己存在的目的就是杀死敌人。直到遇见漩涡鸣人，我爱罗才改变看法，最终成为第五代风影，并得到大家认可。",
    personalityMatch:
      "在部分性格方面，你和我爱罗相似。你是一个纯粹、直接的人，敢于表达自己的观点和看法，也不畏惧强权和他人的胁迫。在社交中，你总能平和待人，非常重视友情，而且是「说的少、做的多」的类型，再加上具有强烈的同情心，让你很容易对弱势群体产生同情心理，并伸出援手。",
    colorCode: "ff3e39",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/10.png",
  },
  {
    name: "宇智波鼬",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 0,
    attr5: 1,
    title: "S级叛忍",
    birthday: "6月9日",
    bloodType: "AB",
    hometown: "木叶忍者村",
    chakra: "风、水、火、阴、阳",
    catchphrase:
      "你永远不必原谅我。无论你从现在起做什么，要知道......我会永远爱你。",
    introduction:
      "宇智波鼬，宇智波一族的天才忍者，宇智波佐助的哥哥，为人沉着冷静，天资聪颖，实力非常强大，擅长使用幻术。为了保护村子免受战乱，同时为了宇智波一族的荣耀之名，被迫接受了木叶高层志村团藏下令的灭族任务，留下了弟弟佐助并刺激他向自己复仇，之后加入晓组织做卧底。他的弟弟宇智波佐助成为家族中唯一的活口，自始不惜一切以杀死他为目标，为族人复仇。",
    personalityMatch:
      "你和宇智波鼬的性格有相似之处，你沉静、聪慧，对于自己的能力非常自信，有自己的目标和理想，并能够很好地平衡理想和现实，既有自己的理想追求，也会考虑现实可能性。在完成目标的路上，你能做到坚持不懈、始终如一，获得看似不可能的成功。",
    colorCode: "3ed824",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/11.png",
  },
  {
    name: "奈良鹿丸",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 0,
    attr5: 1,
    title: "上忍/木叶顾问",
    birthday: "9月22日",
    bloodType: "AB",
    hometown: "木叶忍者村",
    chakra: "火、土、阴",
    catchphrase:
      "我之所以成为忍者，只是因为我以为作为忍者的生活会更有趣......我想事情不会那么简单。",
    introduction:
      "奈良鹿丸，木叶忍者村的上忍，与漩涡鸣人同时从忍者学校毕业，拥有出众的应敌策略，头脑冷静、随机应变，IQ超过200。鹿丸是木叶12名新人下忍中唯一在中忍考试后被提拔为中忍的人。他的家族秘术都与影子有关。第六代火影旗木卡卡西上任时，鹿丸表达将来想辅助漩涡鸣人的意愿，从此跟从卡卡西学习，现为木叶忍者村的高层和顾问。",
    personalityMatch:
      "在部分性格方面，你和奈良鹿丸相似。你平易近人、追求自由，待人真诚坦率，喜欢结交朋友。同时，你不善于掩饰自己的情感，无论是高兴还是愤怒、喜悦还是悲伤，总能从你的脸上看出你现在的心情，但这份直截了当也能让你收获最纯真、最炽热的情谊。",
    colorCode: "d8792a",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/12.png",
  },
  {
    name: "日向宁次",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 0,
    attr5: 2,
    title: "上忍",
    birthday: "7月3日",
    bloodType: "O",
    hometown: "木叶忍者村",
    chakra: "水、火、土",
    catchphrase:
      "父亲，我终于理解你的感觉......当你选择牺牲生命来保护朋友时感到的自由......",
    introduction:
      "日向宁次，日向家族成员，由迈特·凯所领导的第三班成员，队友是李洛克和天天。被称为日向一族的天才，虽然被宗家限定了其血继限界白眼的能力，但是他凭借自己的天赋继承了宗家才可以使用的回天等体术。性格理性、冷静，在中忍考试输给鸣人后对命运的看法有所改观，不再认为命运是无法改变的。",
    personalityMatch:
      "你的身上有日向宁次的影子，你冷静、理性，具有正义感且有着非常强烈的责任感。在工作中，你务实、可靠、讲求效率，目标非常明确，且能够做到全面地思考问题。再加上组织力强、行动迅速，使你能够高效快速地完成任务。生活中，你却往往展现出善良、体贴的一面，乐于帮助和保护他人。",
    colorCode: "81da3c",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/13.png",
  },
  {
    name: "纲手",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 1,
    attr5: 2,
    title: "第五代火影",
    birthday: "8月2日",
    bloodType: "B",
    hometown: "木叶忍者村",
    chakra: "雷、水、火、土、阳",
    catchphrase:
      "成长吧......作为忍者，死亡是无法避免的......有时候死亡是难以接受的，但如果你不能克服它，就没有未来......",
    introduction:
      "纲手，在三代火影猿飞日斩殉职后继任为木叶忍者村第五代火影。她是首位也是迄今唯一的女性火影。木叶忍者村传说中的三忍之一，忍界极富盛名的医疗忍者。受自来也的请求，回村担任第五代火影。在后来的佩恩袭击等事件中保护着木叶。第四次忍界大战中担任忍者联军总参谋，发挥着重大作用。第四次忍界大战结束后退位，由旗木卡卡西接任为第六代火影。",
    personalityMatch:
      "你的性格和纲手有相似之处，你直接、坦率、不拘小节，喜欢自由自在的生活，无论是工作还是人际关系中，总展现出坚强、独立的一面。除此之外，你广交朋友，也乐于帮助他人，是“他人对你一分好，你对他人一百分好”的类型。",
    colorCode: "348de9",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/14.png",
  },
  {
    name: "大蛇丸",
    attr1: 0,
    attr2: 1,
    attr3: 1,
    attr4: 0,
    attr5: 0,
    title: "S级叛忍",
    birthday: "10月27日",
    bloodType: "B",
    hometown: "音忍者村",
    chakra: "火、风、雷、土、水、阴、阳",
    catchphrase: "最好的药品总是味道苦涩的。",
    introduction:
      "大蛇丸，原木叶忍者村传说中的三忍之一，具有极其强大的实力和近乎于不死的恢复能力。野心很大，擅长研究忍术并渴望得到写轮眼，为了自己的利益在不同组织之间来回工作，在第四次忍界大战中彻底醒悟，忍界大战结束后，不再被列入木叶的叛忍名单，并留在木叶忍者村中生活。",
    personalityMatch:
      "在部分性格方面，你和大蛇丸有相似之处。你目标明确、执行力强，充满动力和决心，有远大的理想且相信自己的能力可以实现自己的目标和愿望。即便是在一片反对与质疑声中，也不会影响你的决定和选择，相反，只要是你认准的事情，你会坚持到底。",
    colorCode: "2ac8b8",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/15.png",
  },
  {
    name: "李洛克",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 0,
    attr5: 2,
    title: "上忍",
    birthday: "11月27日",
    bloodType: "A",
    hometown: "木叶忍者村",
    chakra: "无",
    catchphrase:
      "我想证明即使无法使用忍术或幻术，也可以成为一名优秀的忍者！这对我来说就是一切！",
    introduction:
      "李洛克，木叶忍者村的忍者，性格单纯、热血、勇敢，有坚韧不拔的精神，面对困难从不畏惧。李洛克不擅长控制查克拉，所以不认识其他忍术及幻术，也没有与生俱来的特殊技能。因此，他集中于体术的训练，深信只要透过努力，总有一天可以超越像同组的日向宁次这种天才，阿凯曾称赞他为“努力型的天才”。",
    personalityMatch:
      "你的性格和李洛克相似，你坚韧、勤奋、正直，有着坚定的信念和原则，不欺骗别人，也总是充满活力和热情，积极地面对生活，并能够向周围的人传递自己的能量。对你而言，「失败」并不可怕，不敢尝试才是生命的悲哀。因此你总是在前进、从不轻言放弃。",
    colorCode: "28d225",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/16.png",
  },
  {
    name: "自来也",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 0,
    title: "上忍",
    birthday: "11月11日",
    bloodType: "B",
    hometown: "木叶忍者村",
    chakra: "风、水、火、土、阴、阳",
    catchphrase: "哟！我是自来也！你可以后来再给我写情书！",
    introduction:
      "自来也，木叶忍者村传说中的三忍之一，三代目火影猿飞日斩的弟子，小时候的他跟鸣人十分相像，冲动、鲁莽。后来，自来也成为波风水门小南、火影漩涡鸣人等人的师父，也被鸣人视为一生中最敬重的人。他指导鸣人修行，在鸣人成长的道路上起到重要作用。后到雨忍村刺探情报，结果不幸死于“晓”首领佩恩之手。",
    personalityMatch:
      "你的性格和自来也有相似之处，你对「自由」有狂热的追求，不喜欢单调重复，对人或事物很快就感到厌倦，讨厌被规则束缚，也很重视自我的感受和生活的品质。当你专注于某事时，你会一改懒散的姿态，为了自己的目标和理想而努力奋斗。",
    colorCode: "e28b1e",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/17.png",
  },
  {
    name: "宇智波带土",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 1,
    attr5: 0,
    title: "S级叛忍",
    birthday: "2月13日",
    bloodType: "O",
    hometown: "木叶忍者村",
    chakra: "风、雷、水、火、土、阴",
    catchphrase: "当人们开始知道爱时，他们就面临着憎恨的风险。",
    introduction:
      "宇智波带土，宇智波一族的成员，四代火影波风水门的弟子，曾与旗木卡卡西、野原琳同属水门班的成员。小时候性格冲动，但热心助人且非常重视同伴，为救卡卡西被岩石压中处于濒死状态，被宇智波斑所救，在他的阴谋设计下目睹了喜欢之人野原琳死亡后痛不欲生，从此堕入黑暗。在在第四次忍界大战中被逐渐感化，想起自己曾经有着成为火影的梦想。",
    personalityMatch:
      "在部分性格方面，你和宇智波带土有相似之处。你具有聪明、敏捷的头脑，能够迅速分析和解决各种问题，并做出利益最大化的决定。同时，你很清楚的知道自己该做什么、何时做、如何做，再加上善于利用周围的环境和资源，使你在工作中很少出错，也能取得令人称赞的成就。",
    colorCode: "505539",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/18.png",
  },
  {
    name: "波风水门",
    attr1: 0,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 1,
    title: "忍者界的神话",
    birthday: "1月25日",
    bloodType: "B",
    hometown: "木叶忍者村",
    chakra: "风、雷、火、阴、阳",
    catchphrase: "我希望村子里的每个人都承认我，并成为一名伟大的火影！",
    introduction:
      "波风水门，火之国木叶忍者村的第四代火影，火影漩涡鸣人的父亲。拥有冷静睿智的头脑，擅长开发与改进忍术，曾开发了螺旋丸，为保护村子使用尸鬼封尽封印九尾而牺牲。在九尾袭击木叶事件当中，为保护村子封印九尾而牺牲。在第四次忍界大战中一度被大蛇丸以秽土转生的形式复活，与同被复活的三位火影一起前往战场支援忍者联军。",
    personalityMatch:
      "你的性格和波风水门相似，你具有成为伟大领袖的潜质，你有着出众的领导力和人格魅力，能够按部就班地管理事务，胜任工作并能够持之以恒，因此往往可以获得团队成员的信任和支持。与此同时，你有着坚定不移地意志力，无论面对什么样的挑战和困难，他都能够坚持下去，不轻易放弃。",
    colorCode: "2de94c",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/19.png",
  },
  {
    name: "宇智波斑",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 0,
    attr5: 0,
    title: "上忍",
    birthday: "12月24日",
    bloodType: "O",
    hometown: "木叶忍者村",
    chakra: "风、雷、水、火、土、阴、阳",
    catchphrase: "当我走向真正的梦想时，我会享受与你的战斗。",
    introduction:
      "宇智波斑，宇智波一族首领，不仅是前任六道仙人长子因陀罗的查克拉转世者，还是曾经宇智波一族的最强者。性格好战且残酷，有强烈的自尊心与野心。本质是追求正义的，但对世界失去信心的他选择了一条非常极端的道路：以幻术的方式，建立一个理想中的和平世界。",
    personalityMatch:
      "你的身上有宇智波斑的影子，「可靠」可能是最适合你的标签，你专注于自己的目标，善于思考和反思自己的所行所为，有自己要求严格。人际关系中，你很少与人争执，但也很难被他人所改变。有时，过于内敛的性格也会导致他人对你的误解和疏远。",
    colorCode: "3891ec",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/20.png",
  },
  {
    name: "宇智波止水",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 0,
    attr5: 2,
    title: "上忍",
    birthday: "10月19日",
    bloodType: "A",
    hometown: "木叶忍者村",
    chakra: "火、风、雷、阴",
    catchphrase:
      "我甚至不知道忍者世界是否存在公正。我们战斗是为了相信我们自己的正义。但是如果敌人正在做同样的事情，谁是正确的?",
    introduction:
      "宇智波止水，木叶忍者村宇智波一族的天才忍者，实力超常，被誉为“最强幻术忍者”、“宇智波最强”等。是宇智波镜的后代，既是宇智波鼬的导师，亦是宇智波鼬的挚友。在宇智波一族密谋发动政变的前夕，止水计划用别天神阻止宇智波的政变。但在计划实施前被志村团藏偷袭，失去右眼。为了避免别人为了抢夺他的左眼而引发争斗，同时也为了帮助宇智波鼬开启万花筒写轮眼。他将左眼和最强幻术“别天神”托付给鼬，跳下南贺河自尽而亡。",
    personalityMatch:
      "你的性格和宇智波止水有相似之处，你忠诚、坚韧、重视承诺且执行力强，在面对危机和挑战时，你往往能够保持冷静的头脑，清晰地分析和思考局势，并采取恰当的行动。而在这冷静的外表下，你还有一颗对待朋友、家人真诚的心，很看重情谊，对亲近的人保持着信任和理解。",
    colorCode: "13c0c3",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/21.png",
  },
  {
    name: "迈特凯",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 2,
    title: "特级上忍",
    birthday: "1月1日",
    bloodType: "B",
    hometown: "木叶忍者村",
    chakra: "火、雷",
    catchphrase: "是的！这就是青春的真谛！",
    introduction:
      "迈特凯，火之国木叶忍者村的上忍，一个永远把“青春”二字挂在嘴边的热血男人”，是第三班李洛克、日向宁次和天天的指导老师。虽然不擅长忍术与幻术，但可以使用忍术，不过凯更擅长体术，是一位体术高手，并以此在各种任务及战役中极为活跃。与旗木卡卡西关系很好，两人互称对方为永远的对手。",
    personalityMatch:
      "你的性格和迈特凯有相似之处，你是一个乐观、积极的梦想家，热烈如火、自信果断，总是能够以积极的态度面对各种挑战和困难，充满活力和激情地生活和工作，。同时，你待人友善、富有同情心，有着非常强的影响力和感染力，能够让周围的人感到轻松和愉快。",
    colorCode: "f8b142",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/22.png",
  },
  {
    name: "迪达拉",
    attr1: 0,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 0,
    title: "S级叛忍",
    birthday: "5月5日",
    bloodType: "AB",
    hometown: "岩忍者村",
    chakra: "爆遁、土、雷",
    catchphrase: "艺术就是爆炸！",
    introduction:
      "迪达拉，“晓”成员之一，代号青（青龙）。土之国·岩忍者村第三代土影大野木的徒弟，黑土的师兄，口头禅是“艺术就是爆炸！”。少年时期为了证明自己的艺术，而接受了众多恐怖袭击任务，因败于宇智波鼬而加入“晓”组织。性格相对直率，但在作战时表现冷静，狡猾，哪怕失去手臂也能冷静的思考战术和分析形势。",
    personalityMatch:
      "在部分性格面前，你和迪达拉有相似之处。在人群中，你总是最特别的一个，具有反叛、追求自我和自由的气质，不在乎他人的看法和评论。同时，你头脑灵活、思维敏捷，总有让人出乎意料的想法，因此通常是团队、活动的组织者，并能出色完成任务。",
    colorCode: "e3c837",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/23.png",
  },
  {
    name: "蝎",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 1,
    attr5: 1,
    title: "S级叛忍",
    birthday: "11月8日",
    bloodType: "AB",
    hometown: "砂忍者村",
    chakra: "傀儡术",
    catchphrase: "美术品是留给未来很久很久的美妙之物......永恒的美。",
    introduction:
      "蝎，“晓”成员之一，代号玉（玉女）。被誉为天才傀儡造型师，人称“赤砂之蝎”。父母早逝，长期处于缺乏安全感环境中，具有很强的个人性格，谨慎小心但也很急躁，想把活人做成傀儡。和迪达拉截然不同，蝎认为艺术是一种能够长期保存留传下去的东西，即“永恒之美”才是艺术。",
    personalityMatch:
      "你的性格和蝎有相似之处，你严谨、认真，总是能够在各种复杂的情况下保持头脑清醒，做出正确的决策。在完成任务时，往往展现出具有责任心且追求细节完美的一面。在人际交往中，不善于表露自己的情感，但实际有一颗真挚、忠诚的心，会将感情付诸行动。",
    colorCode: "d74b61",
    imageUrl: "//areal.me/which-naruto-character-are-you/show/24.png",
  },
];

/**
 * 根据用户选择的问题答案匹配对应的角色
 * @param {Array} userAnswers - 用户的答案数组，每个元素包含qid和selectedValue
 * @returns {Object} 匹配的角色对象
 */
export function matchCharacter(
  userAnswers: Array<{ qid: string; selectedValue: number }>
) {
  // 计算用户的特征值（attr1到attr5）
  const userAttrs = calculateUserAttrs(userAnswers);

  // 找到与用户特征值最匹配的角色
  const matchedCharacter = findBestMatchingCharacter(userAttrs, characters);

  return matchedCharacter;
}

/**
 * 根据用户的答案计算特征值
 * @param {Array} userAnswers - 用户的答案数组
 * @returns {Object} 用户的特征值对象 {attr1, attr2, attr3, attr4, attr5}
 */
function calculateUserAttrs(
  userAnswers: Array<{ qid: string; selectedValue: number }>
) {
  // 初始化特征值
  const attrs = {
    attr1: 0,
    attr2: 0,
    attr3: 0,
    attr4: 0,
    attr5: 0,
  };

  // 统计每个问题的选择情况
  const answerCounts: Record<number, number> = {
    1: 0,
    0: 0,
    10: 0,
    11: 0,
    20: 0,
    21: 0,
    30: 0,
    31: 0,
    40: 0,
    41: 0,
  };

  // 统计用户答案
  userAnswers.forEach((answer) => {
    const { selectedValue } = answer;
    if (answerCounts.hasOwnProperty(selectedValue)) {
      answerCounts[selectedValue]++;
    }
  });

  // 计算attr1 - 基于value的第一位是1或0
  attrs.attr1 = answerCounts[1] > answerCounts[0] ? 1 : 0;

  // 计算attr2 - 基于value的第一位是10或11
  attrs.attr2 = answerCounts[11] > answerCounts[10] ? 1 : 0;

  // 计算attr3 - 基于value的第一位是20或21
  attrs.attr3 = answerCounts[21] > answerCounts[20] ? 1 : 0;

  // 计算attr4 - 基于value的第一位是30或31
  attrs.attr4 = answerCounts[31] > answerCounts[30] ? 1 : 0;

  // 计算attr5 - 基于value的第一位是40或41
  attrs.attr5 = answerCounts[41] > answerCounts[40] ? 1 : 0;

  return attrs;
}

/**
 * 找到与用户特征值最匹配的角色
 * @param {Object} userAttrs - 用户的特征值
 * @param {Array} characters - 角色数组
 * @returns {Object} 最佳匹配的角色
 */
function findBestMatchingCharacter(
  userAttrs: Record<string, number>,
  characters: Array<Character>
) {
  let minDiff = Infinity;
  let bestMatch = null;

  characters.forEach((character) => {
    const diff = calculateDifference(userAttrs, character);
    if (diff < minDiff) {
      minDiff = diff;
      bestMatch = character;
    }
  });

  return bestMatch;
}

/**
 * 计算用户特征值与角色特征值的差异
 * @param {Object} userAttrs - 用户的特征值
 * @param {Object} character - 角色对象
 * @returns {number} 差异值
 */
function calculateDifference(
  userAttrs: Record<string, number>,
  character: Character
) {
  let diff = 0;

  // 计算每个特征的绝对差异，前5个特征不匹配有100分惩罚
  if (userAttrs.attr1 !== character.attr1) {
    diff += 100;
  }
  if (userAttrs.attr2 !== character.attr2) {
    diff += 100;
  }
  if (userAttrs.attr3 !== character.attr3) {
    diff += 100;
  }
  if (userAttrs.attr4 !== character.attr4) {
    diff += 100;
  }
  if (userAttrs.attr5 !== character.attr5) {
    diff += 100;
  }

  // 除了惩罚分，还可以添加额外的差异计算逻辑
  // 例如：计算特征值的绝对差异之和
  diff += Math.abs(userAttrs.attr1 - character.attr1);
  diff += Math.abs(userAttrs.attr2 - character.attr2);
  diff += Math.abs(userAttrs.attr3 - character.attr3);
  diff += Math.abs(userAttrs.attr4 - character.attr4);
  diff += Math.abs(userAttrs.attr5 - character.attr5);

  return diff;
}