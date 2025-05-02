import { activityService } from "@/services/activityService";
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
        console.log(`Activity ${activityId} is now active at ${now}`);
      } else {
        console.warn(`No activity found with ID: ${activityId}`);
      }
    },

    stopActivity: (state, action: PayloadAction<string>) => {
      const activityId = action.payload;
      const activity = state.activities.find((act: any) => act.id === activityId);

      if (activity) {
        activity.isActive = false;
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "long",
        }).format(now);

        activity.lastActive = formattedDate;

        // Only calculate timeSpent if activationDate exists
        if (activity.activationDate) {
          const timeSpentInSeconds = activityService.calculateTimeSpent(activity.activationDate);
          activity.timeSpent += timeSpentInSeconds; // Adding seconds to the existing timeSpent
        }

        activity.activationDate = null; // Clear activationDate after stopping the activity
      } else {
        console.warn(`No activity found with ID: ${activityId}`);
      }
    },
  },
});

export const { setUserId, addActivity, setActivities, setActiveId, removeActivity, setActiveActivity, stopActivity } =
  userSlice.actions;
export default userSlice.reducer;
