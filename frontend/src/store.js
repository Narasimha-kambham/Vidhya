import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import roadmapReducer from "./features/roadmapSlice";
import authReducer from "./features/authSlice";
import storage from "redux-persist/lib/storage"; // 🔥 Local storage for persisting Redux state
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// 🔥 Configure persist settings
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme", "roadmap"], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  roadmap: roadmapReducer,
  theme: themeReducer,
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
