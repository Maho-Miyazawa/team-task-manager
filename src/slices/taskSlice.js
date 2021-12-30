import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    newTask: "",
    newPriorityId: "1",
    currentTask: "",
    currentPriorityId: "1",
    isMyTask: true,
    userIdForTask: "",
    userNameForTasks: "",
  },
  reducers: {
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
    setNewPriorityId: (state, action) => {
      state.newPriorityId = action.payload;
    },
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
  setNewTask,
  setNewPriorityId,
  editTask,
  editPriorityId,
  setIsMyTask,
  setUserIdForTasks,
  setUserNmeForTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
