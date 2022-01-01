import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import taskReducer from "../slices/taskSlice";
import memberReducer from "../slices/memberSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    member: memberReducer,
  },
});
