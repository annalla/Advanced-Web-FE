import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./ClassItem.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export function ClassItem({data}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const isYour = true;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    if (isYour) {
        return (
            <Card sx={{ width: 300,height:250 }} >
                    <CardMedia
                        component="img"
                        height="140"
                        image="images/class/bg6.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                            <div className="classNameBlock">
                                <div >{data.classname}</div>
                                <div>
                                    <IconButton
                                        id="fade-button"                                        aria-controls="fade-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                    <MoreVertIcon color="action" sx={{ fontSize: 20 }} />
                                    </IconButton>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                                    </Menu>

                                </div>
                            </div>
                        <Typography variant="body2" color="text.secondary">
                            {data.topic}
                        </Typography>
                    </CardContent>
            </Card>
        );
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="images/class/bg3.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="div">
                        Name Class
                    </Typography> */}

                    <Typography>
                        <div className="classNameBlock">
                            <div >Class Name</div>
                            <div>
                                <Button
                                    id="fade-button"
                                    aria-controls="fade-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >

                                    <MoreVertIcon color="action" sx={{ fontSize: 28 }} />

                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>Unregister</MenuItem>

                                </Menu>

                            </div>
                        </div>
                    </Typography>
                    <Typography>
                        <div class="teacherBlock">
                            <img src="images/class/backgroundclass.jpg" alt="Italian Trulli" />
                            <div>Giang vien</div>
                        </div>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
