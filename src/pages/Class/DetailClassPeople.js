import React, { useEffect } from "react";
import { useContext } from "react";
import { Nav2 } from "../../components/Layout/Nav2";
import { Fragment } from "react";
import { VALUE_TAB } from "../../constants/const";
import { useLocation } from "react-router";
import { getClassById } from "../../apis/class.api";
import AuthContext from "../../store/store";
import { PATH } from "../../constants/paths";
import { splitPath } from "../../utils/util";
import { People } from "../../components/DetailedClass/People";
import { useMemo } from "react";

const DetailClassPeople = () => {
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const Id = splitPath(location.pathname, PATH.DETAIL_CLASS_PEOPLE);
  const [classroom, setClassroom] = React.useState({ id: Id });
  const AuthCtx = useContext(AuthContext);
  const classInformation = useMemo(() => classroom, [classroom]);
  useEffect(() => {
    getClassById(AuthCtx.user.token, Id)
      .then((res) => {
        if (res.status === 1) {
          const data = {
            name: res.data.name,
            id: res.data.id,
            inviteStudentCode: res.data.inviteStudentCode,
            inviteTeacherCode: res.data.inviteTeacherCode,
            studentArray: res.data.studentArray,
            teacherArray: res.data.teacherArray,
          };
          setClassroom(data);
          console.log(res.data);
        } else {
          setError(res);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Fragment>
        <Nav2 data={classInformation} valueTab={VALUE_TAB.TAB_PEOPLE} />
        <People data={classInformation} />
      </Fragment>
    );
  }
};
export default DetailClassPeople;
