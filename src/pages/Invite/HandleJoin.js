import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/paths";
import { joinClassByCode } from "../../apis/class.api";
import { splitPath } from "../../utils/util";
import AuthContext from "../../store/store";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function HandleJoin() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const Ctx = useContext(AuthContext);
  const isAuth = Ctx.isAuthenticated;
  const navigate = useNavigate();
  const location = window.location.href;
  const code = splitPath(location, PATH.JOIN_CLASS_INVITATION);
  useEffect(() => {
    console.log(isAuth)
    console.log(localStorage.getItem("isAuthenticated"))
    if (localStorage.getItem("isAuthenticated") === "1") {
      if (code.length === 0) {
        setError("CODE OF CLASS IS EMPTY");
        setOpen(true);
      } else {
        joinClassByCode(code).then((res) => {
          if (res.status === 1) {
            navigate(PATH.HOME);
          } else {
            setError(res.code.replaceAll("_", " "));
            setOpen(true);
          }
        });
      }
    } else {
      localStorage.setItem("history", location);
      navigate(PATH.LOGIN);
    }
  }, [location, code, isAuth, navigate]);

  return (
    <Stack sx={{ width: "100%",display:"flex",justifyContent:"center",my:"10px" }}>
      {open ? (
        <Alert
        sx={{width:"50%",mx:"25%"}}
          severity="error"
          action={
            <Button
              onClick={() => navigate(PATH.HOME)}
              color="inherit"
              size="small"
            >
              UNDO
            </Button>
          }
        >
          {error}
        </Alert>
      ) : (
        ""
      )}
    </Stack>
  );
}
export { HandleJoin };
