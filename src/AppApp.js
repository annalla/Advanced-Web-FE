import { Fragment } from "react";
import { UnauthRoutes } from "./routes/unauthRoutes";
import { AuthRoutes } from "./routes/authRoutes";
function AppApp() {
  return (
    <Fragment>
      {localStorage.getItem("isAuthenticated")==="1" ? <AuthRoutes /> : <UnauthRoutes />}
    </Fragment>
  );
}

export { AppApp };
