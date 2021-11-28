import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";



export default function UpcomingBox() {
  return (
    <Box  sx={{ mx: 2,p:1, border: 1,borderColor: 'grey.300',height:"100px",borderRadius:1,display:"flex" }}>
      <Typography>Upcoming </Typography>
    </Box>
  );
}
