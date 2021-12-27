import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";

export default configureStore({
  reducer: {
    userId: userSlice,
    userData: userSlice,
  },
});
