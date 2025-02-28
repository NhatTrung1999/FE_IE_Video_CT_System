import { configureStore } from "@reduxjs/toolkit";
import stagelistReducer from "../features/stagelist/stagelistSlice";
import progressStageReducer from "../features/progressStage/progressStageSlice";

export const store = configureStore({
  reducer: {
    stagelist: stagelistReducer,
    progressStage: progressStageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
