import { Activity, FeedItem } from "@/types/activity";
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
    setActivityFeed: (state, action: PayloadAction<{ id: string; feeds: FeedItem[] }>) => {
      const { id, feeds } = action.payload;
      const activityIndex = state.list.findIndex((activity) => activity.id === id);
      if (activityIndex !== -1) {
        state.list[activityIndex].feeds = feeds; // Update the feeds of the activity
      }
    },
  },
});

export default activitiesSlice.reducer;
export const { setActivities, clearActivities , setActivityFeed } = activitiesSlice.actions;
