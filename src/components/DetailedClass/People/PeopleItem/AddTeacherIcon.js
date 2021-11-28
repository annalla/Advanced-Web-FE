import * as React from "react";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { EmailAutocomplete } from "./EmailAutocomplete";
import Button from "@mui/material/Button";
import { sendMail } from "../../../../utils/util_sendMail";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "0px solid #000",
  p: 2,
  minHeight: 400,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
//code la linkTeacher
export default function AddTeacherIcon({ code,id,isTeacher }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emails, setEmails] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  
  const constrolEmails = (email) => {
    setEmails(email);
  };
  const handleInviteTeacher = async () => {
    const result = await sendMail(id, emails,isTeacher);
    console.log(result);
    if (result === true) {
      handleClose();
    } else {
      setMessage("Something wrong here");
    }
  };
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
              sx={{ mb: "10px" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Invite teachers
            </Typography>
            {message ? (
              <Typography
                sx={{ mb: "5px" }}
                fontSize="15px"
                color='error'
              >
                {message}
              </Typography>
            ) : (
              ""
            )}
            <EmailAutocomplete control={constrolEmails} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              width: "100%",
            }}
          >
            {emails.length === 0 ? (
              <Button variant="outlined" sx={{ ml: "10px" }} disabled>
                Invite
              </Button>
            ) : (
              <Button
                variant="outlined"
                sx={{ ml: "10px" }}
                onClick={handleInviteTeacher}
              >
                Invite
              </Button>
            )}

            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}
