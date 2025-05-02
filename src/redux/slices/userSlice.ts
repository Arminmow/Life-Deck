import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  activities: object[];
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
    addActivity: (state, action: PayloadAction<object>) => {
      const activity = action.payload;

      state.activities.push(activity);
      console.log(state.activities);
    },
    setActivities: (state, action: PayloadAction<object[]>) => {
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
  },
});

export const { setUserId, addActivity, setActivities, setActiveId, removeActivity } = userSlice.actions;
export default userSlice.reducer;
