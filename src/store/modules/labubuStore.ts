import { defineStore } from "pinia";

export const useLabubuStore = defineStore("labubu", {
  // arrow function recommended for full type inference
  state: () => ({
    // all these properties will have their type inferred automatically
    answerList: [] as number[],
  }),
  actions: {
    getAnswer() {
      return this.answerList;
    },
    setAnswer(payLoad: number[]) {
      this.answerList = payLoad;
    },
    addAnswer(payLoad: number) {
      this.answerList.push(payLoad);
    },
    clearAnswer() {
      this.answerList = [];
    },
    popAnswer() {
      this.answerList.pop();
    },
  },
});
