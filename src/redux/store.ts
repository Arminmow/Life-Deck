import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import activityReducer from "./slices/activitySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    activity: activityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
