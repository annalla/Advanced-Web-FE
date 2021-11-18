import React, { useState, useEffect, useContext, Fragment } from "react";
import { ClassItem } from "./ClassItem";
import "./ClassList.css";
import AuthContext from "../../store/store";
import { getClassListApi } from "../../apis/class.api";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const ClassList = ({ isTeaching}) => {
  const AuthCtx = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [isHeader, setIsHeader] = useState(false);
  const headerList = isTeaching ? "Teaching" : "Enrolled";
  useEffect(() => {
    const jwt_type = isTeaching ? "1" : "2";
    getClassListApi(AuthCtx.user.token, jwt_type)
      .then((res) => {
        if (res.status === 1) {
          setIsLoaded(true);
          setItems(res.data);
          if (res.data.length > 0) {
			if(isTeaching){
				AuthCtx.handleTeaching(res.data);
			}
			else{
				AuthCtx.handleEnrolled(res.data);
			}
            setIsHeader(true);
          }
        } else {
          setIsLoaded(true);
          setError(res);
        }
      })
      .catch((err) => {
        setIsLoaded(true);
      });
  }, [AuthCtx, isTeaching, items]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box sx={{ backgroundColor: grey[50], ml: 2, mr: 2,borderRadius:3 }}>
        {isHeader ? (
          <Fragment>
            <Typography
              sx={{
                mt: 3,
                ml: 1,
                mb: 1,
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
                  <ClassItem data={item} isTeacher={isTeaching}/>
                </div>
              ))}
            </div>
          </Fragment>
        ) : (
          ""
        )}
      </Box>
    );
  }
};
export { ClassList }; //new
