import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {SRC_IMG} from "../../../../constants/const"

export default function IntroductionBox() {
  return (
    <Box  sx={{p:3,m:2,ml:0, border: 1,borderColor: 'grey.300',height:"150px",width:"95%",borderRadius:1,display:"flex" }}>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={SRC_IMG.ANNOUNCE}
        alt="green iguana"
      />
      </Card>
      <Typography sx={{p:3,fontSize:"26px",color:"grey.700"}}>This is where we can talk to your class</Typography>
    </Box>
  );
}
