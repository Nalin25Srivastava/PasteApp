import { createSlice } from "@reduxjs/toolkit";

const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: [],
  },
  reducers: {
    addToPaste: (state, action) => {
      state.pastes.push({
        ...action.payload,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(), // ✅ always add createdAt
      });
    },

    updatePaste: (state, action) => {
      state.pastes = state.pastes.map((p) =>
        p._id === action.payload._id
          ? {
              ...p,
              ...action.payload,
              createdAt: p.createdAt, // ✅ preserve old createdAt
              updatedAt: new Date().toISOString(), // ✅ add updatedAt
            }
          : p
      );
    },

    removeFromPaste: (state, action) => {
      state.pastes = state.pastes.filter((p) => p._id !== action.payload);
    },
  },
});

export const { addToPaste, updatePaste, removeFromPaste } = pasteSlice.actions;
export default pasteSlice.reducer;
