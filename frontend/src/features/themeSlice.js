import { createSlice } from "@reduxjs/toolkit";

// Get initial theme from localStorage
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark";
};

const initialState = {
  isDarkTheme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      localStorage.setItem("theme", state.isDarkTheme ? "dark" : "light");
      document.documentElement.setAttribute(
        "data-theme",
        state.isDarkTheme ? "dark" : "light"
      );
    },
    setTheme: (state, action) => {
      state.isDarkTheme = action.payload;
      localStorage.setItem("theme", state.isDarkTheme ? "dark" : "light");
      document.documentElement.setAttribute(
        "data-theme",
        state.isDarkTheme ? "dark" : "light"
      );
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
