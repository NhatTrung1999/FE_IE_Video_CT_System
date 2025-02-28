import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CycleTime {
  type: string;
  cycleTimeItems: {
    CT1: number;
    CT2: number;
    CT3: number;
    CT4: number;
    CT5: number;
    CT6: number;
    CT7: number;
    CT8: number;
    CT9: number;
    CT10: number;
  };
  avg: number;
}

export interface ProgressStageState {
  id: number | string;
  stage: string;
  partName: string;
  cycleTimes: CycleTime[];
}

const initialState: ProgressStageState[] = [];

export const progressStageSlice = createSlice({
  name: "progressStage",
  initialState,
  reducers: {
    addProgressStage: (
      state,
      action: PayloadAction<{ newProgressStage: ProgressStageState }>
    ) => {
      const { newProgressStage } = action.payload;
      state.push(newProgressStage);
    },
    updateProgressStage: (
      state,
      action: PayloadAction<{ id: number | string; partName: string }>
    ) => {
      const { id, partName } = action.payload;
      const existingProgressStage = state.find((stage) => stage.id === id);
      if (existingProgressStage) {
        existingProgressStage.partName = partName;
      }
    },
  },
});

export const { addProgressStage, updateProgressStage } =
  progressStageSlice.actions;

export default progressStageSlice.reducer;
