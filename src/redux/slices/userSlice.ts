import { createSlice } from "@reduxjs/toolkit";

interface userState {
  name: string;
  activities: object[];
}

const initialState: userState = {
  name: "",
  activities: [],
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {}
})

export default userSlice.reducer;
