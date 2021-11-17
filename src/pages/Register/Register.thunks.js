//import { loginApi } from "../../user.api"
//import * as actions from "./Register.actions"

//export const register = (payload) => dispatch => {
//    dispatch(actions.loginRequested())
//    return loginApi(payload)
//        .then(res => {
//            localStorage.setItem("token", res.data.access_token)
//            return dispatch(actions.loginSuccess(res))
//        })
//        .catch(err => Promise.reject(dispatch(actions.loginFailed(err))))
//}
