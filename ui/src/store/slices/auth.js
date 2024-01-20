import { createSlice } from "@reduxjs/toolkit";
import api from "../../api.js";

const initialState = {
  token: null,
  user: null,
  isAuthorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      api.applyToken(action.payload.token);
      state.isAuthorized = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      api.applyToken(null);
      state.isAuthorized = false;
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;

export default authSlice.reducer;
