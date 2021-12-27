import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    newTask: "",
    newPriorityId: "1",
    currentTask: "",
    currentPriorityId: "",
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
  },
});

export const { setNewTask, setNewPriorityId, editTask, editPriorityId } =
  taskSlice.actions;
export default taskSlice.reducer;
