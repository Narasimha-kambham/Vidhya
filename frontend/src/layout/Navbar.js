import React, { useState } from "react";
import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  Home as HomeIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { useEffect } from "react";

const pages = [
  { title: "Home", icon: <HomeIcon />, path: "/" },
  { title: "Courses", icon: <BookIcon />, path: "/courses" },
  { title: "About", icon: <SchoolIcon />, path: "/about" },
  { title: "AI Roadmap", icon: <AutoGraphIcon />, path: "/ai-roadmap" },
];

const settings = [
  { title: "Profile", icon: <PersonIcon />, path: "/profile" },
  { title: "Settings", icon: <SettingsIcon />, path: "/settings" },
  { title: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

function Navbar() {
  console.log("Navbar Rendered");

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authState = useSelector((state) => state.auth);
  console.log("Auth State:", authState);

  useEffect(() => {
    console.log("Auth status changed:", isAuthenticated);
  }, [isAuthenticated]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", width: "280px" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Vidya
      </Typography>
      <List sx={{ width: "100%", padding: "0 16px" }}>
        {pages.map((page) => (
          <ListItem
            key={page.title}
            button
            component="a"
            href={page.path}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "16px 24px",
              width: "100%",
              marginBottom: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              color: isDarkTheme ? "#ffffff" : "#212121",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: isDarkTheme ? "#2c2c2c" : "#f5f5f5",
                "& .MuiListItemIcon-root": {
                  color: "#007bff",
                },
                "& .MuiListItemText-primary": {
                  color: "#007bff",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isDarkTheme ? "#ffffff" : "#212121",
                transition: "color 0.2s ease",
              }}
            >
              {page.icon}
            </ListItemIcon>
            <ListItemText
              primary={page.title}
              primaryTypographyProps={{
                sx: {
                  color: isDarkTheme ? "#ffffff" : "#212121",
                  fontSize: "1rem",
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isDarkTheme ? "#1e1e1e" : "#ffffff",
        boxShadow: isDarkTheme
          ? "0 2px 4px rgba(255,255,255,0.1)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: 999,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for Desktop */}
          <SchoolIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#007bff",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "var(--font-family)",
              fontWeight: 700,
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            Vidya
          </Typography>

          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "flex", md: "none" },
              color: isDarkTheme ? "#ffffff" : "#212121",
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo for Mobile */}
          <SchoolIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#007bff",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "var(--font-family)",
              fontWeight: 700,
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            Vidya
          </Typography>

          {/* Spacer to push menu items to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Menu - Moved to the right */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <ListItem
                key={page.title}
                button
                component="a"
                href={page.path}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: isDarkTheme ? "#ffffff" : "#212121",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: isDarkTheme ? "#2c2c2c" : "#f5f5f5",
                    "& .MuiSvgIcon-root": {
                      color: "#007bff",
                    },
                    "& .MuiTypography-root": {
                      color: "#007bff",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "8px",
                    color: isDarkTheme ? "#ffffff" : "#212121",
                    transition: "color 0.2s ease",
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.25rem",
                    },
                  }}
                >
                  {page.icon}
                </Box>
                <Typography
                  sx={{
                    fontFamily: "var(--font-family)",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {page.title}
                </Typography>
              </ListItem>
            ))}
          </Box>

          {/* Theme Toggle Button */}
          <IconButton
            onClick={() => dispatch(toggleTheme())}
            sx={{
              color: isDarkTheme ? "#ffffff" : "#212121",
              marginLeft: "16px",
              "&:hover": {
                backgroundColor: isDarkTheme ? "#2c2c2c" : "#f5f5f5",
                color: "#007bff",
              },
            }}
          >
            {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* User Menu */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {!isAuthenticated ? (
              <>
                <Button
                  href="/login"
                  variant="outlined"
                  sx={{
                    color: isDarkTheme ? "#fff" : "#007bff",
                    borderColor: isDarkTheme ? "#fff" : "#007bff",
                    "&:hover": { backgroundColor: "#007bff", color: "#fff" },
                  }}
                >
                  Log In
                </Button>
                <Button
                  href="/signup"
                  variant="contained"
                  sx={{
                    backgroundColor: "#007bff",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.title}
                      onClick={handleCloseUserMenu}
                      sx={{
                        color: isDarkTheme ? "#ffffff" : "#212121",
                        "&:hover": {
                          backgroundColor: isDarkTheme ? "#2c2c2c" : "#f5f5f5",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isDarkTheme ? "#ffffff" : "#212121",
                          minWidth: "40px",
                        }}
                      >
                        {setting.icon}
                      </ListItemIcon>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "280px",
            backgroundColor: isDarkTheme ? "#1e1e1e" : "#ffffff",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
