import { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import Divider from '@mui/material/Divider';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Grid, Paper } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { VALUE_TAB } from "../../constants/const";
import AuthContext from "../../store/store";
import { PATH } from "../../constants/paths";
import { splitPath } from "../../utils/util";
import { ERROR_CODE } from "../../constants/errorCode";
// import { FE_URL } from "../../constants/const";
import Loading from "../../components/Loading/Loading";
import { API_URL } from "../../constants/const";
import "./DetailClassReviewGrade.css";
import { getClassById } from "../../apis/class.api";
import { JWT_TYPE } from "../../constants/const";

const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const DetailClassReviewGrade = () => {
    const [error, setError] = useState(null);
    const location = useLocation();
    const id = splitPath(location.pathname, PATH.GRADE_REVIEW_SPLIT);
    const AuthCtx = useContext(AuthContext);
    const token = AuthCtx.user.token;
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(location.search);
    const review_id = query.get('review_id');
    const grade_id = query.get('grade_id')
    const API_URL_STUDENT_GRADE = API_URL + "classroom/grade/student/" + id + '/' + grade_id + '?review-id=' + review_id;
    const API_URL_COMMENT = API_URL + "classroom/grade/student/" + id + '/' + grade_id + '/comment';
    const API_URL_SET_FINAL_GRADE = API_URL + "classroom/grade/student/" + id + '/' + grade_id + '?review-id=' + review_id;
    const [student, setStudent] = useState({});
    const [grade, setGrade] = useState({});
    const [currentGrade, setCurrentGrade] = useState();
    const [expectGrade, setExpectGrade] = useState();
    const [explanation, setExplanation] = useState();
    const [status, setStatus] = useState();
    const [finalGrade, setFinalGrade] = useState();
    const [comments, setComments] = useState([]);
    const [classroom, setClassroom] = useState({});

    const [commentContent, setCommentContent] = useState('');
    const [finalizeGrade, setFinalizeGrade] = useState(0);

    const handleChangeCommentContent = (e) => {
        setCommentContent(e.target.value);
    }

    const handleClickPostComment = () => {
        // console.log(commentContent);
        // axios.post();
        const comment = { 
            gradeReviewRequestedId: parseInt(review_id),
            comment: commentContent
        };
        axios.post(API_URL_COMMENT, comment, { headers })
            .then(response => {
                console.log(response)
                if(response.status){
                    const newComment = response.data.data;
                    const updatedListComment = [...comments, newComment];
                    setComments(updatedListComment);
                    setCommentContent('');
                }
            });
    }

    const handleChangeFinalizeGrade = (e) => {
        setFinalizeGrade(e.target.value);
    }

    const handleClickFinalizeGrade = () => {
        const finalGrade = { 
            gradeReviewRequestedId: parseInt(review_id),
            finalPoint: parseFloat(finalizeGrade)
        };
        axios.put(API_URL_SET_FINAL_GRADE, finalGrade, { headers })
            .then(response => {
                console.log(response)
                if(response.status) {
                    window.location.reload();
                }
            });
    }

    useEffect(() => {
        setLoading(true);

        //get class information
        getClassById(token, id)
            .then((res) => {
                console.log(res.data);
                if (res.status) {
                    const information = {
                        name: res.data.name,
                        code: res.data.code,
                        description: res.data.description,
                        id: res.data.id,
                        isCustom:
                            res.data.jwtType.toString() === JWT_TYPE.JWT_TYPE_TEACHER
                                ? true
                                : false,
                        ownerAvatar: res.data.ownerAvatar
                    };
                    setClassroom(information);
                    setLoading(false);
                } else {
                    setError(ERROR_CODE[res] || "Get class by id failed!");
                }
            })
            .catch((err) => {
                setError(ERROR_CODE[err] || "Get class by id failed!");
            });
        
        //get review request detail
        axios.get(API_URL_STUDENT_GRADE, { headers })
            .then((response) => {
                setLoading(false);
                console.log(response.data);
                const studentData = response.data.data.student;
                const gradeData = response.data.data.grade;
                setStudent({
                    avatarUrl: studentData.avatar,
                    name: studentData.studentName ?? studentData.name,
                    code: studentData.studentCode ?? studentData.code,
                    email: studentData.email,
                    phone: studentData.phone
                })
                setGrade(gradeData);
                setCurrentGrade(response.data.data.currentPoint);
                setExpectGrade(response.data.data.studentExpectation);
                setExplanation(response.data.data.studentExplanation);
                setStatus(response.data.data.isProcessed);
                setFinalGrade(response.data.data.finalPoint);
                setComments(response.data.data.comments);
            })
    }, [API_URL_STUDENT_GRADE, id, review_id, token]);
    if (error) {
        return <div>Error: {error}</div>;
    } else {
        return (
            <Fragment>
                {/*<Nav2 id={id} token={token} valueTab={VALUE_TAB.TAB_GRADE} />*/}
                {loading ? <Loading /> :
                    <div className="card-container">
                        <header>
                            <img src={student.avatarUrl} alt={"avatar"} />
                        </header>
                        <h1 className="bold-text">
                            {student.name} <span className="normal-text">{student.code}</span>
                        </h1>
                        <h2 className="normal-text">{student.email}</h2>
                        <h2 className="normal-text">{student.phone}</h2>
                        <div className="social-container">
                            <div className="gradeDetail">
                                <h1 className="bold-text">{currentGrade}/{grade.maxPoint}</h1>
                                <h2 className="smaller-text">{grade.name}</h2>
                                <h2 className="smaller-text">Current grade</h2>
                            </div>
                            <div className="gradeDetail">
                                <h1 className="bold-text">{expectGrade}/{grade.maxPoint}</h1>
                                <h2 className="smaller-text">{grade.name}</h2>
                                <h2 className="smaller-text">Expect grade</h2>
                            </div>
                        </div>
                        <Divider />
                        <div className="social-container">
                            <div className="gradeDetail">
                                <h2 className="smaller-text">Explanation of student:</h2>
                                <h3 className="smaller-text">{explanation}</h3>
                            </div>
                        </div>
                        <div className="social-container">
                            <div className="gradeDetail">
                                <h2 className="smaller-text">Status: </h2>
                                <h2 className="smaller-text">{status ? <CheckCircleOutlineIcon /> : <PendingActionsIcon />}</h2>
                            </div>
                            {finalGrade ? <div className="gradeDetail">
                                <h2 className="smaller-text">Final grade: </h2>
                                <h1 className="bold-text">{finalGrade}/{grade.maxPoint}</h1>
                                <h2 className="smaller-text">{grade.name}</h2>
                            </div> : ''
                            }
                        </div>
                        <Paper style={{ padding: "40px 20px" }}>
                            {comments.map((comment, index) => {
                                return <Grid container wrap="nowrap" spacing={2} key={index}>
                                    <Grid item>
                                        <img className="comment_avatar" src={comment.user.avatar} alt={"avatar"} />
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user.name}</h4>
                                        <p style={{ textAlign: "left" }}>
                                            {comment.comment}
                                        </p>
                                        {/*<p style={{ textAlign: "left", color: "gray" }}>
                                                posted 1 minute ago
                                            </p>*/}
                                    </Grid>
                                </Grid>
                            })
                            }
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <img className="comment_avatar" src={classroom.isCustom ? classroom.ownerAvatar : student.avatarUrl} alt={"avatar"} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <TextField value={commentContent} onChange={(e) => handleChangeCommentContent(e)} />
                                    <Button variant="contained" id="post-button" onClick={handleClickPostComment}>Post</Button>
                                </Grid>
                            </Grid>
                            {classroom.isCustom && !status && <Grid container wrap="nowrap" spacing={2} id="finalize">
                                <Grid item>
                                    <img className="comment_avatar" src={classroom.ownerAvatar} alt={"avatar"} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <TextField type="number" value={finalizeGrade} onChange={(e) => handleChangeFinalizeGrade(e)} />
                                    <Button variant="contained" id="post-button" onClick={handleClickFinalizeGrade}>Finalize</Button>
                                </Grid>
                            </Grid>}
                        </Paper>
                    </div>
                }
            </Fragment>
        );
    }
};
export default DetailClassReviewGrade;
