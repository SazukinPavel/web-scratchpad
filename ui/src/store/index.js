import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.js";
import snackbarReducer from "./slices/snackbar.js";

export default configureStore({
  reducer: { auth: authReducer, snackbar: snackbarReducer },
});
