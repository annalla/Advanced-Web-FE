import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import {PATH} from "../constants/paths"

const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));


const DetailClassPeople = lazy(() =>
  import("../pages/Class/DetailClassPeople.js")
);
const DetailClass = lazy(() => import("../pages/Class/DetailClass"));
const Home = lazy(() => import("../pages/Home/Home"))
const ManageProfile = lazy(() =>
  import("../pages/ManageProfile/ManageProfile")
);

const AuthRoutes = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route exact path={PATH.DETAIL_CLASS_PEOPLE} element={<DetailClassPeople />} />
        <Route exact path={PATH.HOME} element={<Home />} />
        <Route exact path={PATH.DETAIL_CLASS} element={<DetailClass />} />
        <Route exact path={PATH.MANAGE_PROFILE} element={<ManageProfile />} />
        <Route exact path={PATH.LOGIN} element={<Login />} />
        <Route exact path={PATH.REGISTER} element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export {AuthRoutes};