import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  const [formData, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password doesnt match!!");
      return;
    }
    const newUser = {
      userName: formData.name,
      email: formData.email,
      password: formData.password,
    };

    dispatch(registerUser(newUser))
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
        margin: 0,
        padding: 0,
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ padding: 4, marginTop: 2, borderRadius: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom align="center">
              Create an account
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
              join us today!
            </Typography>
          </Box>
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <TextField
              label="Full name"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              onChange={handleChange}
            />
            <TextField
              label="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              onChange={handleChange}
            />
            <TextField
              label="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              onChange={handleChange}
            />
            <TextField
              label="confirm password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="confirmPassword"
              onChange={handleChange}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                * {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              {loading ? "creating user..." : "Sign Up"}
            </Button>
          </Box>
          <Box sx={{ mt: 2 }} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                component="button"
                underline="none"
                onClick={() => navigate("/login")}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "auto",
          zIndex: -1,
        }}
      >
        <path
          fill="#FFB997"
          fillOpacity="1"
          d="M0,128L20,154.7C40,181,80,235,120,234.7C160,235,200,181,240,170.7C280,160,320,192,360,208C400,224,440,224,480,213.3C520,203,560,181,600,197.3C640,213,680,267,720,272C760,277,800,235,840,202.7C880,171,920,149,960,133.3C1000,117,1040,107,1080,106.7C1120,107,1160,117,1200,138.7C1240,160,1280,192,1320,192C1360,192,1400,160,1420,144L1440,128L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
        ></path>
      </Box>
    </Container>
  );
};

export default SignUp;
