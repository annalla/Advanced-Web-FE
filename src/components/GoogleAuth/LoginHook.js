import React, { useContext } from "react";
import { useGoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useNavigate } from "react-router";

import { PATH } from "../../constants/paths";
import AuthContext from "../../store/store";

import { API_URL } from "../../constants/const";

// refresh token
// import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;

function LoginHooks() {
  const history = useNavigate();
  const AuthCtx = useContext(AuthContext);
  const onSuccess = (res) => {
    // refreshTokenSetup(res);
    const googleId = res.googleId;
    const email = res.profileObj.email;
    const givenName = res.profileObj.givenName;
    const familyName = res.profileObj.familyName;
    axios
      .post(API_URL + "account/google-login", { googleId })
      .then((response) => {
        if (response.data.code === "GOOGLE_ID_NOT_EXISTED") {
          history(PATH.REGISTER, {
            state: {
              googleId: googleId,
              email: email,
              givenName: givenName,
              familyName: familyName,
            },
          });
        } else if (response.data.code === "SUCCESS") {
          AuthCtx.onLogin(response.data.data);
        //   const location = localStorage.getItem("history");
        //   if (location && location.include(PATH.JOIN_CLASS_INVITATION)) {
        //     localStorage.removeItem("history");
        //     history(location);
        //   } else {
            history(PATH.HOME);
        //   }
        }
      });
  };

  const onFailure = (res) => {
    alert(`Failed to login. 😢 Please try again. `);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
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
