import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Storage from "@aws-amplify/storage";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
import InsideLeftLineTag from "./tag";

const useStyles = makeStyles((theme) => ({
  cardDetails: {
    width: 300,
    borderRadius: 16,
  },
  cardMedia: {
    display: "block",
    marginLeft: "auto",
    marginRight: " auto",
    width: "50%",
    position: "relative",
  },

  s3image: {
    width: "162px",
    height: "162px",
    borderRadius: "8px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "112px",
      height: "112px",
      marginTop: "2.5rem",
    },
  },
  statLabel: {
    fontSize: 12,
    color: grey[500],
    fontWeight: 500,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
  },
}));

export default function PastEvent({ event }) {
  const classes = useStyles();
  const [posterURL, setPosterURL] = useState(null);
  // console.log("event", event);
  const { content, title, posterImgS3Key, location, startDate, topic } = event;

  useEffect(() => {
    const getPoster = async () => {
      try {
        const posterAccessURL = await Storage.get(posterImgS3Key, {
          level: "public",
          expires: 120,
          download: false,
        });
        setPosterURL(posterAccessURL);
      } catch (error) {
        console.error("error accessing the Image from s3", error);
        setPosterURL(null);
      }
    };
    if (posterImgS3Key) {
      getPoster();
    } else {
      setPosterURL(
        "https://media-exp1.licdn.com/dms/image/C5603AQHwt3NgA8rYHw/profile-displayphoto-shrink_200_200/0/1616353723146?e=1640822400&v=beta&t=wzrF9eUlq7YnsTg-1cpH4LrYXm2oCCOHHHp0ac1hmgM"
      );
    }
  }, [posterImgS3Key]);

  // const userInfo = useSelector((state) => state.userAuth);

  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
      key={event.title}
      sx={{ marginBottom: "1rem" }}
    >
      <Card container className={classes.cardDetails}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="194"
            image={posterURL}
            style={{ objectFit: "cover", opacity: 0.6 }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            <InsideLeftLineTag />
          </Box>
        </Box>
        <CardContent sx={{ opacity: 0.6 }}>
          <Typography variant="subtitle2" gutterBottom>
            时间：{startDate.slice(5, 7)}月{startDate.slice(8, 10)}号{" "}
            {startDate.slice(11, 16)}
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            gutterBottom
          ></Typography>
          <Box style={{ maxHeight: "30px", overflow: "hidden" }}>
            <Typography
              variant="subtitle1"
              style={{
                wordBreak: "break-word",
                overflow: "hidden",
              }}
              gutterBottom
            >
              <b>{title}</b>
            </Typography>
          </Box>

          {location ? (
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              地址： {location}
            </Typography>
          ) : (
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              地址： 无
            </Typography>
          )}
          {topic.name ? (
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              类别： {topic.name}
            </Typography>
          ) : (
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              类别： 无
            </Typography>
          )}

          <Box sx={{ overflow: "hidden", height: "30px" }}>
            <Grid container wrap="nowrap" sx={{ my: 1, mx: "auto" }}>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {content}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
