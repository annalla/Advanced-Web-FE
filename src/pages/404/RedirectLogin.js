import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/paths";

function RedirectLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")!=="1"){
      navigate(PATH.LOGIN);
    }
  }, [navigate]);
  return <div></div>;
}
export { RedirectLogin };
