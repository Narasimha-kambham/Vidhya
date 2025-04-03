import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
      light: "#42A5F5",
      dark: "#1565C0",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#9C27B0",
      light: "#BA68C8",
      dark: "#7B1FA2",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8FAFC", // Soft White-Blue
      paper: "#FFFFFF", // Pure White for contrast
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
        contained: {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: "#E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: "#1976D2",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#E0E0E0",
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#90CAF9",
      light: "#E3F2FD",
      dark: "#42A5F5",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FBC02D",
      light: "#FFF176",
      dark: "#F57F17",
      contrastText: "#212121",
    },
    success: {
      main: "#66BB6A",
      light: "#A5D6A7",
      dark: "#388E3C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0BEC5",
    },
    divider: "#424242",
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
        contained: {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#1E1E1E",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#1E1E1E",
            color: "#FFFFFF",
            "& fieldset": {
              borderColor: "#424242",
            },
            "&:hover fieldset": {
              borderColor: "#90CAF9",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1E1E1E",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#2C2C2C",
          },
        },
      },
    },
  },
});
