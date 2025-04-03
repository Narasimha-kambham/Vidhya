import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Link,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            marginTop: 0,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center">
            Log in to your account
          </Typography>
          <Box component="form" sx={{ mt: 8 }} onSubmit={handleSubmit}>
            <TextField
              label="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                * {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              {loading ? "logging in...." : "Login"}
            </Button>{" "}
          </Box>
          <Box sx={{ mt: 2 }} textAlign="center">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                component="button"
                underline="none"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* SVG Wave - Positioned at Bottom */}
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "auto",
          zIndex: -1,
        }}
      >
        <path
          fill="#ffb997"
          fillOpacity="1"
          d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,165.3C672,149,768,139,864,149.3C960,160,1056,192,1152,181.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </Box>
    </Container>
  );
};
export default Login;
