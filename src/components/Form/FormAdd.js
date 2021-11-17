import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

import Loading from '../Loading/Loading';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2D2C2C',
        },
    },
});

function FormAdd({ onclose }) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadFile, setUploadFile] = useState();
    const [preview, setPreview] = useState();

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const handleUploadFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setUploadFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setUploadFile(e.target.files[0])
    }

    useEffect(() => {
        if (!uploadFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(uploadFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [uploadFile])

    const onSubmit = async (data) => {
        setIsLoading(true);
        const dataArray = new FormData();
        dataArray.append("name", data.classname);
        dataArray.append("code", data.code);

        if (data.description) dataArray.append("description", data.description);

        dataArray.append("avatar", uploadFile);

        await axios.post("http://localhost:8002/api/v1/classroom/", dataArray, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data",
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    onclose();
                }
                else if (response.data.status === 0) {
                    console.log("that bai");
                    setError("Created class failed!");
                }
            })
        setIsLoading(false);
    };
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const { ref, ...inputProps } = register("classname", {
        required: "Classname is required"
    });
    return (
        <div className="backdrop">
            {isLoading && <Loading></Loading>}
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
                                    required
                                />
                                <TextField
                                    name="code"
                                    sx={{ mt: 3 }}
                                    label="Code"
                                    inputRef={register("code")}
                                    {...register("code")}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    name="description"
                                    id="description"
                                    sx={{ mt: 3 }}
                                    label="Description (Option)"
                                    inputRef={register("description")}
                                    {...register("description")}
                                    fullWidth
                                />
                                <Grid container id="imageContainer">
                                    <Grid item xs={12} sm={6}>
                                        <Button variant="contained" component="label" id="coverImage"> Cover Image <input type="file" hidden onChange={handleUploadFile} /> </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {uploadFile && <img id="previewImage" src={preview} width="150" />}
                                    </Grid>
                                </Grid>
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
                </Card>
            </Container>
        </div>
    );


}
export { FormAdd };

