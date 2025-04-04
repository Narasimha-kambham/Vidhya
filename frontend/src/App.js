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
import { store, persistor } from "./store"; // 🔥 Import store & persistor
import { PersistGate } from "redux-persist/integration/react";
import { setTheme } from "./features/themeSlice";
import AiRoadmap from "./Components/AiRoadmap/AiRoadmap";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import PrivateRoute from "./PrivateRoute";

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
    <Router>
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* routing to Ai roadmap from nav link */}
              <Route
                path="/ai-roadmap"
                element={
                  <PrivateRoute>
                    <AiRoadmap />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </MuiThemeProvider>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
