import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/paths";
import { joinClassByCode } from "../../apis/class.api";
import { splitPath } from "../../utils/util";
import AuthContext from "../../store/store";

function HandleJoin() {
  const Ctx = useContext(AuthContext);
  const isAuth=Ctx.isAuthenticated;
  const navigate = useNavigate();
  const location = window.location.href;
  const code = splitPath(location, PATH.JOIN_CLASS_INVITATION);
  useEffect(() => {
    if(localStorage.getItem("isAuthenticated")==="1"){
      joinClassByCode(code).then((res) => {
        if (res.status === 1) {
          navigate(PATH.HOME);
        } else {
          alert(res.code.replaceAll("_"," "));
          navigate(PATH.HOME);
        }
      });
    }
    else{
      localStorage.setItem("history", location);
    navigate(PATH.LOGIN);
    }
  }, [code,isAuth,navigate]);
  return <div></div>;
}
export { HandleJoin };
