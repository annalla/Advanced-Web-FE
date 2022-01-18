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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Nav2 } from "../../components/Nav/Nav2";
import { VALUE_TAB } from "../../constants/const";
import { PATH } from "../../constants/paths";
import AuthContext from "../../store/store";
import { splitPath } from "../../utils/util";
// import { ERROR_CODE } from "../../constants/errorCode";
import { FE_URL } from "../../constants/const";
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
    const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
    const [notifyContent, setNotifyContent] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseNotification = () => {
        setNotifyDialogOpen(false);
    };

    const [selectedGradeId, setSelectedGradeId] = useState();
    const [expectGrade, setExpectGrade] = useState();
    const [explain, setExplain] = useState('');

    const handleIdChange = (event) => {
        setSelectedGradeId(event.target.value);
    };

    const handleExpectGradeChange = (event) => {
        setExpectGrade(event.target.value);
    };

    const handleExplainChange = (event) => {
        setExplain(event.target.value);
    };

    const handleSubmit = () => {
        setOpen(false);
        setLoading(true);
        const reviewRequest = {
            studentExpectation: parseFloat(expectGrade),
            studentExplanation: explain
        };
        // id is classroom id
        axios.post(API_URL_STUDENT_GRADE + id + '/' + selectedGradeId, reviewRequest, { headers })
            .then(response => {
                setNotifyDialogOpen(true);
                if (response.data.status) {
                    setNotifyContent("You have successfully submitted an appeal for this score!")
                }
                else {
                    setNotifyContent("Something went wrong, please try again later!")
                }
                setLoading(false);
                setExpectGrade('');
                setExplain('');
            });
    }

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL_STUDENT_GRADE + id, { headers })
            .then((response) => {
                setLoading(false);
                const data = response.data.data;
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
                data.gradeArray.length ? setSelectedGradeId(data.gradeArray[0].id) : setSelectedGradeId(0);
            })
    }, [id, studentInformation.avatarUrl, token]);
    if (error) {
        setError(error);
        return <div>Error: {error}</div>;
    } else {
        return (
            <Fragment>
                <Nav2 id={id} token={token} valueTab={VALUE_TAB.TAB_GRADE} />
                {loading && <Loading />}
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
                        {(studentGrade.length !== 0) ? studentGrade.map((grade) => {
                            return <div className="gradeDetail" key={grade.id}>
                                <h1 className="bold-text">{grade.point}/{grade.maxPoint}</h1>
                                <h2 className="smaller-text">{grade.name}</h2>
                                {grade.reviewRequestedId ? <span
                                    id="link" className="smaller-text"
                                    onClick={
                                        () =>
                                            window.open(
                                                FE_URL +
                                                '/grade/review/' +
                                                id + '?review_id=' +
                                                grade.reviewRequestedId +
                                                '&grade_id=' + grade.id
                                                , "_blank")
                                    }>
                                    Review process.
                                </span> : ""}
                            </div>
                        }) : ""}
                    </div>
                    <Divider />
                    <h1 className="bold-text">Total: </h1>
                    <h1 className="totalGrade">{studentInformation.totalGrade}/{studentInformation.maxTotalGrade}</h1>
                    <h2 className="smaller-text">Not satisfied with your score? Submit a review request
                        <span> </span>
                        <span id="link" onClick={handleClickOpen}>here.</span>
                    </h2>
                </div>
                <Dialog open={open} onClose={handleClose} maxWidth='md'>
                    <DialogTitle>Request for a grade reviewer</DialogTitle>
                    {selectedGradeId ? <DialogContent>
                        <DialogContentText id="note">
                            To submit a request for a review to the teacher of this subject, please fill out the form below.
                        </DialogContentText>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Grade name</InputLabel>
                            <Select
                                value={selectedGradeId}
                                label="Grade name"
                                onChange={handleIdChange}
                            >
                                {(studentGrade.length !== 0) ? studentGrade.map((grade) => {
                                    return <MenuItem key={grade.id} value={grade.id}>{grade.name}</MenuItem>
                                }) : ""}
                            </Select>
                            <TextField
                                margin="dense"
                                id="expectGrade"
                                label="Expect grade"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleExpectGradeChange}
                            />
                            <TextField
                                margin="dense"
                                label="Explain"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleExplainChange}
                            />
                        </FormControl>
                    </DialogContent> :
                        <DialogContent>
                            <DialogContentText id="note">
                                You don't have any score columns to review!
                            </DialogContentText>
                        </DialogContent>
                    }
                    <DialogActions>
                        {selectedGradeId ? <div>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </div> : <Button onClick={handleClose}>OK</Button>
                        }
                    </DialogActions>
                </Dialog>
                <Dialog open={notifyDialogOpen} onClose={handleCloseNotification} maxWidth='md'>
                    <DialogTitle>Notification</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {notifyContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNotification}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
};
export default DetailStudentClass;
