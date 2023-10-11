import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    user: userReducer,
  },
});
export default store;
