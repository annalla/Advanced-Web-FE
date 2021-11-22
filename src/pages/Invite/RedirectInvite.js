import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import {PATH} from "../../constants/paths"

function RedirectInvite() {
  const navigate = useNavigate();
  const location=useLocation().pathname;
  const locate=window.location.href;
  useEffect(()=>{
      console.log(location);
      console.log(locate);
      localStorage.setItem("history",locate);
      console.log(localStorage.getItem("history"))
      navigate(PATH.LOGIN);
  },[location,navigate])
  return (
    <div>
    </div>
  );
}
export {RedirectInvite}