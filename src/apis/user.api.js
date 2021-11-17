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


