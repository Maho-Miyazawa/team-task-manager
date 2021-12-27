import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    newTask: "",
    newPriorityId: "",
  },
  reducers: {
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
    setNewPriorityId: (state, action) => {
      state.newPriorityId = action.payload;
    },
  },
});

export const { setNewTask, setNewPriorityId } = taskSlice.actions;
export default taskSlice.reducer;
