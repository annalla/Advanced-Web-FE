import React, { useEffect } from "react";
import { useContext } from "react";
import { Nav2 } from "../../components/Layout/Nav2";
import { Fragment } from "react";
import { Stream } from "../../components/DetailedClass/Stream";
import { SRC_IMG } from "../../constants/const";
import { useLocation } from "react-router";
import { getClassById } from "../../apis/class.api";
import AuthContext from "../../store/store";

const DetailClass = () => {
  const [error, setError] = React.useState(null);
  const [classroom, setClassroom] = React.useState({});
  const AuthCtx = useContext(AuthContext);
  const location = useLocation();

  // const myFunction = (data) => {
  //   setClassroom(data);
  // };
  useEffect(() => {
    let str = location.pathname.split("/:code");
    str = str[str.length - 1].split("?");
    const id = str[0];
    getClassById(AuthCtx.user.token, id)
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
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Fragment>
        <Nav2 />
        <Stream data={classroom} />
      </Fragment>
    );
  }
};
export default DetailClass;
