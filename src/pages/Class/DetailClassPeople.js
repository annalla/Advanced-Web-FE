import React, { useEffect, useMemo } from "react";
import { useContext } from "react";
import { Nav2 } from "../../components/Nav/Nav2";
import { Fragment } from "react";
import { VALUE_TAB } from "../../constants/const";
import { useLocation } from "react-router";
import { getClassById } from "../../apis/class.api";
import AuthContext from "../../store/store";
import { PATH } from "../../constants/paths";
import { splitPath } from "../../utils/util";
import { People } from "../../components/DetailedClass/People/People";
import { JWT_TYPE } from "../../constants/const";
import { ERROR_CODE } from "../../constants/errorCode";
import Loading from "../../components/Loading/Loading";

var dict = {};
const DetailClassPeople = () => {
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const Id = splitPath(location.pathname, PATH.DETAIL_CLASS_PEOPLE_SPLIT);
  const [classroom, setClassroom] = React.useState({});
  const AuthCtx = useContext(AuthContext);
  const token = AuthCtx.user.token;
  const [loading,setLoading]=React.useState(true);
  const information = useMemo(() => {
    if (Id in dict) {
      setLoading(false);
      return dict[Id];
    }
    return classroom;
  }, [Id, classroom]);
  useEffect(() => {
    if (Id in dict) {
    } else {
      getClassById(token, Id)
        .then((res) => {
          if (res.status === 1) {
            const data = {
              name: res.data.name,
              id: res.data.id,
              inviteStudentCode: res.data.inviteStudentCode,
              inviteTeacherCode: res.data.inviteTeacherCode,
              studentArray: res.data.studentArray,
              teacherArray: res.data.teacherArray,
              isCustom:
                res.data.jwtType.toString() === JWT_TYPE.JWT_TYPE_TEACHER
                  ? true
                  : false,
            };
            setClassroom(data);
            setLoading(false);
            dict[Id] = data;
          } else {
            setError(ERROR_CODE[res] || "Get class by id failed!");
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [Id,token]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Fragment>
        <Nav2 data={information} valueTab={VALUE_TAB.TAB_PEOPLE} />
        {loading?<Loading/>:""}
        <People data={information} />
      </Fragment>
    );
  }
};
export default DetailClassPeople;
