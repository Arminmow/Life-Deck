import { Activity } from "@/types/activity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActivitiesState = {
  list: Activity[];
  loaded: boolean;
};

const initialState: ActivitiesState = {
  list: [],
  loaded: false,
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.list = action.payload;
      state.loaded = true;
    },

    clearActivities: (state) => {
      state.list = [];
      state.loaded = false;
    },
  },
});

export default activitiesSlice.reducer;
export const { setActivities, clearActivities } = activitiesSlice.actions;
