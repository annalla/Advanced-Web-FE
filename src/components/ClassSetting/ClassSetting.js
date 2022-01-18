import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ClassSetting.css';
import { Container } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ImCancelCircle } from 'react-icons/im';
import GradeStructure from '../GradeStructure/GradeStructure'

const theme = createTheme({
    palette: {
        primary: {
            main: '#2D2C2C',
        },
    },
});

function ClassSetting({ onclose, data }) {
    return (
        <div className="backdrop">
            <Container maxWidth="xm" sx={{ mt: '0px' }} id="container">
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            <ImCancelCircle id="cancelButton" onClick={onclose} />
                            Class Settings
                        </Typography>
                        <ThemeProvider theme={theme}>
                            <form id="theme">
                                <div>Grading</div>
                                <GradeStructure class={data.id}></GradeStructure>
                            </form>
                        </ThemeProvider>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );


}
export { ClassSetting };

