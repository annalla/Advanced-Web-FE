import axios from "axios";
import { API_URL } from "../constants/const";

const CLASSROOM_API = API_URL + "classroom/"
export const getClassListApi = async (token, jwt_type) => {
    return axios
        .get(
            CLASSROOM_API + "get-list-classroom-by-jwt-type?jwt_type=" + jwt_type,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
};
export const getClassById = async (token, id) => {
    return axios
        .get(CLASSROOM_API + id, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
    }

export const sendInvitaionByMail = async (requestInvite) => {
  return axios
    .post(CLASSROOM_API + "invite", requestInvite, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

};
export const joinClassByCode = async (code) => {
  return axios
    .get(CLASSROOM_API + "join?code="+code, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

};

export const createClassApi = async (classroom) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  return axios
    .post(CLASSROOM_API, classroom, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
