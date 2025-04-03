import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import roadmapReducer from "./features/roadmapSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    roadmap: roadmapReducer,
  },
});

export default store;
