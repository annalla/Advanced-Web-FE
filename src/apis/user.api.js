import axios from "axios"

export const loginApi = async ({
    username,
    password
}) => {
    return axios
        .post("http://localhost:8002/api/v1/account/login", {
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
    return axios.get('http://localhost:8002/api/v1/user/', { headers })
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
    return axios.post('http://localhost:8002/api/v1/user/', user, { headers })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        })
}