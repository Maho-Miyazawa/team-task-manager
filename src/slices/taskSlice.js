import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    isMyTask: true,
    userIdForTask: "",
    userNameForTasks: "",
  },
  reducers: {
    setIsMyTask: (state, action) => {
      state.isMyTask = action.payload;
    },
    setUserIdForTasks: (state, action) => {
      state.userIdForTask = action.payload;
    },
    setUserNameForTasks: (state, action) => {
      state.userNameForTasks = action.payload;
    },
  },
});

export const { setIsMyTask, setUserIdForTasks, setUserNameForTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
