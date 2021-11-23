import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PATH } from "../constants/paths";
import Loading from "../components/Loading/Loading";
import { RedirectInvite } from "../pages/Invite/RedirectInvite";
import { RedirectLogin } from "../pages/404/RedirectLogin";
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));

const UnauthRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route exact path={PATH.HOME} element={<RedirectLogin />} />
        <Route exact path={PATH.LOGIN} element={<Login />} />
        <Route exact path={PATH.REGISTER} element={<Register />} />
        <Route exact path={PATH.JOIN_CLASS} element={<RedirectInvite />} />
        <Route path="*" element={<RedirectLogin />} />
      </Routes>
    </Suspense>
  );
};

export { UnauthRoutes };
