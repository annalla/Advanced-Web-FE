import React, { useState, useContext } from "react";
import { loginApi } from "../../apis/user.api";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/paths";
import AuthContext from "../../store/store";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FiLock } from "react-icons/fi";
import { FE_URL } from "../../constants/const";

import LoginHooks from "../../components/GoogleAuth/LoginHook";

import "./Login.css";
import { splitDomain } from "../../utils/util";
import { ERROR_CODE } from "../../constants/errorCode";

const Login = (props) => {
  const AuthCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { username, password };
    loginApi(payload)
      .then(async(res) => {
        if (res.status === 1) {
          AuthCtx.onLogin(res.data);
          let locate = localStorage.getItem("history");
          if (
            locate !== null &&
            locate.includes(PATH.JOIN_CLASS_INVITATION)
          ) {
            localStorage.removeItem("history");
            locate = splitDomain(locate, FE_URL);
            history(locate);
          } else {
            history(PATH.HOME);
          }
        } else {
          //switch Error here
          setError(ERROR_CODE[res.code] || "Login failed!");
        }
      })
      .catch((err) => {
        setError("Login failed!");
      });
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          TVX Classroom
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <FiLock />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <form>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleUsername}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePassword}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item xs>
                    <div id="error">{error}</div>
                  </Grid>
                  <Grid item xs></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs>
                    <LoginHooks></LoginHooks>
                  </Grid>
                  <Grid item xs>
                    <NavLink to={PATH.REGISTER}>
                      Don't have an account? Sign up
                    </NavLink>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
