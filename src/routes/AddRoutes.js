import React from "react"
import { Switch } from "react-router-dom"
import AuthenticatedGuard from "../guard/AuthenticatedGuard"
import { PATH } from "../constants/paths"
import { Header } from "../components/Form/Add"
export default function AddRoutes() {
  return (
    <Switch>
      <AuthenticatedGuard
        exact
        path={PATH.ADD_CLASS}
        component={Header}
      />
    </Switch>
  )
}
