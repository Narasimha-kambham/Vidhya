import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { getState, rejectWithValue }) => {
    //debugging userData
    console.log("userData: " + JSON.stringify(userData));
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data : " + JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response && error.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { getState, rejectWithValue }) => {
    // to check received data from the frontend  :  console.log("userData", userData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  userFromUpdate: null,
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.loading = false;
      // State will be automatically cleared by redux-persist
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        console.log("action.payload : " + JSON.stringify(action.payload));
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        // State will be automatically persisted by redux-persist
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        console.log("full payload : " + action.payload);
        console.log(action.payload.user.token);

        state.user = action.payload.user;
        state.token = action.payload.user.token;
        // State will be automatically persisted by redux-persist
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
