import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    currentTask: "",
    currentPriorityId: "1",
    isMyTask: true,
    userIdForTask: "",
    userNameForTasks: "",
  },
  reducers: {
    editTask: (state, action) => {
      state.currentTask = action.payload;
    },
    editPriorityId: (state, action) => {
      state.currentPriorityId = action.payload;
    },
    setIsMyTask: (state, action) => {
      state.isMyTask = action.payload;
    },
    setUserIdForTasks: (state, action) => {
      state.userIdForTask = action.payload;
    },
    setUserNmeForTasks: (state, action) => {
      state.userNameForTasks = action.payload;
    },
  },
});

export const {
  editTask,
  editPriorityId,
  setIsMyTask,
  setUserIdForTasks,
  setUserNmeForTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
