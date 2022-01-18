import { Fragment, useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import axios from "axios";

import './Notification.css';
import "../Nav.css";
import { API_URL } from "../../../constants/const";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#2D2C2C",
        },
    },
});

const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

function Notification() {
    const [anchorElAccountMenu, setAnchorElAccountMenu] = useState(null);
    const openAccountMenu = Boolean(anchorElAccountMenu);
    const [notifications, setNotifications] = useState([]);
    const handleClickNotification = (event) => {
        setAnchorElAccountMenu(event.currentTarget);
        axios.get(API_URL + 'notification/list?is-read=false', { headers }).then(
            res => {
                if (res.data.data) {
                    const resNotification = res.data.data;
                    resNotification.map(notification => {
                        var date = new Date(notification.createdAt * 1000);
                        notification.createdAt = date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear() + ' - '
                            + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                        return notification;
                    })
                    setNotifications(resNotification);
                }
            }
        )
    };

    const handleMarkAsRead = (notificationId) => {
        axios.post(API_URL + 'notification/mark-read', { notificationId }, { headers }).then(
            res => {
                if (res.data.status) {
                    var newListNotifications = notifications.filter(notification => notification.id !== notificationId);
                    setNotifications(newListNotifications);
                }
            }
        )
    }

    const handleCloseNotification = () => {
        setAnchorElAccountMenu(null);
    };
    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <Tooltip title="Notifications">
                    <IconButton onClick={handleClickNotification} id="icon">
                        <MailIcon color="action" />
                    </IconButton>

                </Tooltip>
                <Menu
                    anchorEl={anchorElAccountMenu}
                    open={openAccountMenu}
                    onClose={handleCloseNotification}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 0.1,
                            "& .MuiAvatar-root": {
                                width: 100,
                                height: 37,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    {notifications.map((notification) => {
                        return <div key={notification.id}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {notification.title}
                                </Typography>
                                <Typography variant="body2">
                                    {notification.message}
                                    <br />
                                    {notification.createdAt}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => { handleMarkAsRead(notification.id) }}>Mark as read</Button>
                            </CardActions>
                            <Divider />
                        </div>
                    })}
                </Menu>
            </ThemeProvider>
        </Fragment>
    );
}
export { Notification };
