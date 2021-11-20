import React, { Fragment } from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { VALUE_TAB } from "../../../constants/const";
import { PATH } from "../../../constants/paths";
import { splitPath } from "../../../utils/util";
import { useLocation } from "react-router";
import { Typography } from "@mui/material";
import "./tabItem.css";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#2D2C2C",
    },
  },
  typography: {
    fontFamily: [
      "Lucida Sans",
      "Lucida Sans Regular",
      "Lucida Grande",
      "Lucida Sans Unicode",
      "Geneva",
      "Verdana",
      "sans-serif",
    ].join(","),
  },
});
function TabsItem({ value }) {
  const location = useLocation();
  const idClass = splitPath(location.pathname, "/code/");
  const handleChange = (event, newValue) => {};

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", height: "70%", bgcolor: "#F8F9F9" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            sx={{ mt: 1.7 }}
            value={value}
            onChange={handleChange}
            centered
          >
            <a
              href={
                value !== VALUE_TAB.TAB_STREAM
                  ? PATH.DETAIL_CLASS + idClass
                  : "#"
              }
              className={value === VALUE_TAB.TAB_STREAM ? "choose" : ""}
            >
              {" "}
              <Typography
                sx={{ padding: "8px", fontSize: "20px", fontWeight: "500" }}
              >
                Stream
              </Typography>
            </a>
            <a
              href="#"
              className={value === VALUE_TAB.TAB_CLASSWORK ? "choose" : ""}
            >
              {" "}
              <Typography
                sx={{ padding: "8px", fontSize: "20px", fontWeight: "500" }}
              >
                Stream
              </Typography>
            </a>
            <a
              href={
                value !== VALUE_TAB.TAB_PEOPLE
                  ? PATH.DETAIL_CLASS_PEOPLE + idClass
                  : "#"
              }
              className={value === VALUE_TAB.TAB_PEOPLE ? "choose" : ""}
            >
              {" "}
              <Typography
                sx={{ padding: "8px", fontSize: "20px", fontWeight: "500" }}
              >
                People
              </Typography>
            </a>
            <a
              href="#"
              className={value === VALUE_TAB.TAB_GRADE ? "choose" : ""}
            >
              {" "}
              <Typography
                sx={{ padding: "8px", fontSize: "20px", fontWeight: "500" }}
              >
                Grades
              </Typography>
            </a>
          </Tabs>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
export { TabsItem };
