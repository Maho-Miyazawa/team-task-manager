import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    teamMember: [],
    memberTeamId: "",
  },
  reducers: {
    getMemberList: (state, action) => {
      state.teamMember = action.payload;
    },
    setMemberTeamId: (state, action) => {
      state.memberTeamId = action.payload;
    },
  },
});

export const { getMemberList, setMemberTeamId } = memberSlice.actions;
export default memberSlice.reducer;
