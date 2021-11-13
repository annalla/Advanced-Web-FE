import React, { lazy, Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import { PATH } from "../constants/paths"
import Loading from "../components/Loading/Loading"
const Register = lazy(() => import("../pages/Register/Register"))

export default function RegisterRoutes() {
  return (
    <Switch>
      <Route
        path={PATH.REGISTER}
        component={() => (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        )}
      />
    </Switch>
  )
}
