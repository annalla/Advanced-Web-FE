import { useEffect, useState } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Divider from '@mui/material/Divider';

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
    useEffect(() => {
        setLoading(true);
        axios.get(API_URL_STUDENT_GRADE + id, { headers })
            .then((response) => {
                setLoading(false);
                const data = response.data.data;
                console.log(response.data);
                setStudentInformation({
                    avatarUrl: data.avatar,
                    name: data.studentName ?? data.name,
                    code: data.studentCode ?? data.code,
                    email: data.email,
                    phone: data.phone,
                    totalGrade: data.totalGrade,
                    maxTotalGrade: data.maxTotalGrade
                })
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
                            <div className="followers">
                                <h1 className="bold-text">{123}</h1>
                                <h2 className="smaller-text">Followers</h2>
                            </div>
                            <div className="likes">
                                <h1 className="bold-text">{123}</h1>
                                <h2 className="smaller-text">Likes</h2>
                            </div>
                            <div className="photos">
                                <h1 className="bold-text">{123}</h1>
                                <h2 className="smaller-text">Photos</h2>
                            </div>
                            <div className="followers">
                                <h1 className="bold-text">{123}</h1>
                                <h2 className="smaller-text">Followers</h2>
                            </div>
                            <div className="likes">
                                <h1 className="bold-text">{123}</h1>
                                <h2 className="smaller-text">Likes</h2>
                            </div>
                            <div className="photos">
                                <h1 className="bold-text">{123}</h1>
                                <h2 className="smaller-text">Photos</h2>
                            </div>
                        </div>
                        <Divider />
                            <h1 className="bold-text">Total: </h1>
                            <h1 className="totalGrade">{studentInformation.maxTotalGrade}/{studentInformation.maxTotalGrade}</h1>
                    </div>
                }
            </Fragment>
        );
    }
};
export default DetailStudentClass;
