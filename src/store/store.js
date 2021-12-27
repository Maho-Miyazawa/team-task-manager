import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import taskReducer from "../slices/taskSlice";

export default configureStore({
  reducer: {
    userId: userReducer,
    userData: userReducer,
    newTask: taskReducer,
    newPriorityId: taskReducer,
    currentTask: taskReducer,
    currentPriorityId: taskReducer,
  },
});
