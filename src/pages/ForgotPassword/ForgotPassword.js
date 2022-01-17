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
import LinearProgress from '@mui/material/LinearProgress';

import { API_URL } from "../../constants/const";
import "./ForgotPassword.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendEmail = (event) => {
        setLoading(true);
        event.preventDefault();
        axios.get(API_URL + 'user/forgot-password?email=' + email)
            .then(res => {
                setLoading(false);
                console.log(res);
                setOpen(true);
                if (res.data.status === 1)
                    setNotification('A confirmation email containing the link to reset your password has been sent to your email. Please check your email inbox and click the link!');
                else
                    setNotification('Your email does not exist in the system or an unknown error has occurred! Please try again later!')
            })
            .catch(error => {
                setLoading(false);
                setOpen(true);
                setNotification(error);
            });
    }

    return (
        <div className="ForgotPassword">
            <AppBar>
                <h1>Forgot password</h1>
            </AppBar>
            <Typography variant="h5" id="description">To reset your password, please enter your email.
                We will send the password reset link to the email address for your account.

                If you don't know your email address is no longer valid, please contact us for further assistance.
            </Typography>
            {loading && <LinearProgress />}
            <Box noValidate onSubmit={handleSendEmail} sx={{ mt: 3 }}>
                <form>
                    <TextField
                        style={{ width: "500px", margin: "5px" }}
                        type="email"
                        label="Email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={handleChangeEmail}
                        autoComplete="email"
                    />
                    <br />
                    <br />
                    <Button type="submit" variant="contained" color="primary">
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
