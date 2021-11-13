import React, { useState,useContext } from "react"
// import { connect, ConnectedProps } from "react-redux"
import { loginApi } from "../../apis/user.api"
import { Title } from "./Register.styles"
import { useHistory } from "react-router-dom"
import { PATH } from "../../constants/paths"
import AuthContext from "../../store/store"
// const mapStateToProps = state => ({
//   loading: state.loading
// })

// const mapDispatchToProps = {
//   register
// }

// const connector = connect(mapStateToProps, mapDispatchToProps)


const Register = (props) => {
  const AuthCtx=useContext(AuthContext);
  // const { register, loading } = props
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const submit = async (event) => {
    event.preventDefault()
      const payload = { username, password }
      loginApi(payload)
        .then(res => {
          if(res.status===true){
            AuthCtx.onLogin(res.data)
            history.push(PATH.HOME)
          }
          else{
            setError(res.code);
          }
        })
        .catch(err => {
          setError(err.payload.message)
        })
    
  }

  return (
    <div className="container">
      <div className="min-vh-100 row">
        <div className="col-md-6 m-auto">
          <form className="p-5 rounded-sm shadow text-center" onSubmit={submit}>
            <Title>Register</Title>
            <p className="text-muted">Please enter your login and password!</p>
            <input
              type="text"
              placeholder="Username"
              onChange={handleUsername}
              className="form-control form-control-lg mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              className="form-control form-control-lg mb-4"
            />
            {error && (
              <div className="mb-3 text-danger text-xl-center">{error}</div>
            )}
            <button type="submit" className="btn btn-block btn-info btn-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default (Register)
