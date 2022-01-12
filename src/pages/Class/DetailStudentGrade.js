import React, { useEffect, useMemo } from "react";
import { useContext } from "react";
import { Nav2 } from "../../components/Nav/Nav2";
import { Fragment } from "react";
import { VALUE_TAB } from "../../constants/const";
import { PATH } from "../../constants/paths";
import { useLocation } from "react-router";
import AuthContext from "../../store/store";
import { splitPath } from "../../utils/util";
import { ERROR_CODE } from "../../constants/errorCode";
import Loading from "../../components/Loading/Loading";

const DetailStudentClass = () => {
    const [error, setError] = React.useState(null);
    const [loading, setLoading]=React.useState(true);
    const AuthCtx = useContext(AuthContext);
    const location = useLocation();
    const id = splitPath(location.pathname, PATH.STUDENT_GRADE_SPLIT);
    const token = AuthCtx.user.token;
    useEffect(()=>{
        console.log(id);
    })
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <Fragment>
          <Nav2 id={id} token={token} valueTab={VALUE_TAB.TAB_GRADE} />
         {loading?<Loading/>:""}
          <h1>Hello</h1>
        </Fragment>
      );
    }
};
export default DetailStudentClass;
