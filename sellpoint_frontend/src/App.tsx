import React, { FunctionComponent } from "react";
import { LoginForm } from "./components/login";
import { CreateUserForm } from "./components/create_user";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Route";
import "./App.css";
import { useSessionContext } from "./context/Session";
import { Button, Container } from "react-bootstrap";
import AuthenticationService from "./core/auth";

// This is just an example component and should be removed. No 
// such components should be present in this file.
const LoggedInExample: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

  if (!session.user) {
    return <Redirect to="/login" />;
  }

  const logOut = () => {
    AuthenticationService.logOut();
    session.updateSelfUser().then(() => history.push("/login"));
  };

  return (
    <Container>
      <h1>{session.user.email}</h1> 
      <Button variant="primary" onClick={logOut}>
        Logg Ut
      </Button>
    </Container>
  );
};

const App: FunctionComponent = () => {
  const session = useSessionContext();

  const protectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.isAuthenticated,
    authenticationPath: "/login",
    redirectPathOnAuthentication: session.redirectPath ?? "/success",
    setRedirectPathOnAuthentication: session.setRedirectPath,
  };

  return (
    <div>
      <h1>SellPoint</h1>
      <p>Velkommen!</p>

      <Router>
        <Switch>
          <ProtectedRoute
            {...protectedRouteProps}
            path="/success"
            component={LoggedInExample}
            exact
          />

          <Route path="/login" component={LoginForm} exact />
          <Route path="/signup" component={CreateUserForm} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
