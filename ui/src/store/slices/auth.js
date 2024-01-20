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
  },
});

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;
