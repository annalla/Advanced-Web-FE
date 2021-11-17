import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import "./ClassItem.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

export function ClassItem({ data, isTeacher }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const srcCoverImg =
    data.coverImageUrl === "" ? "images/class/bg6.jpg" : data.coverImageUrl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ width: 300, height: 280 }}>
      <CardMedia
        component="img"
        height="110"
        image="images/class/bg6.jpg"
        alt="green iguana"
      />
      <CardContent>
        {!isTeacher ? (
          <span className="teacherBlockImg">
            <img src={srcCoverImg} />
          </span>
        ) : (
          ""
        )}
        <span className="contentInfor">
          <span>
            <span className="classNameBlock">
              <span className="className">{data.name}</span>
              <span>
                <IconButton
                  id="fade-button"
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon color="action" sx={{ fontSize: 20 }} />
                </IconButton>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                </Menu>
              </span>
            </span>
            <Typography variant="body2" color="text.secondary">
              <span className="classTopic"> {data.description}</span>
            </Typography>
            {!isTeacher ? (
              <Typography>
                <span className="teacherBlock">
                  <span>data.owner</span>
                </span>
              </Typography>
            ) : (
              ""
            )}
          </span>
          <span className="blockEnd">
            <Divider sx={{ color: "primary.main" }} />
            <span className="work">
              <AssignmentIndOutlinedIcon sx={{ fontSize: 30 }} color="" />
            </span>
          </span>
        </span>
      </CardContent>
    </Card>
  );
}
