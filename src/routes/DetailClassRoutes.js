import React, { lazy, Suspense } from "react";
// import { Switch } from "react-router-dom";
import AuthenticatedGuard from "../guard/AuthenticatedGuard";
import { PATH } from "../constants/paths";
import Loading from "../components/Loading/Loading";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import DetailClass from "../pages/Class/DetailClass";
const DetailClass = lazy(() => import("../pages/Class/DetailClass"));
export default function DetailClassRoutes() {
  return (
    <Switch>
      <AuthenticatedGuard
        exact
        path={PATH.DETAIL_CLASS}
        component={() => (
          <Suspense fallback={<Loading />}>
            <DetailClass/>
          </Suspense>
        )}
        />
      {/* <Route exact path={PATH.DETAIL_CLASS} component={DetailClass}/> */}
    </Switch>
  );
}
