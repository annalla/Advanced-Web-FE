import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { PATH } from '../../constants/paths';
import { useRef } from 'react';

// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId =
    '318817895430-f6ck70ste47549mqi49f5m6vnum18sup.apps.googleusercontent.com';

function LoginHooks() {
    const isMountedRef = useRef(null);
    const history = useNavigate();
    const onSuccess = (res) => {
        isMountedRef.current = true;
        console.log('Login Success: currentUser:', res.profileObj);
        //alert(
        //    `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        //);
        refreshTokenSetup(res);
        const googleId = res.googleId;
        const email = res.profileObj.email;
        const givenName = res.profileObj.givenName;
        const familyName = res.profileObj.familyName;
        axios.post("http://localhost:8002/api/v1/account/google-login", { googleId })
            .then((response) => {
                if (response.data.code === "GOOGLE_ID_NOT_EXISTED") {
                    if(isMountedRef.current){
                    history(PATH.REGISTER, { state: { googleId: googleId, email: email, givenName: givenName, familyName: familyName } })
                    }
                }
            })
        isMountedRef.current = false;
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
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

