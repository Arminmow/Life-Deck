import { Activity } from "@/types/activity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  activities: Activity[];
  activeId: string;
}

const initialState: UserState = {
  id: null,
  activities: [],
  activeId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      console.log("yoohoo");

      state.id = action.payload;
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      const activity = action.payload;

      state.activities.push(activity);
      console.log(state.activities);
    },
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = action.payload;
    },
    setActiveId: (state, action) => {
      state.activeId = action.payload;
      console.log(`Bro I did ${action.payload}`);
    },
    removeActivity: (state, action: PayloadAction<string>) => {
      // Remove activity by ID
      state.activities = state.activities.filter((activity: any) => activity.id !== action.payload);
      console.log(`Activity with ID ${action.payload} removed.`);
    },
    setActiveActivity: (state, action: PayloadAction<string>) => {
      const activityId = action.payload;
      const now = new Date().toISOString();

      const activity = state.activities.find((act: any) => act.id === activityId);

      if (activity) {
        activity.isActive = true;
        activity.activationDate = now;
        state.activeId = activityId;
        console.log(`Activity ${activityId} is now active at ${now}`);
      } else {
        console.warn(`No activity found with ID: ${activityId}`);
      }
    },
  },
});

export const { setUserId, addActivity, setActivities, setActiveId, removeActivity , setActiveActivity} = userSlice.actions;
export default userSlice.reducer;
