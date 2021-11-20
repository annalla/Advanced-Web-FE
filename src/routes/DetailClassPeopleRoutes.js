import React, { lazy, Suspense } from "react";
import AuthenticatedGuard from "../guard/AuthenticatedGuard";
import { PATH } from "../constants/paths";
import Loading from "../components/Loading/Loading";
import { BrowserRouter as  Switch } from "react-router-dom";
const DetailClassPeople = lazy(() => import("../pages/Class/DetailClassPeople.js"));
export default function DetailClassPeopleRoutes() {
  return (
    <Switch>
      <AuthenticatedGuard
        path={PATH.DETAIL_CLASS_PEOPLE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <DetailClassPeople />
          </Suspense>
        )}
      />
    </Switch>
  );
}
