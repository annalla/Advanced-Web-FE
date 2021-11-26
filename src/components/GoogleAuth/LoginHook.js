import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { GoogleLogin } from "react-google-login";

import { PATH } from "../../constants/paths";
import AuthContext from "../../store/store";

import { API_URL, GOOGLE_LOGIN_CLIENT_ID, FE_URL } from "../../constants/const";
import { splitDomain } from "../../utils/util";

const clientId = GOOGLE_LOGIN_CLIENT_ID;

function LoginHooks() {
  const history = useNavigate();
  const AuthCtx = useContext(AuthContext);
  const responseGoogle = (res) => {
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
          let locate = localStorage.getItem("history");
          if (locate !== null && locate.includes(PATH.JOIN_CLASS_INVITATION)) {
            localStorage.removeItem("history");
            locate = splitDomain(locate, FE_URL);
            history(locate);
          } else {
            history(PATH.HOME);
          }
        }
      });
  };

  const responseGoogleFailure = (res) => {
      console.log(res);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default LoginHooks;
