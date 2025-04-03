import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import roadmapReducer from "./features/roadmapSlice";
import authReducer from "./features/authSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    roadmap: roadmapReducer,
    auth: authReducer,
  },
});

export default store;
