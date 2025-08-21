import { defineStore } from "pinia";
import { Plan } from "@/api/modules/startlife";

export type TempPLan = Pick<Plan, "name" | "content">;

export const usePlanStore = defineStore("plan", {
  state: () => ({
    selectedPlan: null as Plan | null,
    tempPlan: null as TempPLan | null,
    isEdit: false, // 是否编辑计划
  }),
  actions: {
    setSelectedPlan(plan: Plan | null) {
      this.selectedPlan = plan;
    },
    clearSelectedPlan() {
      this.selectedPlan = null;
    },
    setTempPlan(plan: TempPLan | null) {
      this.tempPlan = plan;
    },
    // 清空临时计划
    clearTempPlan() {
      this.tempPlan = null;
    },
    setIsEdit(isEdit: boolean) {
      this.isEdit = isEdit;
    },
  },
});
