import React from "react";
import { Fragment, useState } from "react";
import '../Nav.css';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';


const theme = createTheme({
    palette: {
        secondary: {
            // This is green.A700 as hex.
            main: '#2D2C2C',
        },
    },
});

function ButtonAdd({ onOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenAdd = () => {
        setAnchorEl(null);
        onOpen();
    };

    return (
        <Fragment>
            <div className="addIcon">
                <Tooltip title="Add or join a class">
                    <IconButton
                        sx={{ width: '36', height: '36' }}
                        id="fade-button"
                        aria-controls="fade-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <ThemeProvider theme={theme}>
                            <AddIcon color="secondary" sx={{ fontSize: 30 }} />
                        </ThemeProvider>
                    </IconButton>
                </Tooltip>
            </div>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleOpenAdd}>Add a new class</MenuItem>
                {/* <MenuItem onClick={handleClose}>Join a class</MenuItem> */}
            </Menu>
        </Fragment>
    );
}
export { ButtonAdd };