/* eslint-disable jsx-a11y/alt-text */
// import { loginApi } from "../../apis/user.api"
// import { Title } from "./Register.styles"
import { useNavigate } from "react-router-dom"
import { PATH } from "../../constants/paths"

import * as React from 'react';
import { useState, useEffect } from "react";
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
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './ManageProfile.css'
import Loading from '../../components/Loading/Loading'
import { STATUS } from './ManageProfile.const'
import { Nav } from "../../components/Nav/Nav";
import { getUserApi, updateUserApi } from "../../apis/user.api";
import { convertUnixToHTMLTime } from "../../utils/convertUnixtoHTMLTime"
import { ERROR_CODE } from "../../constants/errorCode";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Classroom
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function ManageProfile() {
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("1900-01-01")
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [identityCard, setIdentityCard] = useState("")
    const [gender, setGender] = useState(0);
    const [uploadFile, setUploadFile] = useState();
    const [preview, setPreview] = useState()
    const [status, setStatus] = useState(STATUS.START);
    const [notify, setNotify] = useState("");

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setStatus(STATUS.START);
        setNotify("");
        setOpen(false);
        if (status === STATUS.SUCCESSFULLY) {
            history(PATH.MANAGE_PROFILE);
        }
    };

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleCode = (event) => {
        setCode(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
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
    const handleUploadFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setUploadFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setUploadFile(e.target.files[0])
    }

    useEffect(() => {
        if (!uploadFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(uploadFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [uploadFile])

    useEffect(() => {
        setIsLoading(true);
            getUserApi().then(response => {
                if (response.status === 1) {
                    const data = response.data;
                    setUsername(data.username);
                    setName(data.name);
                    setCode(data.code);
                    setEmail(data.email);
                    setPhone(data.phone.replace('+84', 0));
                    setBirthday(convertUnixToHTMLTime(data.birthday));
                    setGender(data.gender);
                    setPreview(data.avatar);
                    setIdentityCard(data.identityCard);
                }
            }).then(
                setIsLoading(false)
            )
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const dataArray = new FormData();
        dataArray.append("username", username);
        dataArray.append("name", name);
        dataArray.append("code", code);
        dataArray.append("email", email);
        dataArray.append("phone", phone);
        let birthdayUnix = new Date(birthday).valueOf() / 1000
        dataArray.append("birthday", birthdayUnix);
        dataArray.append("gender", gender);
        dataArray.append("identityCard", identityCard);
        dataArray.append("avatar", uploadFile);

        updateUserApi(dataArray)
            .then((response) => {
                if (response.status === 1) {
                    setOpen(true);
                    setStatus(STATUS.SUCCESSFULLY);
                    setNotify('Updated information successfully!');
                }
                else if (response.status === 0) {
                    setOpen(true);
                    setStatus(STATUS.FAIL);
                    setNotify(ERROR_CODE[response.code] || ERROR_CODE.UPDATE_FAILED);
                }
            })

        setIsLoading(false);
    };

    return (<div>
        <Nav />

        <ThemeProvider theme={theme}>
            {isLoading && <Loading></Loading>}
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
                    {(status !== STATUS.START) &&
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
                        </Dialog>}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Manage Profile
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
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="name"
                                        value={name}
                                        onChange={handleName}
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
                                    <Button variant="contained" component="label" > Upload File <input type="file" hidden onChange={handleUploadFile} /> </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {(uploadFile || preview) && <img id="previewImage" src={preview} width="300px" />}
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
                                Update
                            </Button>
                        </form>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    </div>
    );
}