import React, { useContext } from "react";
import { Fragment } from "react";
import "../Nav.css";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./menu.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ClassIcon from "@mui/icons-material/Class";
import AuthContext from "../../../store/store";

const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: "#2D2C2C",
    },
  },
});
function MenuDrawer() {
  const AuthCtx = useContext(AuthContext);
  //setMenu on Left
  const anchorr = "left";
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [teachingList, setTeachingList] = React.useState([]);
  const [enrolledList, setEnrolledList] = React.useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    const enrolled = AuthCtx.enrolledClass;
    const teaching = AuthCtx.teachingClass;
    if (enrolled) {
      setEnrolledList(enrolled);
    }
    if (teaching) {
      setTeachingList(teaching);
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, enrolledList, teachingList) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemButton selected={true}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Cindy Baker"
                src="/images/class/iconclass.png"
                variant="square"
                sx={{ width: 32, height: 32 }}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Classroom"
              primaryTypographyProps={{
                fontWeight: "700",
                fontSize: "1.3rem",
              }}
            ></ListItemText>
          </ListItem>
        </ListItemButton>
      </List>
      <Divider />
      <div className="headerBox">Teaching</div>
      <List>
        {teachingList.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              <ClassIcon />
            </ListItemIcon>
            <ListItemText>
              <span>{text}</span>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className="headerBox">Enrolled</div>
      <List>
        {enrolledList.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Fragment>
      <IconButton onClick={toggleDrawer(anchorr, true)}>
        <ThemeProvider theme={theme}>
          <MenuIcon sx={{ fontSize: 25 }} color="secondary" />
        </ThemeProvider>
      </IconButton>
      <Drawer
        anchor={anchorr}
        open={state[anchorr]}
        onClose={toggleDrawer(anchorr, false)}
      >
        {list(anchorr, enrolledList, teachingList)}
      </Drawer>
    </Fragment>
  );
}
export { MenuDrawer };
