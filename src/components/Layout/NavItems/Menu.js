import React from "react";
import { Fragment } from "react";
import '../Nav.css';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

const theme = createTheme({
    palette: {
      secondary: {
        // This is green.A700 as hex.
        main: '#2D2C2C',
      },
    },
  });
function MenuDrawer() {
    //setMenu on Left
  const anchorr = 'left';
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemButton
          selected={true}>
          <ListItem >
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/images/class/iconclass.png" variant="square" >
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Classroom"
              primaryTypographyProps={{
                fontWeight: '700',
                fontSize: '1.4rem',
              }}></ListItemText>
          </ListItem>
        </ListItemButton>

      </List>
      <Divider />
      <div className="headerBox">
        Teaching
      </div>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className="headerBox">
        Enrolled
      </div>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
    return(
        <Fragment>
            <IconButton
                onClick={toggleDrawer(anchorr, true)}
              >
                <ThemeProvider theme={theme}>
                  <MenuIcon sx={{ fontSize: 25 }} color='secondary' />
                </ThemeProvider>
              </IconButton>
              <Drawer
                anchor={anchorr}
                open={state[anchorr]}
                onClose={toggleDrawer(anchorr, false)}
              >
                {list(anchorr)}
              </Drawer>
        </Fragment>
    );
}
export { MenuDrawer};