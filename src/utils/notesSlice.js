import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    removeNote: (state, action) => {
      return null;
    },
  },
});

export const { addNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;
