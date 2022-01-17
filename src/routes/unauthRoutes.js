import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PATH } from "../constants/paths";
import Loading from "../components/Loading/Loading";
import { RedirectLogin } from "../pages/404/RedirectLogin";
import { HandleJoin } from "../pages/Invite/HandleJoin";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import HandleForgotPassword from "../pages/ForgotPassword/HandleForgotPassword";
import UpdatePassword from "../pages/ForgotPassword/UpdatePassword";
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));

const UnauthRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route exact path={PATH.HOME} element={<RedirectLogin />} />
        <Route exact path={PATH.LOGIN} element={<Login />} />
        <Route exact path={PATH.REGISTER} element={<Register />} />
        <Route exact path={PATH.JOIN_CLASS} element={<HandleJoin />} />
        <Route exact path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route exact path={PATH.HANDLE_FORGOT_PASSWORD} element={<HandleForgotPassword />} />
        <Route exact path={PATH.UPDATE_PASSWORD} element={<UpdatePassword />} />
        <Route path="*" element={<RedirectLogin />} />
      </Routes>
    </Suspense>
  );
};

export { UnauthRoutes };
