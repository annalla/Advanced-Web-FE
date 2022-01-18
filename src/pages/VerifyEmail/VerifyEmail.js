import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from "axios";

import { API_URL } from "../../constants/const";

export default function VerifyEmail() {
    let location = useLocation();
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const [notification, setNotification] = useState(<Alert severity="info">Redirecting...</Alert>);
    useEffect(() => {
        axios.get(API_URL + 'user/verify?code=' + code)
            .then(res => {
                if (res.data.status === 1) {
                    setNotification(<Alert severity="info">Verify email successfully...</Alert>);
                }
                else
                    setNotification(<Alert severity="error">An error occur...</Alert>)
            });
        return () => {
             setNotification('');
     };
    }, [code])
    return <Stack>
        {notification}
    </Stack>
}