import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import "./ClassItem.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { SRC_IMG } from "../../constants/const";
import { PATH } from "../../constants/paths";
import { Link } from "react-router-dom";
import { Fragment } from "react";
// import CardActions from "@mui/material/CardActions";
// import { CardActionArea } from "@mui/material";

export function ClassItem({ data, isOwner }) {
  // const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const srcCoverImg =
    data.coverImageUrl === "" ? SRC_IMG.COVER_IMAGE_CLASS : data.coverImageUrl;
  const srcAvatarImg =
    data.ownerAvatar === "" ? SRC_IMG.DEFAULT_AVATAR : data.ownerAvatar;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Card sx={{ width: 300, height: 280, position: "relative" }}>
        <CardMedia
          component="img"
          height="110"
          image={srcCoverImg}
          alt="coverImage"
        />
        {!isOwner ? (
          <span className="teacherBlockImg">
            <img src={srcAvatarImg} alt="owner" />
          </span>
        ) : (
          ""
        )}
        <CardContent>
          <span className="contentInformation">
            <span>
              <span className="classNameBlock">
                <span className="className">
                  <Link to={PATH.DETAIL_CLASS_SPLIT+data.id}>{data.name}</Link>
                </span>
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
              {!isOwner ? (
                <Typography>
                  <span className="teacherBlock">
                    <span>{data.ownerName}</span>
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
    </Fragment>
  );
}
