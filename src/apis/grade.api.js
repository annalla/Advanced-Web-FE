import axios from "axios";
import { API_URL } from "../constants/const";

const GRADE_API = API_URL + 'classroom/grade/'
export const getGradeStructure = async (idClass) => {
    return axios
        .get(
            GRADE_API + idClass,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
};