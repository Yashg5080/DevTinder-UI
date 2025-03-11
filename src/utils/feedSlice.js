import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { data: [] },
  reducers: {
    addFeed: (state, action) => {
      state.data = action.payload;
    },
    removeFeed: (state, action) => {
      state.data = state.data.filter((feed) => feed._id !== action.payload);
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;