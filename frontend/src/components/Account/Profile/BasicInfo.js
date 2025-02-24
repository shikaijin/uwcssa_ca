import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import Edit from "./Info/Edit";
import EditAvatar from "./Info/EditAvatar";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { usePermit } from "../../../Hooks/usePermit";
import uwindsor from "../../../static/svg icons/uwindsor.svg";

const useStyles = makeStyles({
  root: {
    // marginTop: "1rem",
    maxWidth: "960px",
    margin: "auto",
  },
  avatar: {
    top: "-75px",
    marginLeft: "1rem",
  },
  edit: {
    float: "right",
  },
  info: {
    minHeight: "150px",
  },
  outer: {
    height: "90px",
  },
});
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  border: `2px solid ${theme.palette.background.paper}`,
}));
export default function BasicInfo({ user, ownerID }) {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);
  const [editAvatarOpen, setEditAvatarOpen] = useState(false);

  const isPermit = usePermit(ownerID, "admin");

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleEditAvatarClickOpen = () => {
    setEditAvatarOpen(true);
  };
  const handleEditAvatarClose = () => {
    setEditAvatarOpen(false);
  };

  return (
    <div>
      <div className={classes.root}>
        <Card elevation={0} className={classes.header}>
          <CardActionArea onClick={isPermit ? handleEditClickOpen : undefined}>
            <img
              src={
                user.backGroundImgURL
                  ? user.backGroundImgURL
                  : "https://uwcssabucket53243-master.s3.us-east-2.amazonaws.com/public/profile_Background.png"
              }
              alt="backGroundImgURL"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: 5,
              }}
            />
          </CardActionArea>
          <CardContent className={classes.info}>
            <Box className={classes.outer}>
              <Badge
                onClick={isPermit ? handleEditAvatarClickOpen : null}
                invisible={!user.badges.includes("top100")}
                overlap="circular"
                // anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    alt="top100"
                    src={
                      "https://uwcssabucket53243-master.s3.us-east-2.amazonaws.com/public/AvatarIcons/top100.png"
                    }
                    sx={{
                      width: 200,
                      height: 200,
                      top: "-37px",
                      right: "-52px",
                      borderRadius: 0,
                    }}
                  />
                }
                sx={{
                  zIndex: "1",
                  "& .MuiBadge-anchorOriginTopRightCircular": {
                    transform: "translate(0, 0)",
                    cursor: "pointer",
                  },
                }} // 直接找到他所对应的className，修改位置
              >
                <Badge
                  invisible={!user.badges.includes("uwindsor")}
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <SmallAvatar
                      alt="uwindsor"
                      src={uwindsor}
                      sx={{ top: "-75px", right: "10px", marginLeft: "1rem" }}
                    />
                  }
                >
                  <Avatar
                    alt="avatar"
                    src={
                      user.avatarImgURL
                        ? user.avatarImgURL
                        : "https://uwcssabucket53243-master.s3.us-east-2.amazonaws.com/public/basicInfo_Avatar.png"
                    }
                    sx={{ width: 150, height: 150, cursor: "pointer" }}
                    className={classes.avatar}
                  />
                </Badge>
              </Badge>
              {isPermit && (
                <Button
                  variant="contained"
                  endIcon={<EditIcon />}
                  color="primary"
                  className={classes.edit}
                  onClick={handleEditClickOpen}
                >
                  点击编辑
                </Button>
              )}
            </Box>
            <Typography
              gutterBottom
              variant="h5"
              noWrap
              sx={{ fontWeight: "700" }}
            >
              {user.username}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              noWrap
              sx={{ fontWeight: "700" }}
            >
              {!/[^a-zA-Z,(,)]+$/.test(user.lastName) &&
              !/[^a-zA-Z,(,)]+$/.test(user.firstName)
                ? `${user.firstName} ${user.lastName}`
                : `${user.lastName} ${user.firstName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.intro}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Edit editOpen={editOpen} user={user} handleEditClose={handleEditClose} />
      <EditAvatar
        editAvatarOpen={editAvatarOpen}
        user={user}
        handleEditAvatarClose={handleEditAvatarClose}
      />
    </div>
  );
}
