import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  name: string;
  url: string;
}

export interface StageListState {
  name: string;
  items: Item[];
}

export interface InitialStateList {
  stageListStage: StageListState[];
  activeId: number;
  videoSrc: string;
}

export const fetchStageList = createAsyncThunk(
  "stagelist/fetchStageList",
  async (stageName: string) => {
    const response = await fetch(
      `http://localhost:3000/videos/${stageName.toUpperCase()}`
    );
    const stagelistData = await response.json();
    return { stageName, items: stagelistData };
  }
);

const initialState: InitialStateList = {
  stageListStage: [
    { name: "Cutting", items: [] },
    { name: "Stitching", items: [] },
    { name: "Assembly", items: [] },
    { name: "Stockfitting", items: [] },
  ],
  activeId: 0,
  videoSrc: "",
};

export const stagelistSlice = createSlice({
  name: "stagelist",
  initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.activeId = id;
    },
    setVideoSrc: (
      state,
      action: PayloadAction<{
        videoSrc: string;
      }>
    ) => {
      const { videoSrc } = action.payload;
      state.videoSrc = videoSrc;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchStageList.fulfilled,
      (state, action: PayloadAction<{ stageName: string; items: Item[] }>) => {
        const { stageName, items } = action.payload;
        const newState = state.stageListStage.find(
          (stage) => stage.name === stageName
        );
        if (newState) {
          newState.items = items;
        }
      }
    );
  },
});

export const { setActiveId, setVideoSrc } = stagelistSlice.actions;

export default stagelistSlice.reducer;
