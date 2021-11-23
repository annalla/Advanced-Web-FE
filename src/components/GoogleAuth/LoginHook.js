import React, {useContext} from 'react';
import { useGoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import axios from 'axios';
import { useNavigate } from 'react-router';

import { PATH } from '../../constants/paths';
import AuthContext from '../../store/store';

import { API_URL, GOOGLE_LOGIN_CLIENT_ID,FE_URL } from '../../constants/const';
import { splitDomain } from '../../utils/util';
// refresh token
// import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId = GOOGLE_LOGIN_CLIENT_ID

function LoginHooks() {
    const history = useNavigate();
    const AuthCtx = useContext(AuthContext);
    const onSuccess = (res) => {
        // refreshTokenSetup(res);
        const googleId = res.googleId;
        const email = res.profileObj.email;
        const givenName = res.profileObj.givenName;
        const familyName = res.profileObj.familyName;
        axios.post(API_URL + "account/google-login", { googleId })
            .then((response) => {
                if (response.data.code === "GOOGLE_ID_NOT_EXISTED") {
                    history(PATH.REGISTER, { state: { googleId: googleId, email: email, givenName: givenName, familyName: familyName } })
                }
                else if (response.data.code === "SUCCESS"){
                    AuthCtx.onLogin(response.data.data);
                    let locate = localStorage.getItem("history");
                    if (
                      locate !== null &&
                      locate.includes(PATH.JOIN_CLASS_INVITATION)
                    ) {
                      localStorage.removeItem("history");
                      console.log(localStorage.getItem("history"));
                      locate = splitDomain(locate, FE_URL);
                      history(locate);
                    } else {
                      history(PATH.HOME);
                    }
                }
            })
    };

    const onFailure = (res) => {
        console.log(res);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
        // responseType: 'code',
        // prompt: 'consent',
    });

    return (
        <GoogleButton
            type="light" // can be light or dark
            onClick={signIn}
        />
    );
}

export default LoginHooks;