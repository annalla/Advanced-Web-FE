import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './FormAdd.css';
import { Container } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2D2C2C',
        },
    },
});

function FormAdd({ onclose }) {
    const history = useHistory();
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors }, } = useForm();
  
    const onSubmit = (data) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        fetch("http://localhost:3000/classes", requestOptions)
            .then(response => response.json())
            .then((result) => {
                history.push("/add");
                onclose();
            },
                (error) => {
                    setError(error);
                });
    };
    if (error) {
		return <div>Error: {error.message}</div>;
	}
    const { ref, ...inputProps } = register("classname", {
        required: "Classname is required"
    });
    return (
        <div className="backdrop">
            <Container maxWidth="sm" sx={{ my: '120px' }}>

                <Card sx={{ MaxWidth: 900 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            Add a Class
                        </Typography>
                        <ThemeProvider theme={theme}>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                name="classname"
                                error={!!errors.classname}
                                label="Class name"
                                helperText={errors?.classname?.message}
                                sx={{ mt: 3 }}
                                inputRef={ref}
                                {...inputProps}
                                fullWidth
                            />
                            <TextField
                                name="topic"
                                sx={{ mt: 3 }}
                                label="Topic (Option)"
                                inputRef={register("topic")}
                                {...register("topic")}
                                fullWidth
                            />
                            <Grid container justifyContent="flex-end">
                                <Button
                                    sx={{ mt: 3, }}
                                    color="primary"
                                    variant="outlined"
                                    onClick={onclose}
                                
                                >
                                    Cancel
                                </Button>
                                <Button
                                    sx={{ mt: 3, ml: 2 }}
                                    color="primary"
                                    type="submit"
                                    variant="outlined"
                                // fullWidth
                                >
                                    Add
                                </Button>
                            </Grid>
                        </form>
                        </ThemeProvider>
                    </CardContent>
                    {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>  */}
                </Card>
            </Container>
        </div>
    );


}
export { FormAdd };

