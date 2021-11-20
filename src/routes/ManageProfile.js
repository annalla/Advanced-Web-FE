import React, { lazy, Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import { PATH } from "../constants/paths"
import Loading from "../components/Loading/Loading"
const ManageProfile = lazy(() => import("../pages/ManageProfile/ManageProfile"))

export default function ManageProfileRoutes() {
  return (
    <Switch>
      <Route
        path={PATH.MANAGE_PROFILE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <ManageProfile />
          </Suspense>
        )}
      />
    </Switch>
  )
}
