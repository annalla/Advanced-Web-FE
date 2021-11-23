import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import ListPeople from "./PeopleItem/ListPeople";
const People = ({ data }) => {
  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#ffffff",
            minHeight: "100vh",
            my: 3,
            mx: 5,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Box
            sx={{
              minHeight: "100vh",
              my: 0,
              mx: 15,
              padding: 2,
            }}
          >
            <ListPeople data={data} isTeacher={true} isCustom={data.isCustom} />
            <Box sx={{ width: "100%", height: "15px" }}></Box>
            <ListPeople data={data} isTeacher={false} isCustom={data.isCustom} />
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};
export { People };
