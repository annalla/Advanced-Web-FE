import AuthContext from "./store/store";
import { useContext } from "react";
import { Fragment } from "react";
import { UnauthRoutes } from "./routes/unauthRoutes";
import { AuthRoutes } from "./routes/authRoutes";
function AppApp() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      {authCtx.isAuthenticated ? <AuthRoutes /> : <UnauthRoutes />}
    </Fragment>
  );
}

export { AppApp };
