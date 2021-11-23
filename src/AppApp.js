import { Fragment, useContext } from "react";
import { UnauthRoutes } from "./routes/unauthRoutes";
import { AuthRoutes } from "./routes/authRoutes";
import AuthContext from "./store/store";
function AppApp() {
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      {ctx.isAuthenticated ? <AuthRoutes /> : <UnauthRoutes />}
    </Fragment>
  );
}

export { AppApp };
