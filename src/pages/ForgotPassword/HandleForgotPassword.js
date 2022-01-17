import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from "axios";

import { API_URL } from "../../constants/const";

export default function HandleForgotPassword() {
    const navigate = useNavigate();
    let location = useLocation();
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const [notification, setNotification] = useState(<Alert severity="info">Redirecting...</Alert>);
    useEffect(() => {
        axios.get(API_URL + 'user/verify?code=' + code)
            .then(res => {
                console.log(res.data)
                if (res.data.status === 1) {
                    setNotification(<Alert severity="info">Successfully...</Alert>);
                    if (res.data.data.token) {
                        localStorage.setItem("token", res.data.data.token);
                        navigate("/update-password");
                    }
                }
                else
                    setNotification(<Alert severity="error">An error occur...</Alert>)
            });
        return () => {
             setNotification('');
     };
    }, [code, navigate])
    return <Stack>
        {notification}
    </Stack>
}