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
      joinClassByCode(code).then((res) => {
        console.log(res);
        if (res.status === 1) {
          navigate(PATH.HOME);
        } else {
          alert(res.code.replaceAll("_"," "));
          navigate(PATH.HOME);
        }
      });
  
  }, [code,isAuth,navigate]);
  return <div></div>;
}
export { HandleJoin };