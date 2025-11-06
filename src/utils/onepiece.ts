export const headline = "测测你是《海贼王》里的哪个角色？";

export const desc1 =
  "《海贼王》角色测试分析并收录了数十位海贼世界中性格鲜明的人气角色，快来回答我们精心准备的有趣题目，看看你会是其中的哪个角色吧！";

export const desc2 =
  "《海贼王》（ONE PIECE）是日本漫画家尾田荣一郎作画的少年漫画作品，自1997年7月22日起在集英社旗下杂志《周刊少年Jump》连载，改编动画于1999年10月20日起在富士电视台首播。故事设定在虚拟的海贼世界，讲述了“草帽小子”蒙奇·D·路飞怀揣着想要得到秘宝“ONE PIECE”和成为“海贼王”的梦想而寻找伙伴、出海冒险的故事。";

export const desc3 =
  "冷酷或仁慈，热烈或内敛，拼搏或平和……不同的理念、家庭背景、成长经历塑造了《海贼王》中一个个生动鲜活的角色形象，与你最相像的会是谁呢？本测试以十六型人格理论为理论基础，分析并收录了数十位超人气的海贼王角色，快来测测吧~";

interface Character {
  name: string;
  attr1: number;
  attr2: number;
  attr3: number;
  attr4: number;
  attr5: number;
  nickname: string;
  title: string;
  birthday: string;
  constellation: string;
  bloodType: string;
  devilFruit: string;
  hometown: string;
  catchphrase: string;
  introduction: string;
  personalityMatch: string;
  colorCode: string;
  imageUrl: string;
}

export interface Question {
  qid: string;
  question: string;
  options: { text: string; value: number }[];
}

export const questions: Question[] = [
  {
    qid: "q1",
    question:
      "假如你是一个海贼团的船长，危急时刻必须要放弃一个同伴，你会选择？",
    options: [
      { text: "同伴A：战斗力非凡，队内的主要作战力", value: 20 },
      { text: "同伴B：战斗力差，与你一同长大，关系亲密", value: 21 },
    ],
  },
  {
    qid: "q2",
    question: "更让你有成就感的是？",
    options: [
      { text: "打败实力极其强大的敌人", value: 30 },
      { text: "陪伴伙伴们度过人生的灰暗期", value: 31 },
    ],
  },
  {
    qid: "q3",
    question:
      "对你而言，「ONE PIECE」是什么最有吸引力？（ONE PIECE指：前海贼王罗杰留下来的宝藏）",
    options: [
      { text: "获得隐身的超能力", value: 21 },
      { text: "数不尽的财宝", value: 20 },
      { text: "成为一国的国王", value: 20 },
      { text: "一瓶使人死而复生的药水", value: 21 },
    ],
  },
  {
    qid: "q4",
    question: "作为一名海贼团里的战斗员，你更想？",
    options: [
      { text: "不断喜欢学习新技能", value: 11 },
      { text: "研究和琢磨已有的能力或技能", value: 10 },
    ],
  },
  {
    qid: "q5",
    question: "你更想成为哪一种船长/领导者？",
    options: [
      { text: "务实；强大；目标明确", value: 30 },
      { text: "善良；正直；善解人意", value: 31 },
    ],
  },
  {
    qid: "q6",
    question: "如果要用一种动物来形容自己，你会选择？",
    options: [
      { text: "鹿", value: 40 },
      { text: "鹰", value: 41 },
      { text: "白鲸", value: 40 },
      { text: "猎豹", value: 41 },
    ],
  },
  {
    qid: "q7",
    question: "对于人际关系的处理，你的态度是？",
    options: [
      { text: "直言不讳，坦率交往", value: 1 },
      { text: "圆滑委婉，八面玲珑", value: 0 },
    ],
  },
  {
    qid: "q8",
    question: "作为一名海贼，你更喜欢的生活状态是？",
    options: [
      { text: "酣畅淋漓地战斗，快意恩仇", value: 1 },
      { text: "稳扎稳打，不断前进", value: 0 },
    ],
  },
  {
    qid: "q9",
    question: "你认为哪一个人物更像终极BOSS？",
    options: [
      { text: "妩媚动人，长着红色瞳孔的年轻女子", value: 41 },
      { text: "沉默寡言，特立独行的黑衣男人", value: 41 },
      { text: "面容慈祥，性格温和的热心老婆婆", value: 40 },
      { text: "单纯可爱，有时会发出奇怪嚎叫的小女孩", value: 40 },
    ],
  },
  {
    qid: "q10",
    question: "对你而言更困难的是？",
    options: [
      { text: "直言不讳地指出伙伴们身上的缺点", value: 21 },
      { text: "迎合他人，尽管内心不认同", value: 20 },
    ],
  },
  {
    qid: "q11",
    question: "如果给你24小时来探寻自己的内心，你更可能会？",
    options: [
      { text: "从现实出发，设定短期、长期的可实现的目标", value: 10 },
      { text: "着眼于未来，畅想今后自己想要的生活", value: 11 },
    ],
  },
  {
    qid: "q12",
    question: "以下可能藏有宝藏的地点，你更想去？",
    options: [
      { text: "魔窖", value: 41 },
      { text: "风之城", value: 40 },
      { text: "云落湖", value: 40 },
      { text: "沙暴废墟", value: 41 },
    ],
  },
  {
    qid: "q13",
    question: "你更赞同哪一个观点？",
    options: [
      { text: "只有当一个人独处的时候，他才可以完全成为自己。", value: 0 },
      {
        text: "分享快乐，你将得到双倍喜悦；倾诉忧愁，你将减轻一半苦楚。",
        value: 1,
      },
    ],
  },
  {
    qid: "q14",
    question:
      "作为前任海贼王的船员，当你已是暮年，会如何给村内的孩子们讲述曾经的冒险故事？",
    options: [
      { text: "按照时间顺序循序渐进地讲述", value: 10 },
      { text: "按照经历的精彩程度，跳跃性地讲述", value: 11 },
    ],
  },
  {
    qid: "q15",
    question: "回忆自己作为海贼的生涯，最让你印象深刻的片段可能是？",
    options: [
      { text: "下定决心出海时", value: 30 },
      { text: "同时被3个海贼团邀请上船", value: 31 },
      { text: "踏上从未有人来过的岛屿", value: 31 },
      { text: "完成5年的艰苦训练，打败了自己的师父", value: 30 },
    ],
  },
];

export const characters: Array<Character> = [
  {
    name: "蒙奇·D·路飞",
    attr1: 1,
    attr2: 1,
    attr3: 1,
    attr4: 1,
    attr5: 1,
    nickname: "草帽小子",
    title: "草帽大船团大船长；四皇之一",
    birthday: "5月5日",
    constellation: "金牛座",
    bloodType: "F",
    devilFruit: "橡胶果实",
    hometown: "东海-风车村",
    catchphrase: "我是要成为海贼王的男人！",
    introduction:
      "蒙奇·D·路飞，海军英雄蒙奇·D·卡普的孙子，革命军首领蒙奇·D·龙的儿子，小时候误食橡胶果实的路飞，获得如橡胶般自由伸缩的能力，梦想着找到传说中的One Piece，成为海贼王。17岁时，路飞决定出海，在旅程中集结伙伴组成了草帽一伙。和其他传统的海贼所不同的是，路飞并不会为了追求财富而杀戮，而是享受着身为海贼的冒险和自由。单纯天真、爱憎分明的他，拥有着让众人联合一致的独特魅力。",
    personalityMatch:
      "你的性格和路飞有相似之处，你是一个“造梦家”，着眼于未来，重视想象力和独创力，因此总能带给他人意想不到的惊喜。同时，你也是一位理想主义者，积极、乐观，追逐光明和希望，也喜爱并擅长交际，无论走到哪里都是人群中不可忽视的闪光点。作为自身，也同样乐意分享并奉献，友好而热诚，即使在有困难的情况下，也会热心地、竭尽全力地帮助他人，这也让你拥有很好地人缘。",
    colorCode: "ae2330",
    imageUrl: "https://crownclown.xyz/onepiece/beta-1.png",
  },
  {
    name: "罗罗诺亚·索隆",
    attr1: 0,
    attr2: 0,
    attr3: 1,
    attr4: 0,
    attr5: 1,
    nickname: "海贼猎人",
    title: "草帽一伙战斗员；“超新星”之一",
    birthday: "11月11日",
    constellation: "天蝎座",
    bloodType: "XF",
    devilFruit: "无",
    hometown: "东海-霜月村",
    catchphrase: "我有一个野心，就是要成为世界第一的剑士！",
    introduction:
      "罗罗诺亚·索隆，使用三把刀战斗的三刀流剑士。小时候由道场场主耕四郎亲自传授剑术，立志成为世界第一大剑豪，受路飞邀请加入“草帽一伙” ，虽然身份已经变为了海贼，他却仍坚守着剑士的原则，要强、绝不服输，日复一日坚持严苛的身体训练，在团队迷茫时，他能分析局势，切中要点，引导团队的决定；在同伴们遭受到危险时，他能挺身而出，拼死相护，毫不犹豫与敌人战斗。",
    personalityMatch:
      "就部分性格而言，你和索隆相似。你是一个天生的“行动派”，比起长篇大论的理解，直接的实操和锻炼让你更有干劲，你会将心力放在自己身上，专注提升和发展。你似乎有着永无止境的能力去改善任何你感兴趣的事物，不爱炫耀和自夸，总能以行动和取得的成就说服那些不看好你的人。同时，你也天生具有抓住机遇的天赋，有些机遇甚至其他人都没有注意到，因此你也往往能称为人群中最早取得成就的人。",
    colorCode: "2d8f46",
    imageUrl: "https://crownclown.xyz/onepiece/beta-2.png",
  },
  {
    name: "文斯莫克·山治",
    attr1: 0,
    attr2: 1,
    attr3: 1,
    attr4: 1,
    attr5: 0,
    nickname: "黑足",
    title: "草帽一伙厨师",
    birthday: "3月2日",
    constellation: "双鱼座",
    bloodType: "S (RH-)",
    devilFruit: "无",
    hometown: "北海-杰尔马王国",
    catchphrase: "你……知道“ALL BLUE”吗？",
    introduction:
      "山治，原名文斯莫克·山治，文斯莫克家族的第三子，长有一头金发，有着卷曲眉毛，香烟不离口。性格足智多谋，心思细腻，最爱女人，花心但很有风度，是海贼中的绅士。为基因改造人，但是兄弟中唯一一个保留了情感的人，幼时遭到父亲嫌弃被放逐到东海，后在海上餐厅巴拉蒂学习厨艺。踢技以快、准、狠为特点，但从不愿意伤害任何女性，梦想是找到传说之海All Blue而跟随路飞一同进入了伟大航路。",
    personalityMatch:
      "你的性格和山治有相似之处，你擅长理性思考，不轻易下结论，会对问题进行非个人因素的分析。但对待心中珍视的人时，你也会展现出感性的一面，用心聆听、悉心呵护，是既有理性思考能力，又注重仁义、感情的一类。从外表上看，你亲和、幽默、大度，但当落实到事情上，你总是行事务实、有序，目标也切合实际，非常值得信赖，因此往往能担当大任，并赢得他人的尊重和敬仰。",
    colorCode: "b9b629",
    imageUrl: "https://crownclown.xyz/onepiece/beta-3.png",
  },
  {
    name: "特拉法尔加·罗",
    attr1: 0,
    attr2: 0,
    attr3: 0,
    attr4: 1,
    attr5: 0,
    nickname: "死亡外科医生",
    title: "心脏海贼团船长；“超新星”之一；“王下七武海”之一",
    birthday: "10月6日",
    constellation: "天秤座",
    bloodType: "F",
    devilFruit: "手术果实",
    hometown: "北海-弗雷凡斯",
    catchphrase: "这个世界是强者的天下，谁会在意籍籍无名的家伙死活。",
    introduction:
      "特拉法尔加·罗，全名“特拉法尔加·D·瓦铁尔·罗”，小时候感染了珀铅病，10岁时加入了唐吉诃德家族，13岁时脱离，后创立心脏海贼团而名扬天下。罗常带着有豹子斑点的冬季毛帽，眼睛下有特别个性化的黑眼袋，每个手指则分别刺有英文字“Death”（死），语气慵懒却也不失礼仪，性格内敛，对名字中“D”的含义很在意。在和之国，特拉法尔加·罗联手基德击败四皇夏洛特·玲玲，并挑战四皇凯多。",
    personalityMatch:
      "就部分性格而言，你和罗相似。你是十足的个人主义者，专注自身、独来独往，总是安静地做自己的事，不容易受人牵制的，在任何时候都不会被轻易愚弄欺骗。仅这一点而言，在他人眼中你便是充满了神秘感，也非常具有吸引力。同时你有着很强的观察力和判断力，即使是一个细小的变动也逃不过你的眼睛。对于朋友的选择，你更看重真挚的心，不愿意刚刚接触就袒露心声，所以也会给他人“慢热”、“防备心强”的印象。",
    colorCode: "1235b4",
    imageUrl: "https://crownclown.xyz/onepiece/beta-4.png",
  },
  {
    name: "波特卡斯·D·艾斯",
    attr1: 1,
    attr2: 1,
    attr3: 0,
    attr4: 0,
    attr5: 1,
    nickname: "火拳",
    title: "黑桃海贼团船长；白胡子海贼团第2队队长",
    birthday: "1月1日",
    constellation: "摩羯座",
    bloodType: "S",
    devilFruit: "烧烧果实",
    hometown: "南海-巴苔里拉岛",
    catchphrase: "抱歉，我对活一千年不感兴趣，我只要今天能活着就好。",
    introduction:
      "哥波特卡斯·D·艾斯，萨博与蒙奇·D·路飞的结义兄弟，海贼王哥尔·D·罗杰的遗腹子，因为憎恨父亲，改姓母亲的姓氏。左手臂刺有“ASCE”，后背刺着十字型的“白胡子”象征。实力强大，17岁以成为“海贼王”为目标出海创立黑桃海贼团，曾一度被世界政府邀请加入王下七武海，在败给白胡子后被其人格魅力折服，成为白胡子海贼团第二队队长，后被黑胡子击败，在顶上战争中身受重伤，临死前明悟了自己生存的意义，最终含笑而逝。",
    personalityMatch:
      "在性格方面，你和艾斯相似。你热烈、真挚、通情达理且富有同情心，相当能体会别人的心情，因此也能站在他人角度思考问题，从而深刻地启发他人。对于自身遭遇的困境，你往往选择独自承受、不在人前展现，这源于你性格中的倔强和要强。而当自己的家人、朋友遇到困难时，你反而会义无反顾地伸出援手，甚至近乎无私地奉献。正因如此，在你身边的人，都或多或少的会依赖你、信任你、尊重你。",
    colorCode: "ba5118",
    imageUrl: "https://crownclown.xyz/onepiece/beta-5.png",
  },
  {
    name: "萨博",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 1,
    attr5: 1,
    nickname: "炎帝",
    title: "革命军参谋总长",
    birthday: "3月20日",
    constellation: "双鱼座",
    bloodType: "X",
    devilFruit: "烧烧果实",
    hometown: "东海-高镇",
    catchphrase:
      "只要路飞需要我的帮助，无论我身在世界的哪个角落，就算舍弃一切立场，我也会赶来帮他。",
    introduction:
      "萨博，蒙奇·D·路飞与波特卡斯·D·艾斯的结义兄弟，出身贵族但看破了世界的丑陋，向往自由，见到哥亚王国贵族的腐败后，就痛恨自己的贵族出身、甚至在失去记忆后，潜意识也强力抗拒回到哥亚王国。在首次出海时遭到天龙人的袭击，被革命军首领蒙奇·D·龙救下。在龙的教导下，凭借自身的天赋与努力，成为革命军二号人物，在德雷斯罗萨竞技场与路飞重逢，吃下烧烧果实，继承了兄弟艾斯的意志。",
    personalityMatch:
      "你的身上有萨博的影子，热诚、直率、脚踏实地。比起虚无缥缈的将来，你更着眼于现实，所谓壮志在胸也需用行动与之相配，重视现实性和常情的你对于事物的走向和发展总有独特的想法，并能熟练得运用已有的经验，从而形成新的理解。正因如此，凭借着这种过人的专注力和实干精神，你有能力将想象转化为具体的现实，因此往往在事业上取得快速的晋升。",
    colorCode: "2a5ed0",
    imageUrl: "https://crownclown.xyz/onepiece/beta-6.png",
  },
  {
    name: "香克斯",
    attr1: 1,
    attr2: 1,
    attr3: 0,
    attr4: 0,
    attr5: 0,
    nickname: "红发",
    title: "红发海贼团船长；四皇之一",
    birthday: "3月9日",
    constellation: "双鱼座",
    bloodType: "XF",
    devilFruit: "无",
    hometown: "西海",
    catchphrase: "我是来……结束这场战争的！",
    introduction:
      "香克斯，新世界的“四皇”之一，曾和小丑巴基都在罗杰海贼团实习，后成立了红发海贼团，后来在东海风车村结识了路飞，并成为路飞的引路人。年轻时期一直戴着罗杰的草帽，也给了路飞。性格豪爽大方，不拘小节，不论是衣着还是态度都经常很闲散，但非常重视朋友和手下，是一个称职且具有人格魅力的船长。身为海贼的同时，香克斯却和世界政府最高领导人五老星都有联系，是充满未知数的男人。",
    personalityMatch:
      "你的性格和香克斯有相似之处，你是一个坦诚、亲切、但颇具决策力的领导者，在你身边，感受不到令人无法喘息的压迫感，也不会过于散漫，而是有目标的、自在的前进。工作中，你擅长长程策划及目标设定并愿意担任领导者带领团队达成目标，善于找出理论上的可能性，然后再用战略的眼光分析，从而出色地完成任务。对于自身，你渴求变化、创新，很少会用相同的方法做相同的事情，倾向于发展新的爱好。",
    colorCode: "a64244",
    imageUrl: "https://crownclown.xyz/onepiece/beta-7.png",
  },
  {
    name: "唐吉诃德·罗西南迪",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 0,
    attr5: 0,
    nickname: "柯拉松",
    title: "海军本部中佐；第二代“红心”",
    birthday: "7月15日",
    constellation: "巨蟹座",
    bloodType: "S",
    devilFruit: "静寂果实",
    hometown: "圣地-玛丽乔亚",
    catchphrase: "骗了你，对不起，因为，我不想被你讨厌。",
    introduction:
      "唐吉诃德·罗西南迪，原天龙人，唐吉诃德·多弗朗明哥的亲弟弟，身材高大，身高293厘米，与哥哥相当。其真实身份为海军的卧底，海军编号：01746。罗西南迪看上去是个讨厌小孩子的冷酷、暴力的男人，但实际上继承了父亲的性格，善良、纯真，有较强的正义感。当哥哥展现出本性后，罗西南迪出逃，被战国收留并发展成为海军。后回到家族成为卧底，并救了特拉法尔加·罗，当得知罗的全名时，告诉罗“D”的意义。",
    personalityMatch:
      "就部分性格而言，你和罗西南迪相似。你有一颗「纯净之心」，体贴、善良且善解人意，对于他人的错误，你往往都能接纳、体谅，即便是对你造成了伤害，你也不愿残酷地反击。同时，你有着很强的观察力，尤其是在人际交往方面，对于朋友的细微变化，你总能轻松的察觉到，并给予关心，再加上善于理解的个性，更让你的身边围绕着一群好友，而你总是表现得很乐观，具有幽默感，让人心生好感。",
    colorCode: "752151",
    imageUrl: "https://crownclown.xyz/onepiece/beta-8.png",
  },
  {
    name: "夏洛特·卡塔库栗",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 0,
    attr5: 1,
    nickname: "托特兰面粉大臣",
    title: "夏洛特家族次子；甜点三将星之一",
    birthday: "11月25日",
    constellation: "射手座",
    bloodType: "XF",
    devilFruit: "糯糯果实",
    hometown: "新世界-托特兰王国",
    catchphrase: "男人的对决里，不需要这样肤浅的掩护！",
    introduction:
      "夏洛特·卡塔库栗，四皇之一“BIG MOM”夏洛特·玲玲的次子，与三子夏洛特·大福，四子夏洛特·欧文为三胞胎兄弟。卡塔库栗拥有极为强大的三色霸气，非常擅长见闻色霸气，甚至达到能够预知部分未来的境界。自小，他拥有怪物般的力量，外表上孤傲、沉静，实际上十分关心家人和部下，也被称为背部从不着地的男人。在整个家族中，夏洛特·卡塔库栗也处于核心地位，因为其极其强大的能力，被誉为“夏洛特家族”的最高杰作。",
    personalityMatch:
      "你的性格和卡塔库栗有相似之处，对于身边人来说，你可谓一个坚强的“守卫者”，拥有强烈责任感和使命感的你对待自己的责任总是认真而严肃的，并且绝对会从一而终。对于外界，你展现出强大的气质，凡事追求卓越，尽可能做到最好；对待家人，你常常以保护者的姿态悉心地呵护每一个人，这并不局限于健康或心态，甚至身边人的梦想和希望，都会被你细心侦察到。正是出于这种原因，你身边的朋友和家人总会信任和依赖于你。",
    colorCode: "af154c",
    imageUrl: "https://crownclown.xyz/onepiece/beta-9.png",
  },
  {
    name: "乌索普",
    attr1: 1,
    attr2: 1,
    attr3: 1,
    attr4: 1,
    attr5: 0,
    nickname: "狙击王",
    title: "草帽一伙狙击手",
    birthday: "4月1日",
    constellation: "白羊座",
    bloodType: "S",
    devilFruit: "无",
    hometown: "东海-西罗布村",
    catchphrase:
      "男人...有时候是绝对不能逃避...战斗的...！尤其是当...伙伴的梦想...被人嘲笑的时候！以只能说到做到。",
    introduction:
      "乌索普，草帽一伙狙击手，狙击手耶稣布之子，被称作“GOD·乌索普”。一头黑色卷发，长有具有标志性的长鼻子。小时候和村里的几个孩子组成了“乌索普海贼团”，随路飞出海后，平日里胆小且爱吹牛，一遇到危险就想逃跑，后来逐渐变得自信。至始至终，乌索普都非常维护伙伴，绝对不允许别人嘲笑伙伴的梦想。擅长狙击，尤其是用弹弓发射各种自制的弹丸进行精准射击。同时也会做手工，甚至修补船只。",
    personalityMatch:
      "在性格方面，你和乌索普相似。你充满热忱、活力充沛，擅长发挥自己天马行空的想象力，拥有各种奇思异想，总能为身边人带来快乐。同时，你也富有智慧，对解决新情况或具有挑战性的问题时，能展现出富有策略的一面。另外，当面临绝境时，你会拿出过人的勇气和令人意外的解决问题的方法，化解眼前的危机。对于感情，你始终是忠诚的、专一的、温柔的，他人的肯定与支持是你前进的最大动力，同时你也会给予对方最大的关心。",
    colorCode: "b39c2c",
    imageUrl: "https://crownclown.xyz/onepiece/beta-10.png",
  },
  {
    name: "托尼托尼·乔巴",
    attr1: 1,
    attr2: 1,
    attr3: 0,
    attr4: 1,
    attr5: 1,
    nickname: "乔巴医生",
    title: "草帽一伙船医",
    birthday: "12月24日",
    constellation: "摩羯座",
    bloodType: "X",
    devilFruit: "人人果实·人形态",
    hometown: "磁鼓岛-磁鼓王国",
    catchphrase: "为了路飞，我心甘情愿成为真正的怪物。",
    introduction:
      "托尼托尼·乔巴，吃了人人果实的驯鹿，可用蓝波球进行八段变形，喜欢樱花，喜欢吃棉花糖。原本是一只驯鹿，因为天生的蓝色鼻子被父母遗弃，并受到歧视。后误食人人果实，立志成为能够医治所有疾病的万能药，并向朵丽儿医娘学习医术。后受路飞的邀请，随草帽一伙离开，并正式成为他们第六位成员。当被夸奖后会变得很害羞，医术过人，在每次草帽一伙的大战后都起到了重要的作用。",
    personalityMatch:
      "你的性格和乔巴有相似之处，你善于理解他人的苦难和想法，具有很强的同理心，是一个感性、温柔、体贴的人。与生俱来的重感情和仁者之心让你有着丰富的感受性，很容易相信别人，也愿意聆听他人的苦难。对你而言，帮助他人所带来的成就感要远超“权力”、“金钱”，因此也会常常无私奉献、倾力帮助。在人际交往中，你鲜有逃避现实、沮丧的一面，相反，你会展现出积极、乐观的人生态度，像一个小太阳一样温暖他人。",
    colorCode: "c64663",
    imageUrl: "https://crownclown.xyz/onepiece/beta-11.png",
  },
  {
    name: "沙·克洛克达尔",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 0,
    attr5: 0,
    nickname: "沙漠之王",
    title: "十字公会会长；原王下七武海；巴洛克工作社社长",
    birthday: "9月5日",
    constellation: "处女座",
    bloodType: "S",
    devilFruit: "沙沙果实",
    hometown: "伟大航路",
    catchphrase: "弱者没有资格谈论正义。",
    introduction:
      "沙·克洛克达尔，能自由的操控沙子，并能将身体沙化。外表上，他留着大背头，喜欢抽雪茄，脸上有一道横断的长伤疤。原为犯罪集团巴洛克工作社社长，也曾是王下七武海一员，在阿拉巴斯坦被蒙奇·D·路飞击败后被除名，并被关进海底大监狱推进城，之后成功越狱，并参与顶上战争，随后前往新世界，两年后创立了十字公会。性格上，克洛克达尔有过人的谋略，手段毒辣，有一种令人敬畏的王者气息。",
    personalityMatch:
      "你的性格和克洛克达尔有相似之处，你的身上有王者的风范，是天生的“挑战者”。对你而言，一成不变的生活太无趣了，不断地攀登、超越才是乐趣所在。同时，你有着稳重、多思的行事作风，专注的是大方针的规划，不会拘泥于烦琐的事务上。你并不害怕犯错和更正，反而担心自己的生活缺乏挑战的乐趣，「自信」与「远见」是你的两大法宝，看重常规的你，相信确定有形的事物，也愿意为之所努力奋斗。",
    colorCode: "113a96",
    imageUrl: "https://crownclown.xyz/onepiece/beta-12.png",
  },
  {
    name: "甚平",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 0,
    attr5: 1,
    nickname: "海侠",
    title: "太阳海贼团第2任船长；草帽一伙舵手",
    birthday: "4月2日",
    constellation: "白羊座",
    bloodType: "F",
    devilFruit: "无",
    hometown: "鱼人岛-鱼人街",
    catchphrase: "我可是要成为未来海贼王船员的男人，怎么可能害怕区区四皇呢！",
    introduction:
      "甚平，鲸鲨鱼人，特征是狂风般的眉毛和鬓角，实力强劲，擅长“鱼人空手道”和“鱼人柔术”，在一定程度上有着操纵水的能力。初期常常用报复的心态来袭击人类，在费舍尔·泰格死后接替了他的领导位置，成为太阳海贼团的船长，后受邀加入“王下七武海”。性格上，甚平为人行侠仗义、正直直率，富有责任感，一心想守护鱼人岛和太阳海贼团。后在蛋糕岛宣布加入草帽一伙成为舵手。",
    personalityMatch:
      "你的性格和甚平有相似之处，你具有让他人相信和依赖的人格魅力，这种领导者的气质不是靠权威和专制他人，而是由于你内心的热忱以及负责任的工作态度而形成的。你从不吝惜赞赏，愿意善意的赞美别人，欣赏和激励他人，同时愿意理解、倾听和做出改变，这是你最美好的地方。对于自己的未来，你不会沉浸在“空想”之中，渴望着改变和进步，也愿意为理想付出切实的努力。",
    colorCode: "2d82c0",
    imageUrl: "https://crownclown.xyz/onepiece/beta-13.png",
  },
  {
    name: "马尔高",
    attr1: 0,
    attr2: 1,
    attr3: 1,
    attr4: 0,
    attr5: 1,
    nickname: "不死鸟",
    title: "白胡子海贼团第1队队长兼船医",
    birthday: "10月5日",
    constellation: "天秤座",
    bloodType: "X",
    devilFruit: "鸟鸟果实·幻兽种·不死鸟形态",
    hometown: "伟大航路",
    catchphrase: "如果你要与白胡子海贼团为敌，就别指望能赢。",
    introduction:
      "马尔高，白胡子海贼团的元老级船员之一，30年前就已经跟随白胡子。被称为“白胡子的左膀右臂”，马尔高也十分忠心于白胡子。在队长中，马尔高拥有首屈一指的实力，其不死鸟果实拥有超强的再生能力。顶上战争中，为救艾斯与海军本部开战，白胡子身亡后接下指挥白胡子海贼团阻止赤犬对路飞的追杀。在顶上战争两年后，为了当年对艾斯的承诺，在路飞挑战凯多时助其一臂之力。",
    personalityMatch:
      "就部分性格而言，你和马尔高相似。你是一个勇于实现梦想的人，有着精准的敏锐度，总能关注到事物的具体性和特殊性，善于发现细节，这使得你在工作中总有出色的表现，而且也大多能够掌握眼前的机会。同时，你擅长沟通、何做，不会一味的固守己见或独行专制，喜欢与他人共事，并能从中获得乐趣和得到成长。总体而言，你是一个能将多方面均衡得很出色的人。",
    colorCode: "35b2b4",
    imageUrl: "https://crownclown.xyz/onepiece/beta-14.png",
  },
  {
    name: "唐吉诃德·多弗朗明哥",
    attr1: 0,
    attr2: 0,
    attr3: 0,
    attr4: 1,
    attr5: 1,
    nickname: "天夜叉",
    title: "唐吉诃德家族首领；原王下七武海",
    birthday: "10月23日",
    constellation: "天秤座",
    bloodType: "X",
    devilFruit: "线线果实",
    hometown: "圣地-玛丽乔亚",
    catchphrase: "弱者，连死的方式都无从选择。",
    introduction:
      "唐吉诃德·多弗朗明哥，天龙人出身，前王下七武海，是唐吉诃德·荷敏的长子。有官方背景，又有黑暗势力，私下里经营着非法的人类拍卖所，也在地下世界也从事着军火生意，其势力遍及世界各处，作为地下世界中介人，代号为“Joker”。因知晓玛丽乔亚“秘宝”的相关秘密，也为天龙人所忌惮。多弗朗明哥善用世界政府赋予的七武海权限，控制着世界各地诸多产业。战败后被褫夺国王和七武海的头衔，由上将藤虎逮捕并送往推进城LEVEL 6。",
    personalityMatch:
      "就部分性格而言，你和多弗朗明哥相似。你以王者风范与质疑的态度面对这个世界，完全不受世俗的约束，敢于对所谓的“权威”说不，同时也会不惜一切地捍卫尊严，只要你认准的事情，会不竭余力地为此努力，直至获得成功。无论是在家庭还是职场中，你都扮演着核心的角色，即使面对怀疑，你仍相信自己的看法与决定。而具有本能的洞察力的你，能够看到事物更深层的含义。",
    colorCode: "d16b7c",
    imageUrl: "https://crownclown.xyz/onepiece/beta-15.png",
  },
  {
    name: "尤斯塔斯·基德",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 1,
    attr5: 1,
    nickname: "“船长”基德",
    title: "基德海贼团船长；“超新星”之一",
    birthday: "01月10日",
    constellation: "摩羯座",
    bloodType: "F",
    devilFruit: "磁磁果实",
    hometown: "南海",
    catchphrase: "如果你不准备战斗，你就不会赢！",
    introduction:
      "尤斯塔斯·基德，拥有三色霸气，磁磁果实能力者，与基拉一同出海，创建了基德海贼团。他兼具理想与野心，梦想是找到“ONE PIECE”。2年前登陆香波地群岛，是当时的11位超新星中悬赏最高的人，后与红发海贼团交手后断掉一臂。两年后，基德的身上留下多处伤疤，曾与罗结盟对抗BIG MOM并挑战凯多。基德拥有强大的实力，且十分好战，脾气火爆，也常常为一点小事而动怒。",
    personalityMatch:
      "你的性格和基德有相似之处，气质出众，做事豪爽、干脆，也非常有威严，尤其是在面对逆境时，你能展现出超越常人的韧性，因此往往能担任「最高指挥官」的角色。同时，你有着极强的决断力，这并非孤注一掷或一时兴起，而是你在充分关注细节后快速做出的决策，但由于率直的行事风格，也常常成为备受争议的人。",
    colorCode: "882931",
    imageUrl: "https://crownclown.xyz/onepiece/beta-16.png",
  },
  {
    name: "乔拉可尔·米霍克",
    attr1: 0,
    attr2: 0,
    attr3: 0,
    attr4: 0,
    attr5: 0,
    nickname: "鹰眼",
    title: "原王下七武海之一，十字公会干部",
    birthday: "3月9日",
    constellation: "双鱼座",
    bloodType: "S",
    devilFruit: "无",
    hometown: "未知",
    catchphrase: "不是只有坚硬的剑才有力量。",
    introduction:
      "乔拉可尔·米霍克，人称“海兵猎人·鹰眼米霍克”，被誉为“世界第一大剑豪”。留着黑色的短发，有着老鹰般锐利的双眼，几乎没有表情变化的脸，时刻彰显他的独特，虽然占据最强的宝座，却从不会拒绝挑战者的挑战。米霍克常年独自一人，乘坐着一艘小船在大海中游荡，他拥有着看穿事物本质的洞悉能力，这也是他拥有着能对抗任何敌人力量的神髓。世界会议后，王下七武海制度被废除，后与克洛克达尔一同创立了十字公会。",
    personalityMatch:
      "就部分性格而言，你和鹰眼米霍克相似。无论何时，你的行为总是有着组织性和系统性，不会鲁莽行事，也不会陷入感性的漩涡。更多时候，你能展现出从容、坚定的气质，比同龄人显得成熟许多。同时，擅长从精神世界中获得心理能量的你永远不会停下前进的脚步，总在不停质疑、不断思考，从而不断攀登，你也十分享受在安稳中不断前进的感觉。",
    colorCode: "941e56",
    imageUrl: "https://crownclown.xyz/onepiece/beta-17.png",
  },
  {
    name: "爱德华·纽盖特",
    attr1: 1,
    attr2: 1,
    attr3: 1,
    attr4: 0,
    attr5: 1,
    nickname: "白胡子",
    title: "白胡子海贼团的船长；新世界的“四皇”之一",
    birthday: "4月6日",
    constellation: "白羊座",
    bloodType: "F",
    devilFruit: "震震果实",
    hometown: "伟大航路-斯芬克斯",
    catchphrase: "我是旧时代的残党，新时代没有能承载我的船！",
    introduction:
      "爱德华·纽盖特，食用了震震果实人称“白胡子”，被誉为“世界最强的男人，体型巨大，身材健硕，被战国称为毁灭世界的力量。虽号称最强，但白胡子本人丝毫不留恋这“最强”之称号，他对财宝没有任何兴趣，而是非常重视伙伴，将船员视为儿子、家人，被亲切地称为“老爹”。无所畏惧的他对任何逼近的威胁都有从正面直接迎击的悍勇气魄，决不允许任何人伤害自己的同伴，更加不容许伙伴之间的互相算计。在顶上战争中，为救艾斯与海军本部发起战争，最终战死。",
    personalityMatch:
      "在性格方面，你和白胡子相似。可以说，你是一个天生的“领导者”，一方面，你有着过人的能力和担当，勇于承担责任且对自我要求严格，能怡然且技巧性地带领团体取得阶段性的成功，因此常常会散发出无限的个人魅力，赢得他人的尊重和跟从。另一方面，你能以一种实事求是的方式接受他人的行为，包容但理性，且能准确分析出他人的需求，因此会更受欢迎和追捧。",
    colorCode: "9d642f",
    imageUrl: "https://crownclown.xyz/onepiece/beta-18.png",
  },
  {
    name: "库赞",
    attr1: 0,
    attr2: 1,
    attr3: 0,
    attr4: 1,
    attr5: 0,
    nickname: "青雉",
    title: "原海军本部大将",
    birthday: "9月21日",
    constellation: "处女座",
    bloodType: "F",
    devilFruit: "冰冻果实",
    hometown: "南海",
    catchphrase: "被称为“正义”的东西，会改变它的形式……这取决于你的立场。",
    introduction:
      "库赞，原是“海军本部”最高战力之一的“海军本部大将”，与赤犬、黄猿并称为海军三大将，是原海军大将黑腕泽法的学生。实力强大，个性十分悠闲，喜欢睡觉，自言当海军的格言是“从容不迫的正义”。奥哈拉事件中动摇对海军所坚持的正义的看法，顶上战争结束后不久与赤犬争夺海军元帅之位，与赤犬在庞克哈萨德上激战十天落败后选择辞职，离开海军。在之后和黑胡子海贼团有所牵扯，神秘而具有魅力。",
    personalityMatch:
      "你的身上有库赞的影子。在绝大多数情况下，你都是冷静自若的、坚定的，无论他人给予多么强烈的影响，你都会坚持自我。你的思考和行为保持开放性，对待已有的“真理”和“观念”总带有三分质疑的心情，唯有真正实践、内心真正认同后，才会确切相信。对你而言，生命和工作是一次智慧的挑战，在做事之前要仔细，投入地思考再三。同时，你能很好地维系个人生活与工作，使自己的圈子稳定且按部就班的生活，值得依靠。",
    colorCode: "224f94",
    imageUrl: "https://crownclown.xyz/onepiece/beta-19.png",
  },
  {
    name: "萨卡斯基",
    attr1: 0,
    attr2: 0,
    attr3: 0,
    attr4: 0,
    attr5: 1,
    nickname: "赤犬",
    title: "海军本部元帅",
    birthday: "8月16日",
    constellation: "狮子座",
    bloodType: "F",
    devilFruit: "岩浆果实",
    hometown: "北海",
    catchphrase: "不喜欢奢华的葬礼吗？白胡子！",
    introduction:
      "萨卡斯基，海军代号“赤犬”，原“海军总部最高战力“三大将”之一，师从原海军大将泽法。在顶上战争之后，萨卡斯基升任海军本部元帅。本人性格刚直，是一个铁血军人，奉行着“彻底的正义”之理念，对于有可能成为“恶”可能性的一切事物，都采用极端、无情的手段来处理。曾在奥哈拉事件中，为防止考古学家偷偷潜入避难船，命令部下炸毁载满了奥哈拉居民的避难船。顶上战争期间拼死作战，战后与青雉在庞克哈萨德展开长达十天的激烈决斗，胜利后成为新任元帅。",
    personalityMatch:
      "在性格方面，你和萨卡斯基相似。就像火焰熊熊燃烧般热烈，你同样有着强烈的自我风格。你果断、自信，有很强的正义感，有远大抱负，且专注自己前进的方向，即便是面对多人的怀疑，你也不会改变自己的心意。多数情况下，你是严厉的、果决的，无论是对他他人还是自己，都采用同样的高标准，因此也会被当作楷模学习。当你做下定决心，会完全地投入，毫无保留。",
    colorCode: "a21d1e",
    imageUrl: "https://crownclown.xyz/onepiece/beta-20.png",
  },
  {
    name: "西尔巴兹·雷利",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 1,
    nickname: "冥王",
    title: "罗杰海贼团副船长；镀膜匠人",
    birthday: "5月13日",
    constellation: "金牛座",
    bloodType: "XF",
    devilFruit: "无",
    hometown: "未知",
    catchphrase:
      "也许人生没有什么事情是偶然发生的。一切都有原因，我们的命运慢慢形成。",
    introduction:
      "西尔巴兹·雷利，原罗杰海贼团的副船长，人称海贼王的右腕，是海贼世界中响当当的大人物。年轻时因为自己家被烧毁而四处游荡，后遇到哥尔·D·罗杰，并成为了罗杰的第一个伙伴。年轻时期的雷利留着金色短发，年老时留有长曲发。罗杰海贼团解散后，雷利定居夏波帝诸岛成为镀膜工匠。性格上，雷利沉稳且具有亲和力，曾经在海难时被鱼人小八救过一命，在蒙奇·D·路飞与伙伴分散期间，成为了教导路飞使用“霸气”的师父。",
    personalityMatch:
      "你的身上有冥王雷利的影子。你拥有自己的一套思想体系，不会听信他人之言，也不会过于鲁莽，相反的，你会对已知的信息加以分析和判断，再做出自己的决定。同时，你拥有强大的人际相处能力及具备完备常识，能够做到很有弹性地适应他人与环境，这让你成长得很快。在加上你能准确分析成事的缘由且能找出实际问题的核心，使得你更加熠熠生辉。",
    colorCode: "628e24",
    imageUrl: "https://crownclown.xyz/onepiece/beta-21.png",
  },
  {
    name: "巴基",
    attr1: 1,
    attr2: 0,
    attr3: 0,
    attr4: 1,
    attr5: 0,
    nickname: "千两道化",
    title: "“四皇”之一；巴基海贼团船长；十字公会会长",
    birthday: "8月8日",
    constellation: "狮子座",
    bloodType: "F",
    devilFruit: "四分五裂果实",
    hometown: "伟大航路",
    catchphrase: "不管前面有多少人等着，我们一定要突破他们重新出海！",
    introduction:
      "巴基，食用了四分五裂果实的四分五裂人，童年时在罗杰海贼团做实习生。其解散后，巴基成立巴基海贼团，在东海活动。顶上战争过后被政府邀请成为王下七武海，后组建海贼派遣公司“巴基速递”。在克洛克达尔、鹰眼组成十字公会并向外界宣传时，巴基阴差阳错的被海军误以为是十字公会的首领，被认证为新“四皇”。巴基性格风趣，也十分幸运，他的出海梦想是得到世间的所有的财宝，很忌讳别人谈及他的鼻子。",
    personalityMatch:
      "你的身上有巴基的影子，在你乐观、外向、诙谐的外表下，有一颗专注的心。你具有非常强烈的个性，既有反叛性格，也有务实的一面。在工作中，你喜欢带引他人且能使他人或团体发挥潜能，同时能让其自愿地听从你；在生活里，你多才多艺、适应性强，在解决挑战性和理论性问题时善于随机应变。因此，往往是在他人都一筹莫展之际，你能展现出出色的解决难题的能力。",
    colorCode: "c55c1a",
    imageUrl: "https://crownclown.xyz/onepiece/beta-22.png",
  },
  {
    name: "斯摩格",
    attr1: 0,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 1,
    nickname: "白猎人",
    title: "海军G-5支部中将",
    birthday: "3月14日",
    constellation: "双鱼座",
    bloodType: "XF",
    devilFruit: "冒烟果实",
    hometown: "伟大航路",
    catchphrase: "军衔只是摆设……我是势不可挡的海军！",
    introduction:
      "斯摩格，海军G-5支部中将，烟雾果实能力者，曾是原海军大将泽法的学生。长有一头银色短发，使用武器为海楼石十手。性格豪放，深具洞察力，行事我行我素，绝不原谅违反法律以及在他手上逃脱的人，但也有非常温柔的一面。作为达斯琪的上司，斯摩格也扮演导师的角色，二人经常一起行动。在“阿拉巴斯坦事件”后，斯摩格升为准将。顶上战争事件后，斯摩格升任中将，主动申请调到位于新世界的唯一分部-G-5部。",
    personalityMatch:
      "你的性格和斯摩格有相似之处，你实际、理性、具有强烈的责任感和正义感，可谓是一个“问题解决者”。当出现困境和挑战时，你总能够掌握必要的事实情况，然后找到符合逻辑的明智的解决途径，而无需浪费大量的努力或精力，这让你能在任务中有出色的表现。在人际关系方面，你习惯于隐藏自己的感情，除非遇到自己真正愿意交流的人，否则绝不会轻易透露。",
    colorCode: "2c6d8a",
    imageUrl: "https://crownclown.xyz/onepiece/beta-23.png",
  },
  {
    name: "蒙奇·D·卡普",
    attr1: 0,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 0,
    nickname: "铁拳卡普",
    title: "海军本部中将；海军本部新兵教练",
    birthday: "5月2日",
    constellation: "金牛座",
    bloodType: "F",
    devilFruit: "无",
    hometown: "东海",
    catchphrase: "虽然坏蛋不值得同情，但是家人不一样！",
    introduction:
      "蒙奇·D·卡普，海军中的传奇人物，儿子是革命军首领蒙奇·D·龙，孙子为草帽小子蒙奇·D·路飞。卡普拥有极强的臂力与投掷力，曾是世界范围内名声赫赫的大人物，但不喜欢过高的职位，仍然保持中将的职位，与前海军本部元帅战国有很深的交情。卡普在38年前独自一人在神之谷挡下了谁都无法阻止的洛克斯海贼团的进击，并和罗杰联手将整个海贼团毁灭，因而被誉为“海军英雄”。而他本人却不看重名利，智勇双全，且很风趣、幽默，也很关心部下，是一位很好的上司。",
    personalityMatch:
      "你的身上有蒙奇·D·卡普的影子，具有很强的自信心与自尊心，也有着复杂的性格。有时会渴望变化、渴望自由，希望能在人生的舞台上大展拳脚；而有时，又更偏好静态的外部环境，稳定的工作、美满的家庭，并能从中体会到幸福和满足。因此，你往往会在这两种状态中不断切换，但无论如何，都不妨碍你的成功。",
    colorCode: "aa4441",
    imageUrl: "https://crownclown.xyz/onepiece/beta-24.png",
  },
  {
    name: "巴索罗缪·大熊",
    attr1: 0,
    attr2: 1,
    attr3: 1,
    attr4: 1,
    attr5: 1,
    nickname: "暴君",
    title: "原索尔贝王国国王；原王下七武海之一；革命军干部",
    birthday: "2月9日",
    constellation: "水瓶座",
    bloodType: "X",
    devilFruit: "肉球果实",
    hometown: "南海",
    catchphrase: "要旅行的话，你想去哪里？",
    introduction:
      "巴索罗缪·大熊，体型庞大，高达689cm，原王下七武海之一，原雪葩王国国王，后成为海军的人形兵器“和平主义者”的原型机，编号：PX-0。真实身份是革命军的干部。在世人的传言中，大熊从前是一个纵横跋扈的凶残海贼。虽然服从世界政府的命令，但大熊不接受上级所谓的“好”与“恶”之分，他有着自己的判断。性格上，大熊沉默寡言、沉着、冷静，手中常常拿着一本图书。在Dr.贝加庞克的机械改造后，大熊最终失去了所有的自我意识。",
    personalityMatch:
      "在性格方面，你和大熊相似。你的魅力源于工作和生活中散发出的稳重、知性、冷静，你具备透视别人心思与动机的超高本领，但却不屑于争斗，更多时候是沉浸在自己的世界中。比起高薪、高成就感的工作，你更倾向于和自己的情感一致的工作方式。在人际关系中，你善于倾听，同情力和理解能力强，忠诚、考虑周到且会关切他人感受。",
    colorCode: "1a4cae",
    imageUrl: "https://crownclown.xyz/onepiece/beta-25.png",
  },
  {
    name: "娜美",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 1,
    attr5: 0,
    nickname: "小贼猫",
    title: "草帽一伙航海士",
    birthday: "7月3日",
    constellation: "巨蟹座",
    bloodType: "X",
    devilFruit: "无",
    hometown: "东海-欧伊科特王国",
    catchphrase: "如果你认为我只是一个可爱的小女孩，那你就大错特错了！",
    introduction:
      "娜美，精通气象学和航海术，梦想是绘画出全世界的地图。娜美能用身体感知天气，完美指示航路，是个能精确画出航海图的天才航海士。娜美聪明、善良、坚强，对金钱非常执着，因继承了养母贝尔梅尔的意志——“不管遇到什么困难，都要开朗地面对”，无论是战斗还是生病的时候，娜美都会摆出笑容，笑对风雨。在路飞打倒了阿龙后，娜美正式加入了草帽一伙，并在冒险中逐渐提升自己的实力。",
    personalityMatch:
      "你的性格和娜美有相似之处，「坚韧」、「受欢迎」及「富有同情心」是你的人格标签。你有极其强大的内心，无论遇到哪一种困境，都不会轻言放弃，可以迅速地自我复原，很快就可以继续前行。同时，你也不会展现出很强的攻击性，不喜欢与人冲突，会尽力避开不必要的争论，不对他人强加已见或价值观，反而会尽可能地对身边人加以关心和帮助。",
    colorCode: "dea01d",
    imageUrl: "https://crownclown.xyz/onepiece/beta-26.png",
  },
  {
    name: "妮可·罗宾",
    attr1: 0,
    attr2: 0,
    attr3: 1,
    attr4: 0,
    attr5: 0,
    nickname: "恶魔之子",
    title: "草帽一伙考古学家",
    birthday: "2月6日",
    constellation: "水瓶座",
    bloodType: "S",
    devilFruit: "花花果实",
    hometown: "西海-奥哈拉",
    catchphrase: "历史虽然会一再重演，但人类却无法回到过去。",
    introduction:
      "妮可·罗宾，沉稳优雅、学识渊博，擅长考古学及暗杀，出生在西海的考古学之岛“奥哈拉”，8岁时参加“博士考试”，并以满分的成绩成为考古学家。在屠魔令后，为了躲避海军的追捕而藏身在地下世界中，靠着背叛别人让自己生存下去，曾为克洛克达尔工作，目的是找到古代兵器“冥王”，但罗宾谎称上面什么都没写。后加入草帽一伙，目标是找到真正的历史正文，绝不饶恕践踏历史文物的人。",
    personalityMatch:
      "在性格方面，你和罗宾相似。比起在人群中狂欢，你更倾向于沉浸在自己的内心世界，思维严谨、有逻辑性的你总能够看到新计划实行后的结果和生活中转变为真实物质的理论体系，任何“松懈的人”，即便是你的上司，也会失去你的尊敬。你乐于帮助别人解决难题，重视和睦的内部关系，并尽其所能的去实现让大家愉快完成目的的目标，是一个“隐藏的智者”。",
    colorCode: "1b7256",
    imageUrl: "https://crownclown.xyz/onepiece/beta-27.png",
  },
  {
    name: "波雅·汉库克",
    attr1: 0,
    attr2: 1,
    attr3: 1,
    attr4: 0,
    attr5: 0,
    nickname: "海贼女帝",
    title: "亚马逊·百合王国现任皇帝；九蛇海贼团船长",
    birthday: "9月2日",
    constellation: "处女座",
    bloodType: "S",
    devilFruit: "甜甜果实",
    hometown: "亚马逊·百合",
    catchphrase: "无论妾身做了什么都会被原谅，因为妾身实在太美了！",
    introduction:
      "波雅·汉库克，其绝世的容颜被世人评价为“世界第一美女”，实力强大，曾是王下七武海之一。12岁时，汉库克被人贩子从船上拐走卖给了世界贵族，自此背部便烙下奴隶的印记，后在一次余兴节目中被逼吃下“甜甜果实”。在18岁时，她成为亚马逊·百合的皇帝及九蛇海贼团的船长。喜欢路飞，平时性格高傲、任性，害怕外人知道自己曾经是奴隶的事实，但在面对路飞时总是展现出单纯且温柔的一面。",
    personalityMatch:
      "你的身上有汉库克的影子，在你自信、骄傲的外表下，有着一颗细腻、敏感的心。你会为自己穿上坚硬的盔甲和外界作战，绝不诉说自己的伤痛和软弱，在遇到大挫折时，你只视其为一个挑战，并坚定地去解决掉，但留下来的伤痕，需要时间慢慢治愈。因此也会形成自我保护意识强、敏感的性格。事实上，他人的理解和关心，会成为温暖你、鼓励你的重要力量。",
    colorCode: "d3389b",
    imageUrl: "https://crownclown.xyz/onepiece/beta-28.png",
  },
  {
    name: "加洛特",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 0,
    attr5: 0,
    nickname: "兔子",
    title: "佐乌毛茸茸公国国王",
    birthday: "5月24日",
    constellation: "双子座",
    bloodType: "F",
    devilFruit: "无",
    hometown: "佐乌毛茸茸公国",
    catchphrase: "我会战斗的，连你那份也一起！",
    introduction:
      "加洛特，兔种毛皮族，佐乌毛茸茸公国“王之鸟”兼火枪队成员，昼夜交替传信使者。具有兔子的生活属性长着两只长耳朵，爱吃胡萝卜。在满月的夜晚下，会展现出真实姿态·月狮，身体会长大，力量、速度等各方面属性显著提高。平日里，加洛特性格单纯可爱、感性且坚强，她一直憧憬着出国冒险。在和之国与毛皮族一同参与了讨伐四皇凯多的战争，战争结束后被推选为毛茸茸公国新任国王。",
    personalityMatch:
      "你的性格和加洛特有相似之处，你热爱一切美好的事物，尤其和家人、朋友在一起时，总能让你更加安心，看到他们幸福的脸庞，你仿佛能忘却一切烦恼。你擅长努力理解和回应他人，对难题很快就有对策，并能对有困难的人施予援手。热衷于为他人服务的你，总是自觉承担起照顾身边的人和安排其福利待遇的责任，期待着更美好的社会。",
    colorCode: "d4ba25",
    imageUrl: "https://crownclown.xyz/onepiece/beta-29.png",
  },
  {
    name: "奈菲鲁塔丽·薇薇",
    attr1: 1,
    attr2: 1,
    attr3: 1,
    attr4: 0,
    attr5: 0,
    nickname: "Miss Wednesday",
    title: "阿拉巴斯坦王国公主；原巴洛克工作社特工",
    birthday: "2月2日",
    constellation: "水瓶座",
    bloodType: "F",
    devilFruit: "无",
    hometown: "阿拉巴斯坦王国",
    catchphrase: "如果哪天再重逢，你们……还愿意叫我一声伙伴吗？",
    introduction:
      "奈菲鲁塔丽·薇薇，阿拉巴斯坦王国的公主，她有别于故事中公主温室花朵的形象，背负着捍卫自己国家的重责大任。为了调查巴洛克工作社的情况而作了卧底，代号Miss Wednesday。后，路飞打败克洛克达尔，薇薇因为深爱着国家，没有和路飞一行人踏上旅程，留在了国家。薇薇从小好奇心就相当旺盛，爱好和平，讨厌作不必要的纷争，个性坚强也很有责任感，但有时会做一些傻瓜的行为。",
    personalityMatch:
      "就部分性格而言，你和薇薇有相似之处，你有着坚强的一面，也有着细腻的一面。在亲近的人面前，你会细心的关心朋友和家人，甚至超前思考，担心和忧虑自己的行为是否会对他人带来影响。正因如此，温柔、和善且负责任的你深受周围人的喜爱。而在面对困难时，你又能拿出百分百的精气神去面对，承担起责任，绝不推托或放弃。",
    colorCode: "2c7ed6",
    imageUrl: "https://crownclown.xyz/onepiece/beta-30.png",
  },
  {
    name: "佩罗娜",
    attr1: 1,
    attr2: 1,
    attr3: 0,
    attr4: 1,
    attr5: 0,
    nickname: "幽灵公主",
    title: "恐怖三桅帆船三怪人之一",
    birthday: "6月7日",
    constellation: "双子座",
    bloodType: "F",
    devilFruit: "幽灵果实",
    hometown: "西海",
    catchphrase: "如果你不可爱，你就没有资格为我做任何事！",
    introduction:
      "佩罗娜，原王下七武海月光·莫利亚的干部，动物僵尸与吓人僵尸的指挥官。小时候，佩罗娜被月光莫利亚收留，因此对莫利亚很是敬爱。外貌上，2年前的佩罗娜扎着粉色的双马尾，头戴皇冠，手上经常拿着一把酒红色的伞；2年后则身穿哥特风的连衣裙，带着高帽。被称为她可爱、搞怪，也有些孤独。两年后将索隆送到香波地群岛，之后寻回库玛西的躯壳并返回并留在鹰眼的克拉伊咖那岛。",
    personalityMatch:
      "你的身上有佩罗娜的影子，你是一个天生的艺术家，有着极强的想象能力和创造力，不拘常规的你，相信自己的灵感和推断，在艺术方面有着广泛的兴趣，且品味很好。在人际关系方面，你乐于广交好友，在真正了解你、亲近的朋友面前，你会展现出孩童般的赤子之心，全心全意地去关心他们、爱护他们，默默守护他们。",
    colorCode: "ba2575",
    imageUrl: "https://crownclown.xyz/onepiece/beta-31.png",
  },
  {
    name: "克尔拉",
    attr1: 1,
    attr2: 0,
    attr3: 1,
    attr4: 0,
    attr5: 1,
    nickname: "人类与鱼人间的桥梁",
    title: "革命军鱼人空手道代理师父",
    birthday: "10月25日",
    constellation: "天蝎座",
    bloodType: "F",
    devilFruit: "无",
    hometown: "福尔夏特岛",
    catchphrase: "对不起，不管发生什么我都不会哭的，请不要杀我！",
    introduction:
      "克尔拉，原本是天龙人的奴隶，被费舍尔·泰格解放后由太阳海贼团护送回家，13岁时加入革命军。克尔拉性格善良、温柔，擅长执行谍报任务，擅长鱼人空手道。在革命军期间，克尔拉展现了很强的工作能力，能处理好所有事情。人际关系上，和萨博从小一起长大，两人成年后也经常搭档行动，关系亲密，克尔拉对其非常关心，但会因萨博的擅自行动、自说自话而生气，会扯萨博的脸皮。",
    personalityMatch:
      "你的性格和克尔拉有相似之处，沉稳、干练，即便是细微的细节之处，你也能完美完成。对于需要创意的内容，有自己大胆的想法，并能用实际行动将它转为现实。无论何时何地，你总是专心朝目标前进，努力做一个负责任的人。而在对待身边人上，你总是热诚、友善，愿意聆听且非常耐心、体贴，是一个充满爱心且可靠的人。",
    colorCode: "cd8614",
    imageUrl: "https://crownclown.xyz/onepiece/beta-32.png",
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
    const { qid, selectedValue } = answer;
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
