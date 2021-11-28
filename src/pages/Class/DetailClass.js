import React, { useEffect, useMemo } from "react";
import { useContext } from "react";
import { Nav2 } from "../../components/Nav/Nav2";
import { Fragment } from "react";
import { Stream } from "../../components/DetailedClass/Stream/Stream";
import { SRC_IMG, VALUE_TAB } from "../../constants/const";
import { PATH } from "../../constants/paths";
import { useLocation } from "react-router";
import { getClassById } from "../../apis/class.api";
import AuthContext from "../../store/store";
import { splitPath } from "../../utils/util";
import { JWT_TYPE } from "../../constants/const";
import { ERROR_CODE } from "../../constants/errorCode";
import Loading from "../../components/Loading/Loading";

const dict = {};

const DetailClass = () => {
  const [error, setError] = React.useState(null);
  const [classroom, setClassroom] = React.useState({});
  const [loading,setLoading]=React.useState(true);
  const AuthCtx = useContext(AuthContext);
  const location = useLocation();
  const id = splitPath(location.pathname, PATH.DETAIL_CLASS_SPLIT);
  const token = AuthCtx.user.token;
  const information = useMemo(() => {
    if (id in dict) {
      setLoading(false)
      return dict[id];
    }
    return classroom;
  }, [id, classroom]);
  // const myFunction = (data) => {
  //   setClassroom(data);
  // };
  useEffect(() => {
    if (id in dict) {
    } else {
      getClassById(token, id)
        .then((res) => {
          if (res.status === 1) {
            const information = {
              name: res.data.name,
              code: res.data.code,
              description: res.data.description,
              id: res.data.id,
              isCustom:
                res.data.jwtType.toString() === JWT_TYPE.JWT_TYPE_TEACHER
                  ? true
                  : false,
              coverImageUrl:
                res.data.coverImageUrl === ""
                  ? SRC_IMG.COVER_IMAGE_CLASS
                  : res.data.coverImageUrl,
            };
            setClassroom(information);
            setLoading(false);
            dict[id] = information;
          } else {
            setError(ERROR_CODE[res] || "Get class by id failed!");
          }
        })
        .catch((err) => {
          setError(ERROR_CODE[err] || "Get class by id failed!");
        });
    }
  }, [id, token]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Fragment>
        <Nav2 data={information} valueTab={VALUE_TAB.TAB_STREAM} />
       {loading?<Loading/>:""}
        <Stream data={information} />
      </Fragment>
    );
  }
};
export default DetailClass;
