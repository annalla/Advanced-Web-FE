import * as React from "react";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { EmailAutocomplete } from "./EmailAutocomplete";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "0px solid #000",
  p: 2,
  minHeight: 300,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
export default function AddStudentIcon({code}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <PersonAddAltIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%", maxHeight: "45vh" }}>
            <Typography
              sx={{ mb: "15px" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Invite students
            </Typography>
            <Box sx={{display:"flex",width:"100%"}}>

            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              width: "100%",
            }}
          >
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}
