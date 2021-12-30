import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    teamMember: [],
  },
  reducers: {
    getMemberList: (state, action) => {
      state.teamMember = action.payload;
    },
  },
});

export const { getMemberList } = memberSlice.actions;
export default memberSlice.reducer;
