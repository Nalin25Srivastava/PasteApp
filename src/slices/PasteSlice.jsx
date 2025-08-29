/* import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const PasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    // addToPaste: (state, action) => {
    //   const paste = action.payload;
    //   state.pastes.push(paste);
    //   localStorage.setItem("pastes", JSON.stringify(state.pastes));
    //   toast("Paste Created Successfully");
    // },
    addToPaste: (state, action) => {
      const newPaste = {
        ...action.payload,
        _id: Date.now(), // or use uuid
        createdAt: new Date().toLocaleString(), // ✅ add date here
      };
      state.pastes.push(newPaste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    updatePaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste Updated Successfully");
      }
    },
    resetPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast("All Pastes Deleted Successfully");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload; // ✅ fix: extract pasteId from payload
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste Removed Successfully");
      }
    },
  },
});

export const { addToPaste, updatePaste, resetPaste, removeFromPaste } =
  PasteSlice.actions;

export default PasteSlice.reducer;
 */

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const PasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const newPaste = {
        ...action.payload,
        _id: Date.now(), // or use uuid
        createdAt: new Date().toLocaleString(), // ✅ add date here
      };
      state.pastes.push(newPaste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully!");
    },
    updatePaste: (state, action) => {
      const index = state.pastes.findIndex(
        (p) => p._id.toString() === action.payload._id.toString()
      );
      if (index !== -1) {
        state.pastes[index] = action.payload; // ✅ replace with updated data
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully!");
      }
    },
    removeFromPaste: (state, action) => {
      state.pastes = state.pastes.filter(
        (p) => p._id.toString() !== action.payload.toString()
      );
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste deleted!");
    },
    // addPaste: (state, action) => {
    //   // instead of pushing, put new paste at the beginning
    //   state.pastes.unshift({
    //     ...action.payload,
    //     createdAt: new Date().toISOString(),
    //   });
    // },
  },
});

export const { addToPaste, updatePaste, removeFromPaste } = PasteSlice.actions;

export default PasteSlice.reducer;
