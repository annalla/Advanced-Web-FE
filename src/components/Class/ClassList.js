import React, { useState, useEffect, useContext, Fragment } from "react";
import { ClassItem } from "./ClassItem";
import "./ClassList.css";
import AuthContext from "../../store/store";
import { getClassListApi } from "../../apis/class.api";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { JWT_TYPE } from "../../constants/const";
import { ERROR_CODE } from "../../constants/errorCode";
import Loading from "../Loading/Loading";


const ClassList = ({ isTeaching }) => {
  const isTeachingConst = isTeaching;
  const AuthCtx = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [isHeader, setIsHeader] = useState(false);
  const headerList = isTeaching ? "Teaching" : "Enrolled";
  const jwt_type = isTeaching
    ? JWT_TYPE.JWT_TYPE_TEACHER
    : JWT_TYPE.JWT_TYPE_STUDENT;
  const token = AuthCtx.user.token;
  useEffect(() => {
    setIsLoading(true);
    getClassListApi(token, jwt_type)
      .then((res) => {
        if (res.status === 1) {
          setIsLoading(false);
          setItems(res.data);
          if (res.data.length > 0) {
            if (isTeachingConst) {
              AuthCtx.handleTeaching(res.data);
            } else {
              AuthCtx.handleEnrolled(res.data);
            }
            setIsHeader(true);
          }
        } else {
          setIsLoading(false);
          setError(ERROR_CODE[res] || "Failed to get classrooms!");
        }
      })
      .catch((err) => {
        setError(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, jwt_type, isTeachingConst]);

  if (error) {
    return <div>Error: {ERROR_CODE[error.message]}</div>;
  } else {
    return (
      <div>
        {isLoading && <Loading></Loading>}
        <Box sx={{ backgroundColor: grey[50], ml: 1, mr: 2, borderRadius: 3 }}>
          {isHeader ? (
            <Fragment>
              <Typography
                sx={{
                  mt: 3,
                  ml: 1,
                  mb: 0,
                  fontSize: 22,
                  fontFamily: "Raleway, Arial",
                }}
                variant="h5"
                gutterBottom
                component="div"
              >
                {headerList}
              </Typography>

              <div className="classList">
                {items.map((item) => (
                  <div className="classItem" key={item.id}>
                    <ClassItem data={item} isOwner={isTeaching} />
                  </div>
                ))}
              </div>
            </Fragment>
          ) : (
            ""
          )}
        </Box>
      </div>
    );
  }
};
export { ClassList };
