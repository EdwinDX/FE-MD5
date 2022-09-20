import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  isLoggedIn: false,
  user: {},
  profile: {},
  userStatus: "idle",
  users: [],
};

const REACT_APP_API_URL = "http://localhost:4000";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const { data } = await axios.post(
      `${REACT_APP_API_URL}/auth/login`,
      userData
    );
    return data;
  }
);

export const getProfile = createAsyncThunk("auth/getProfile", async (id) => {
  const { data } = await axios.get(`${REACT_APP_API_URL}/users/detail/` + id);
  return data;
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const { data } = await axios.post(
      `${REACT_APP_API_URL}/auth/register`,
      userData
    );
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state, action) => {
      localStorage.clear();
      state.isLoggedIn = false;
      axios.defaults.headers.common["authorization"] = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const { token, name, username, email, _id } = action.payload.response;
      localStorage.setItem(
        "login",
        JSON.stringify({ token, email, _id, name, username, isLoggedIn: true })
      );
      state.user.name = name;
      state.user.username = username;
      state.user.email = email;
      state.user._id = _id;
      state.status = "success";
      state.isLoggedIn = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },
    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "success";
      const { token, name, email, username, _id } = action.payload.response;
      localStorage.setItem(
        "login",
        JSON.stringify({ token, name, email, username, _id, isLoggedIn: true })
      );
      state.user.name = name;
      state.user.username = username;
      state.user.email = email;
      state.user._id = _id;
      state.status = "success";
      state.isLoggedIn = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },



    [getProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProfile.fulfilled]: (state, action) => {
      state.status = "success";
      state.profile = action.payload;
    },
    [getProfile.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default authSlice.reducer;
export const { setAuth, logout } = authSlice.actions;
