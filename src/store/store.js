import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import taskReducer from "../slices/taskSlice";
import signupReducer from "../slices/signupSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    signup: signupReducer,
  },
});
