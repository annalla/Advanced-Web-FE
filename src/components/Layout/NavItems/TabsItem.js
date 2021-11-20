// import React, { Fragment } from "react";
// import Tabs from "@mui/material/Tabs";
// import Box from "@mui/material/Box";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { VALUE_TAB } from "../../../constants/const";
// import { PATH } from "../../../constants/paths";
// import { splitPath } from "../../../utils/util";
// import { useLocation } from "react-router";
// import { Typography } from "@mui/material";
// import "./tabItem.css";
// const theme = createTheme({
//   palette: {
//     secondary: {
//       main: "#2D2C2C",
//     },
//   },
//   typography: {
//     fontFamily: [
//       "Lucida Sans",
//       "Lucida Sans Regular",
//       "Lucida Grande",
//       "Lucida Sans Unicode",
//       "Geneva",
//       "Verdana",
//       "sans-serif",
//     ].join(","),
//   },
// });
// function TabsItem({ value }) {
//   const location = useLocation();
//   const idClass = splitPath(location.pathname, "/:code");
//   const handleChange = (event, newValue) => {};

//   return (
//     <Fragment>
//       <ThemeProvider theme={theme}>
//         <Box sx={{ width: "100%", height: "70%", bgcolor: "#F8F9F9" }}>
//           <Tabs
//             textColor="secondary"
//             indicatorColor="secondary"
//             sx={{ mt: 1.7 }}
//             value={value}
//             onChange={handleChange}
//             centered
//           >
//             <a
//               href={
//                 value !== VALUE_TAB.TAB_STREAM
//                   ? PATH.DETAIL_CLASS + idClass
//                   : "#"
//               }
//               className={value === VALUE_TAB.TAB_STREAM ? "choose" : ""}
//             >
//               {" "}
//               <Typography
//                 sx={{ padding: "8px", fontSize: "20px", fontWeight: "500" }}
//               >
//                 Stream
//               </Typography>
//             </a>
//             <a
//               href="#"
//               className={value === VALUE_TAB.TAB_CLASSWORK ? "choose" : ""}
//             >
//               {" "}
//               <Typography
//                 sx={{ padding: "8px", fontSize: "20px", fontWeight: "500" }}
//               >
//                 Classwork
//               </Typography>
//             </a>
//             <a
//               href={
//                 value !== VALUE_TAB.TAB_PEOPLE
//                   ? PATH.DETAIL_CLASS_PEOPLE + idClass
//                   : "#"
//               }
//               className={value === VALUE_TAB.TAB_PEOPLE ? "choose" : ""}
//             >
//               {" "}
//               <Typography
//                 sx={{ padding: "8px", fontSize: "20px", fontWeight: "500" }}
//               >
//                 People
//               </Typography>
//             </a>
//             <a
//               href="#"
//               className={value === VALUE_TAB.TAB_GRADE ? "choose" : ""}
//             >
//               {" "}
//               <Typography
//                 sx={{ padding: "8px", fontSize: "20px", fontWeight: "500" }}
//               >
//                 Grades
//               </Typography>
//             </a>
//           </Tabs>
//         </Box>
//       </ThemeProvider>
//     </Fragment>
//   );
// }
// export { TabsItem };

import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { VALUE_TAB } from "../../../constants/const";
import { PATH } from "../../../constants/paths";
import { splitPath } from "../../../utils/util";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: "#2D2C2C",
    },
  },
});
const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontSize: 18,
    fontWeight: 500,
    marginRight: theme.spacing(1),
    color: "#636464",
    opacity: 0.8,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#2D2C2C",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#2D2C2C",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);
function TabsItem({ value }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState(null);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    const id = splitPath(location.pathname, "/:code");
    console.log(id);
    if (newValue === VALUE_TAB.TAB_PEOPLE) {
      setPath(PATH.DETAIL_CLASS_PEOPLE + id);
    }
    else if (newValue === VALUE_TAB.TAB_STREAM) {
      setPath(PATH.DETAIL_CLASS + id);
    }
    navigate(path);
  };
  return (
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
          <AntTab label="Stream"></AntTab>
          <AntTab label="Classwork"></AntTab>
          <AntTab label="People"></AntTab>
          <AntTab label="Grades"></AntTab>
        </Tabs>
      </Box>
    </ThemeProvider>
  );
}
export { TabsItem };
