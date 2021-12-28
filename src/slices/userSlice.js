import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
  "userData/fetchUser",
  async (userId) => {
    const userDatabaseData = `query {
      User(id: ${userId}) {
        id
        team_id
        name
        created_at
        updated_at
        tasks {
          id
          task
          is_deleted
          progress {
            id
            level
          }
          priority {
            id
            level
          }
        }
       }
      }`;

    try {
      const response = await axios({
        method: "POST",
        url: "/graphql",
        data: { query: userDatabaseData },
      });

      if (response.data.data.User) {
        return response.data.data.User;
      } else {
        return {};
      }
    } catch (err) {
      console.error(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    userData: {},
  },
  reducers: {
    changeUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { changeUserId } = userSlice.actions;
export default userSlice.reducer;
