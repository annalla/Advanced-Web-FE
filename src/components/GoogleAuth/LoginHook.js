import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'

// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId =
    '318817895430-f6ck70ste47549mqi49f5m6vnum18sup.apps.googleusercontent.com';

function LoginHooks() {
    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        alert(
            `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        );
        refreshTokenSetup(res);
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

