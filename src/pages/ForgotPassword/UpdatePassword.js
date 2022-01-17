import {
    Typography,
    AppBar,
    TextField,
    Button
} from "@material-ui/core";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

import { API_URL } from "../../constants/const";

import "./ForgotPassword.css";

export default function UpdatePassword() {
    let navigate  = useNavigate();
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [notification, setNotification] = useState('');
    const [open, setOpen] = useState(false);

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleChangeRetypePassword = (e) => {
        setRetypePassword(e.target.value)
    }

    const handleClose = () => {
        setOpen(false);
        if (notification === 'Successfully!') {
            navigate("/login");
        }
    };

    const handleSubmitChangePassword = (event) => {
        event.preventDefault();
        const changePasswordData = {
            password,
            retypePassword
        }
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        console.log(headers);
        axios.put(API_URL + 'user/update-password', changePasswordData, { headers })
            .then(res => {
                console.log(res);
                setOpen(true);
                if (res.data.status === 1){
                    setNotification('Successfully!');
                    localStorage.removeItem("token");
                }
                else
                    setNotification('An unknown error has occurred! Please try again later!');
            })
            .catch(error => {
                setOpen(true);
                setNotification(error);
            });
    }

    return (
        <div className="ForgotPassword">
            <AppBar>
                <h1>Forgot password</h1>
            </AppBar>

            <Typography variant="h5" id="description">
                Please enter your new password below!
            </Typography>
            <Box noValidate onSubmit={handleSubmitChangePassword} sx={{ mt: 3 }}>
                <form>
                    <TextField
                        style={{ width: "500px", margin: "5px" }}
                        type="password"
                        label="Password"
                        variant="outlined"
                        required
                        value={password}
                        onChange={handleChangePassword}
                        autoComplete="email"
                    />
                    <TextField
                        style={{ width: "500px", margin: "5px" }}
                        type="password"
                        label="Retype password"
                        variant="outlined"
                        required
                        value={retypePassword}
                        onChange={handleChangeRetypePassword}
                        autoComplete="email"
                    />
                    <Button type="submit" variant="contained" color="primary" id="submitChangePassword">
                        Send
                    </Button>
                </form>
            </Box>
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
                        {notification}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
