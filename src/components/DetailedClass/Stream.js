import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import "./Stream.css";

const Stream = ({ data }) => {
  const isDescription = data.description !== "" ? true : false;
  const isCode = data.code !== "" ? true : false;
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
              image={data.coverImageUrl}
              alt="cover-image"
              sx={{ borderRadius: 2 }}
            />

            <div className="classInformation">
              <div className="Name">{data.name}</div>
              {isCode ? (
                <div className="Description">MMH: {data.code}</div>
              ) : (
                ""
              )}
              {isDescription ? (
                <div className="Description">{data.description}</div>
              ) : (
                ""
              )}
            </div>
            <div className="button">
              {data.isCustom?<Button variant="outlined">CUSTOMIZE</Button>:""}
              
            </div>
          </div>
        </Box>
      </Container>
    </Fragment>
  );
};
export { Stream };
