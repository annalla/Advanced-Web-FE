import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { CardMedia } from "@mui/material";
import { SRC_IMG } from "../../constants/const";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import { PATH } from "../../constants/paths";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate(PATH.HOME);
  };
  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "80vh",
            my: 8,
            mx: 5,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <CardMedia
            component="img"
            height="70%"
            image={SRC_IMG.PAGE_NOT_FOUND}
            alt="cover-image"
            sx={{ borderRadius: 2 }}
          />
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" onClick={handleGoHome}>
              GO HOME
            </Button>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};
export { PageNotFound };
