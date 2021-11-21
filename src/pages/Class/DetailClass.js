import React, { useEffect, useMemo } from "react";
import { useContext } from "react";
import { Nav2 } from "../../components/Layout/Nav2";
import { Fragment } from "react";
import { Stream } from "../../components/DetailedClass/Stream";
import { SRC_IMG, VALUE_TAB } from "../../constants/const";
import { PATH } from "../../constants/paths";
import { useLocation } from "react-router";
import { getClassById } from "../../apis/class.api";
import AuthContext from "../../store/store";
import { splitPath } from "../../utils/util";
const dict = {};
const DetailClass = () => {
  const [error, setError] = React.useState(null);
  const [classroom, setClassroom] = React.useState({});
  const AuthCtx = useContext(AuthContext);
  const location = useLocation();
  const classInformation = useMemo(() => classroom, [classroom]);
  const id = splitPath(location.pathname, PATH.DETAIL_CLASS);
  const token = AuthCtx.user.token;
  const information = useMemo(() => {
    if (id in dict) {
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
              coverImageUrl:
                res.data.coverImageUrl === ""
                  ? SRC_IMG.COVER_IMAGE_CLASS
                  : res.data.coverImageUrl,
            };
            setClassroom(information);
            dict[id] = information;
            console.log(res.data);
            // myFunction(information);
            // return () => {
            //   setClassroom({});
            // };
          } else {
            setError(res);
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [id, token]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Fragment>
        <Nav2 data={information} valueTab={VALUE_TAB.TAB_STREAM} />
        <Stream data={information} />
      </Fragment>
    );
  }
};
export default DetailClass;
