import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";

const appStore = configureStore({
    reducer: {
        // Add reducers here
        user: userReducer,
        feed: feedSlice,
    }
});

export default appStore;