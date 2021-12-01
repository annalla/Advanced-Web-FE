import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import "./Stream.css";
import AccordionAnnounce from "./StreamItem/ArcordionAnnounce";
import UpcomingBox from "./StreamItem/UpcommingBox";
import IntroductionBox from "./StreamItem/IntroductionBox";
import GradeStructureBox from "./StreamItem/GradeStructureBox";

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
              {data.isCustom ? (
                <Button variant="outlined">CUSTOMIZE</Button>
              ) : (
                ""
              )}
            </div>
          </div>
          <Box
            sx={{
              my: "30px",
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Box sx={{ width: "80%" }}>
              <AccordionAnnounce />
              <IntroductionBox/>
            </Box>
            <Box sx={{ width: "20%" }}>
              <UpcomingBox />
              {/* {data.isCustom?<GradeStructureBox/>:""} */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};
export { Stream };
