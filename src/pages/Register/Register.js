// import { loginApi } from "../../apis/user.api"
// import { Title } from "./Register.styles"
// import { useHistory } from "react-router-dom"
import { PATH } from "../../constants/paths"

import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from "axios";

import './Register.css';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("1900-01-01")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [phone, setPhone] = useState("")
    const [identityCard, setIdentityCard] = useState("")
    const [gender, setGender] = useState(0);
    const [uploadFile, setUploadFile] = useState();
    const [error, setError] = useState("");

    //const history = useHistory()
    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handleFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const handleLastName = (event) => {
        setLastName(event.target.value)
    }
    const handleCode = (event) => {
        setCode(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleRetypePassword = (event) => {
        setRetypePassword(event.target.value)
    }
    const handleBirthday = (event) => {
        setBirthday(event.target.value)
    }
    const handlePhone = (event) => {
        setPhone(event.target.value)
    }
    const handleIdentityCard = (event) => {
        setIdentityCard(event.target.value)
    }
    const handleGender = (event) => {
        setGender(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const dataArray = new FormData();
        dataArray.append("username", username);
        dataArray.append("password", password);
        dataArray.append("retypePassword", retypePassword);
        dataArray.append("name", firstName + ' ' + lastName);
        dataArray.append("code", code);
        dataArray.append("email", email);
        dataArray.append("phone", phone);
        dataArray.append("birthday", birthday);
        dataArray.append("gender", gender);
        dataArray.append("identityCard", identityCard);
        dataArray.append("avatar", uploadFile);


        axios.post("http://localhost:8002/api/v1/account/register", dataArray, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                setError(setError);
                console.log(error);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                    autoFocus
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
                                    type="number"
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
                            <Grid item xs={12}>
                                <InputLabel id="avatarInputLabel">Avatar</InputLabel>
                                <Button variant="contained" component="label" > Upload File <input type="file" hidden onChange={(e) => setUploadFile(e.target.files)} /> </Button>
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
                        {error && (
                                <div className="mb-3 text-danger text-xl-center">{error}</div>
                            )}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to={PATH.LOGIN}>
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}