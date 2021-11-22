import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/paths";
import { joinClassByCode } from "../../apis/class.api";
import { splitPath } from "../../utils/util";

function HandleJoin() {
  const navigate = useNavigate();
  const location = window.location.href;
  const code=splitPath(location,PATH.JOIN_CLASS_INVITATION);
  useEffect(() => {
    console.log(code);
    joinClassByCode(code)
    .then((res)=>{
        console.log(res)
        if(res.status===1){
            //navigae lop do
            navigate(PATH.HOME);
        }
        else{
            alert("Fail to join class!");
            navigate(PATH.HOME);
        }
    }
    )
  }, [code]);
  return <div></div>;
}
export { HandleJoin };
