import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/paths";
import AuthContext from "../../store/store";

function RedirectInvite() {
  const authCtx = useContext(AuthContext);
  const isAuth = authCtx.isAuthenticated;
  const navigate = useNavigate();
  const locate = window.location.href;
  useEffect(() => {
    console.log(locate);
    localStorage.setItem("history", locate);
    navigate(PATH.LOGIN);
  }, [navigate, isAuth, locate]);
  return <div></div>;
}
export { RedirectInvite };
