import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import roadmapReducer from "../features/roadmapSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    roadmap: roadmapReducer,
  },
});
