import { createSlice } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
  name: "userId",
  initialState: {
    userId: "",
  },
  reducers: {
    changeUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { changeUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
