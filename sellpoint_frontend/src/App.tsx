import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Route";
import { useSessionContext } from "./context/Session";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import LoggedInExample from "./pages/LoggedInExample";
import ProfilePage from "./pages/Profile";

const App: FunctionComponent = () => {
  const session = useSessionContext();

  const protectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.isAuthenticated,
    authenticationPath: "/login",
    redirectPathOnAuthentication: session.redirectPath ?? "/success",
    setRedirectPathOnAuthentication: session.setRedirectPath,
  };

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          {...protectedRouteProps}
          path="/success"
          component={LoggedInExample}
          exact
        />
        
        <ProtectedRoute
          {...protectedRouteProps}
          path="/profile"
          component={ProfilePage}
          exact
        />

        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
      </Switch>
    </Router>
  );
};

export default App;
