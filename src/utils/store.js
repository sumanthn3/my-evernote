import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import notesSlice from "./notesSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    user: userReducer,
    notes: notesSlice,
  },
});
export default store;
