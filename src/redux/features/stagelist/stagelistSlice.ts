import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  name: string;
  url: string;
}

export interface StageListState {
  name: string;
  items: Item[];
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

const initialState: StageListState[] = [
  { name: "Cutting", items: [] },
  { name: "Stitching", items: [] },
  { name: "Assembly", items: [] },
  { name: "Stockfitting", items: [] },
];

export const stagelistSlice = createSlice({
  name: "stagelist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchStageList.fulfilled,
      (state, action: PayloadAction<{ stageName: string; items: Item[] }>) => {
        const { stageName, items } = action.payload;
        const newState = state.find((stage) => stage.name === stageName);
        if (newState) {
          newState.items = items;
        }
      }
    );
  },
});

// export const selectCount = (state: RootState) => state.stagelist.value;

export default stagelistSlice.reducer;
