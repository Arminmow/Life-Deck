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
    setActivities: (state, action: PayloadAction<object[]>) => {
      state.activities = action.payload;
    },
  },
});

export const { setUserId, setActivities } = userSlice.actions;
export default userSlice.reducer;
