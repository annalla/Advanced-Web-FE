import React, { lazy, Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import { PATH } from "src/constants/paths"
import Loading from "src/components/Loading/Loading"
const Register = lazy(() => import("src/pages/Register/Register"))

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
