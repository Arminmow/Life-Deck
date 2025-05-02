import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  activities: object[];
}

const initialState: UserState = {
  id: null,
  activities: [],
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
  },
});

export const { setUserId, addActivity } = userSlice.actions;
export default userSlice.reducer;
