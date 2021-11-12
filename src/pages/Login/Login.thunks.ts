import { loginApi } from "src/apis/user.api"
import * as actions from "./Login.actions"

export const login = (payload: ReqLogin) => dispatch => {
  dispatch(actions.loginRequested())
  return loginApi(payload).then(res => {
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
      return dispatch(actions.loginSuccess(res))
    } else return dispatch(actions.loginFailed("Đăng nhậP thất bại!"))
  })
  //.catch(err => Promise.reject(dispatch(actions.loginFailed(err))))
}
