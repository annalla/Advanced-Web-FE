import React from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { Paper } from "@mui/material";
// import Paper from 'material-ui/Paper';
import { CardMedia } from "@mui/material";
import { SRC_IMG } from "../../constants/const";
import Button from "@mui/material/Button";
import "./Stream.css";
import { blue } from "@mui/material/colors";

const Stream = () => {
  const blueColor = blue[50];

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "100vh",
            my: 3,
            mx: 5,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <div className="ClassNameBlock">
            <CardMedia
              component="img"
              height="190"
              image={SRC_IMG.COVER_IMAGE_CLASS}
              alt="Paella dish"
              sx={{ borderRadius: 2 }}
            />

            <div className="classInformation">
              <div className="Name">Classname Clasname</div>
              <div className="Description">MMH</div>
              <div className="Description">Des</div>
            </div>
            <div className="button">
              <Button variant="outlined" >
                CUSTOMIZE
              </Button>
            </div>
          </div>
        </Box>
      </Container>
    </Fragment>
  );
};
export { Stream };
