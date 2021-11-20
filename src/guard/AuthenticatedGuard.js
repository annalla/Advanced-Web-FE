import React, { useContext } from "react"
import {
    Route,
} from "react-router-dom"
import AuthContext from "../store/store"
import {PATH} from "../constants/paths"
import { useNavigate } from "react-router"

function AuthenticatedGuard(props) {
    const navigate=useNavigate();
    const { component: Component, ...rest } = props
    const AuthCtx = useContext(AuthContext)
    const isAuthenticated = AuthCtx.isAuthenticated
    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated && !localStorage.getItem("token")) {
                    navigate(PATH.LOGIN)
                    // return <Redirect to={PATH.LOGIN} />
                }
                return <Component {...props} />
            }}
        />
    )
}

export default (AuthenticatedGuard)
