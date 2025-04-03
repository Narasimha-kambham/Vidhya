import React, { useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./Components/Home/Home";
import { lightTheme, darkTheme } from "./theme/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import { setTheme } from "./features/themeSlice";
import AiRoadmap from "./Components/AiRoadmap/AiRoadmap";

function AppContent() {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const dispatch = useDispatch();
  const theme = createTheme(isDarkTheme ? darkTheme : lightTheme);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme === "dark"));
    }
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: isDarkTheme ? "#121212" : "#f8fafc",
          color: isDarkTheme ? "#ffffff" : "#212121",
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
            px: { xs: 2, md: 3 },
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* routing to Ai roadmap from nav link */}
              <Route path="/ai-roadmap" element={<AiRoadmap />} />
            </Routes>
          </Router>
        </Box>
        <Footer />
      </Box>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
