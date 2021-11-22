import axios from "axios"
import { API_URL } from "../constants/const";

export const loginApi = async ({
    username,
    password
}) => {
    return axios
        .post(API_URL + "account/login", {
            username,
            password
        })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        })
}

export const getUserApi = async () => {
    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    };
    return axios.get(API_URL + 'user/', { headers })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        })
}

export const updateUserApi = async (user) => {
    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data",
    }
    return axios.post(API_URL + 'user/', user, { headers })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        })
}