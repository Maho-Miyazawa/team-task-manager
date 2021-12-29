import { createSlice } from "@reduxjs/toolkit";

export const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    userName: "",
    team: 1,
  },
  reducers: {
    inputUserName: (state, action) => {
      state.userName = action.payload;
    },
    inputTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { inputUserName, inputTeam } = signUpSlice.actions;
export default signUpSlice.reducer;
