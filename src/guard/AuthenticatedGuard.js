import React, { useContext } from "react"
import {
    Route,
    Redirect,
} from "react-router-dom"
import AuthContext from "../store/store"

function AuthenticatedGuard(props) {
    const { component: Component, ...rest } = props
    const AuthCtx = useContext(AuthContext)
    const isAuthenticated = AuthCtx.isAuthenticated
    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated && !localStorage.getItem("token")) {
                    return <Redirect to="/login" />
                }
                return <Component {...props} />
            }}
        />
    )
}

export default (AuthenticatedGuard)
