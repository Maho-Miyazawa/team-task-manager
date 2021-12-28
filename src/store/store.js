import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import taskReducer from "../slices/taskSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});
