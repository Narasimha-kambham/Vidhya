import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import roadmapReducer from "./features/roadmapSlice";
import authReducer from "./features/authSlice";
import courseReducer from "./features/courseSlice";
import courseProgressReducer from "./features/courseProgressSlice";
import toolReducer from "./features/toolSlice";
import storage from "redux-persist/lib/storage"; // 🔥 Local storage for persisting Redux state
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// 🔥 Configure persist settings
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme", "roadmap", "courseProgress", "tools"], // Persist these states
};

const rootReducer = combineReducers({
  auth: authReducer,
  roadmap: roadmapReducer,
  course: courseReducer,
  theme: themeReducer,
  courseProgress: courseProgressReducer,
  tools: toolReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚀 Prevents serialization errors
    }),
});

export const persistor = persistStore(store);
