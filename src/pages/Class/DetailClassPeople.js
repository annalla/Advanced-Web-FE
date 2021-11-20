import React, { useEffect } from "react";
import { useContext } from "react";
import { Nav2 } from "../../components/Layout/Nav2";
import { Fragment } from "react";
import { Stream } from "../../components/DetailedClass/Stream";
import { SRC_IMG, VALUE_TAB } from "../../constants/const";
import { useLocation } from "react-router";
import { getClassById } from "../../apis/class.api";
import AuthContext from "../../store/store";
import { PATH } from "../../constants/paths";
import { splitPath } from "../../utils/util";
import { People } from "../../components/DetailedClass/People";

const DetailClass = () => {
  const [error, setError] = React.useState(null);
  const [classroom, setClassroom] = React.useState({});
  const AuthCtx = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const id = splitPath(location.pathname, PATH.DETAIL_CLASS_PEOPLE);
    getClassById(AuthCtx.user.token, id)
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
        <Nav2 data={classroom} valueTab={VALUE_TAB.TAB_PEOPLE} />
        <People data={classroom} />
      </Fragment>
    );
  }
};
export default DetailClass;
