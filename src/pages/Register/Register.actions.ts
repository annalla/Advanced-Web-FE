import * as types from "./Register.constants"

export const loginRequested = () => ({
  type: types.REGISTER_REQUESTED
})

export const loginSuccess = payload => ({
  type: types.REGISTER_SUCCESS,
  payload
})

export const loginFailed = payload => ({
  type: types.REGISTER_FAILED,
  payload
})
