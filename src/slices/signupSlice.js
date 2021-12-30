import { createSlice } from "@reduxjs/toolkit";

export const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    userName: "",
    team: 1,
    profileUserId: "",
    profileUserName: "",
    profileTeamName: "",
  },
  reducers: {
    inputUserName: (state, action) => {
      state.userName = action.payload;
    },
    inputTeam: (state, action) => {
      state.team = action.payload;
    },
    setProfileUserId: (state, action) => {
      state.profileUserId = action.payload;
    },
    setProfileUserName: (state, action) => {
      state.profileUserName = action.payload;
    },
    setProfileTeamName: (state, action) => {
      state.profileTeamName = action.payload;
    },
  },
});

export const {
  inputUserName,
  inputTeam,
  setProfileUserId,
  setProfileUserName,
  setProfileTeamName,
} = signUpSlice.actions;
export default signUpSlice.reducer;
