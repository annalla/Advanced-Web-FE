import axios from "axios"

export const loginApi = async ({
  username,
  password
}: ReqLogin): Promise<ResLoginApi> => {
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
