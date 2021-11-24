import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function AccordionAnnounce() {
    return (

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{height:"20px"}}
          >
            <Typography>Announce to your class</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              In developing
            </Typography>
          </AccordionDetails>
        </Accordion>
        
      
    );
  }