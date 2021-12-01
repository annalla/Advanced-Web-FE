import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ClassSetting.css';
import { Container } from '@mui/material';

import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ImCancelCircle } from 'react-icons/im';
// import Loading from '../Loading/Loading';
// import FormHelperText from '@mui/material/FormHelperText';
// import { PATH } from '../../constants/paths';
// import { createClassApi } from '../../apis/class.api';
// import { useNavigate } from 'react-router';
// import { ERROR_CODE } from '../../constants/errorCode';
import GradeStructure from '../GradeStructure/GradeStructure'
// import { Button, TextField } from '@mui/material';
// import { useForm } from 'react-hook-form';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2D2C2C',
        },
    },
});

function ClassSetting({ onclose, data }) {

    // const history = useNavigate();
    // const [isLoading, setIsLoading] = useState(false);
    // const [errorResponse, setErrorResponse] = useState(null);

    // const { register, handleSubmit, formState: { errors }, setValue  } = useForm();

    // useEffect(() => {
    //     setValue('classname', data.name);
    //     data.code && setValue('code', data.code);
    //     data.description && setValue('description', data.description);
    // }, [data, setValue])

    // const onSubmit = async (data) => {
    //     setIsLoading(true);
    //     const dataArray = new FormData();
    //     dataArray.append("name", data.classname);
    //     dataArray.append("code", data.code);

    //     if (data.description) dataArray.append("description", data.description);

    //     createClassApi(dataArray).then((response) => {
    //             if (response.status === 1) {
    //                 history(PATH.DETAIL_CLASS_SPLIT+response.data.id);
    //                 onclose();
    //             }
    //             else if (response.status === 0) {
    //                 setErrorResponse(ERROR_CODE[response.code] || "Failed to create class!");
    //             }
    //         })
    //     setIsLoading(false);
    // };
    // const { ref, ...inputProps } = register("classname", {
    //     required: "Classname is required"
    // });
    return (
        <div className="backdrop">
            {/* {isLoading && <Loading></Loading>} */}
            <Container maxWidth="xm" sx={{ mt: '0px' }} id="container">
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            <ImCancelCircle id="cancelButton" onClick={onclose} />
                            Class Settings
                        </Typography>
                        <ThemeProvider theme={theme}>
                            {/* <form onSubmit={handleSubmit(onSubmit)} id="theme">
                                <div>Class Details</div>
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
                                <Grid container justifyContent="center">
                                    <FormHelperText error>{errorResponse}</FormHelperText>
                                </Grid>
                                <Grid container justifyContent="flex-end">
                                    <Button
                                        sx={{ mt: 3, ml: 2 }}
                                        color="primary"
                                        type="submit"
                                        variant="outlined"
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </form> */}
                            <form id="theme">
                                <div>Grading</div>
                                <GradeStructure class={data.id}></GradeStructure>
                                {/* <GradeStructure class={data.id} isLoading={isLoading}></GradeStructure> */}
                                <Grid container justifyContent="center">
                                    {/* <FormHelperText error>{errorResponse}</FormHelperText> */}
                                </Grid>
                            </form>
                        </ThemeProvider>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );


}
export { ClassSetting };

