import axios from "axios";

export const getClassListApi = async (token, jwt_type) => {
  return axios
    .get(
      "http://localhost:8002/api/v1/classroom/get-list-classroom-by-jwt-type?jwt_type=" +
        jwt_type,
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
    .get("http://localhost:8002/api/v1/classroom/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const sendInvitaionByMail = async (requestInvite) => {
  
  return axios
    .post("http://localhost:8002/api/v1/classroom/invite", requestInvite, {
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
    .post("http://localhost:8002/api/v1/classroom/", classroom, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
