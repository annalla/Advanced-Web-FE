import React, { useEffect } from "react";
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
import { useMemo } from "react";

const DetailClass = () => {
  const [error, setError] = React.useState(null);
  const [classroom, setClassroom] = React.useState({});
  // const [classroom2, setClassroom2] = React.useState({});
  const AuthCtx = useContext(AuthContext);
  const location = useLocation();
  const classInformation=useMemo(() => classroom,[classroom])
  // const myFunction = (data) => {
  //   setClassroom(data);
  // };
  useEffect(() => {
    console.log("here")
    const id = splitPath(location.pathname, PATH.DETAIL_CLASS);
    const result = getClassById(AuthCtx.user.token, id)
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
      console.log("dm");
      console.log(result);
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Fragment>
        <Nav2 data={classInformation} valueTab={VALUE_TAB.TAB_STREAM} />
        <Stream data={classInformation} />
      </Fragment>
    );
  }
};
export default DetailClass;
