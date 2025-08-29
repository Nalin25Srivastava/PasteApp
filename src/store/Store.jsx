import { configureStore } from "@reduxjs/toolkit";
import PasteReducer from "../slices/PasteSlice";
export const Store = configureStore({
  reducer: {
    paste: PasteReducer,
  },
});
