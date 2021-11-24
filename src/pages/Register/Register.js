import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/paths";

import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthContext from "../../store/store";
import { useLocation } from "react-router-dom";

import "./Register.css";
import Loading from "../../components/Loading/Loading";
import { STATUS } from "./Register.const";

import { API_URL,FE_URL } from "../../constants/const";
import { splitDomain } from "../../utils/util";
import { ERROR_CODE } from "../../constants/errorCode";

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

export default function SignUp() {
  // eslint-disable-next-line no-useless-escape
  const strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("1900-01-01");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [gender, setGender] = useState(0);
  const [uploadFile, setUploadFile] = useState();
  const [preview, setPreview] = useState();
  const [status, setStatus] = useState(STATUS.START);
  const [notify, setNotify] = useState("");
  const AuthCtx = useContext(AuthContext);
  const location = useLocation();
  const googleLoginMode = location.state;
  const [authData, setAuthData] = useState({});

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setStatus(STATUS.START);
    setNotify("");
    setOpen(false);
    if (status === STATUS.SUCCESSFULLY) {
      AuthCtx.onLogin(authData);
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
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleCode = (event) => {
    setCode(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleRetypePassword = (event) => {
    setRetypePassword(event.target.value);
  };
  const handleBirthday = (event) => {
    setBirthday(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleIdentityCard = (event) => {
    setIdentityCard(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleUploadFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setUploadFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!uploadFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(uploadFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [uploadFile]);

  useEffect(() => {
    if (googleLoginMode) {
      setEmail(googleLoginMode.email);
      setFirstName(googleLoginMode.givenName);
      setLastName(googleLoginMode.familyName);
    }
    return () => {
      setEmail();
      setFirstName();
      setLastName();
    };
  }, [googleLoginMode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if(password!==retypePassword) {
        setOpen(true);
        setStatus(STATUS.FAIL);
        setNotify(ERROR_CODE.PASSWORD_NOT_MATCH);
        setIsLoading(false);
        return;
    }
    if(!strongPasswordRegex.test(password)) {
        setOpen(true);
        setStatus(STATUS.FAIL);
        setNotify(ERROR_CODE.PASSWORD_WEAK);
        setIsLoading(false);
        return;
    }
    const dataArray = new FormData();
    dataArray.append("username", username);
    dataArray.append("password", password);
    dataArray.append("retypePassword", retypePassword);
    dataArray.append("name", firstName + " " + lastName);
    dataArray.append("code", code);
    dataArray.append("email", email);
    dataArray.append("phone", phone);
    let birthdayUnix = new Date(birthday).valueOf() / 1000;
    dataArray.append("birthday", birthdayUnix);
    dataArray.append("gender", gender);
    dataArray.append("identityCard", identityCard);
    dataArray.append("avatar", uploadFile);
    if (googleLoginMode && googleLoginMode.googleId)
      dataArray.append("googleId", googleLoginMode.googleId);

    axios
      .post(API_URL + "account/register", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status === 1) {
          setOpen(true);
          setStatus(STATUS.SUCCESSFULLY);
          setAuthData(response.data.data);
          setNotify("Register successfully!");
        } else if (response.data.status === 0) {
          setOpen(true);
          setStatus(STATUS.FAIL);
          setNotify(ERROR_CODE[response.data.code] || "Register failed!");
        }
      });

    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <Loading></Loading>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {status !== STATUS.START && (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Notification"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {notify}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={handleUsername}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={handleFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={handleLastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="code"
                    label="Code"
                    name="code"
                    autoComplete="code"
                    value={code}
                    onChange={handleCode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmail}
                    disabled={googleLoginMode ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    value={password}
                    onChange={handlePassword}
                    inputProps={{
                        minLength: 8,
                      }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="retypePassword"
                    type="password"
                    label="Retype Password"
                    name="retypePassword"
                    autoComplete="retypePassword"
                    value={retypePassword}
                    onChange={handleRetypePassword}
                    inputProps={{
                        minLength: 8,
                      }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    type="number"
                    autoComplete="phone"
                    value={phone}
                    onChange={handlePhone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="birthday"
                    type="date"
                    label="Birthday"
                    name="birthday"
                    autoComplete="birthday"
                    value={birthday}
                    onChange={handleBirthday}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="genderInputLabel">Gender</InputLabel>
                    <Select
                      labelId="genderId"
                      id="gender"
                      label="Gender"
                      value={gender}
                      onChange={handleGender}
                    >
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="avatarInputLabel">Avatar</InputLabel>
                  <Button variant="contained" component="label">
                    {" "}
                    Upload File{" "}
                    <input
                      type="file"
                      hidden
                      onChange={handleUploadFile}
                    />{" "}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {uploadFile && (
                    <img
                      id="previewImage"
                      alt="previewImage"
                      src={preview}
                      width="300px"
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="identityCard"
                    type="number"
                    label="Identity Card Number"
                    name="identityCard"
                    autoComplete="identityCard"
                    value={identityCard}
                    onChange={handleIdentityCard}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to={PATH.LOGIN}>
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
