import { useEffect, useState } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Nav2 } from "../../components/Nav/Nav2";
import { VALUE_TAB } from "../../constants/const";
import { PATH } from "../../constants/paths";
import AuthContext from "../../store/store";
import { splitPath } from "../../utils/util";
import { ERROR_CODE } from "../../constants/errorCode";
import Loading from "../../components/Loading/Loading";
import { API_URL } from "../../constants/const";
import "./DetailStudentGrade.css";

const API_URL_STUDENT_GRADE = API_URL + "classroom/grade/student/";

const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const DetailStudentClass = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const AuthCtx = useContext(AuthContext);
    const location = useLocation();
    const id = splitPath(location.pathname, PATH.STUDENT_GRADE_SPLIT);
    const token = AuthCtx.user.token;
    const [studentInformation, setStudentInformation] = useState({});
    const [studentGrade, setStudentGrade] = useState([]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL_STUDENT_GRADE + id, { headers })
            .then((response) => {
                setLoading(false);
                const data = response.data.data;
                // console.log(data.gradeArray);
                setStudentInformation({
                    avatarUrl: data.avatar,
                    name: data.studentName ?? data.name,
                    code: data.studentCode ?? data.code,
                    email: data.email,
                    phone: data.phone,
                    totalGrade: data.totalGrade,
                    maxTotalGrade: data.maxTotalGrade
                })
                setStudentGrade(data.gradeArray);
            })
    }, [id, studentInformation.avatarUrl, token]);
    if (error) {
        setError(error);
        return <div>Error: {error}</div>;
    } else {
        return (
            <Fragment>
                <Nav2 id={id} token={token} valueTab={VALUE_TAB.TAB_GRADE} />
                {loading ? <Loading /> :
                    <div className="card-container">
                        <header>
                            <img src={studentInformation.avatarUrl} alt={"avatar"} />
                        </header>
                        <h1 className="bold-text">
                            {studentInformation.name} <span className="normal-text">{studentInformation.code}</span>
                        </h1>
                        <h2 className="normal-text">{studentInformation.email}</h2>
                        <h2 className="normal-text">{studentInformation.phone}</h2>
                        <div className="social-container">
                            {studentGrade.map((grade) => {
                                return <div className="gradeDetail">
                                    <h1 className="bold-text">{grade.point}/{grade.maxPoint}</h1>
                                    <h2 className="smaller-text">{grade.name}</h2>
                                </div>
                            })}
                        </div>
                        <Divider />
                        <h1 className="bold-text">Total: </h1>
                        <h1 className="totalGrade">{studentInformation.totalGrade}/{studentInformation.maxTotalGrade}</h1>
                        <h2 className="smaller-text">Not satisfied with your score? Submit a review request
                            <span> </span>
                            <span className="reviewRequestLink" onClick={handleClickOpen}>here.</span>
                        </h2>
                    </div>
                }
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Request for a grade reviewer</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To submit a request for a review to the teacher of this subject, please fill out the form below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
};
export default DetailStudentClass;
