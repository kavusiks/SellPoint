import React, { FunctionComponent } from "react";
import MainPage from "./components/MainPage";
import Navigationbar from "./components/NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Route";
import { useSessionContext } from "./context/Session";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import AdViewPage from "./pages/AdView";
import CreateAdPage from "./pages/CreateAd";

const App: FunctionComponent = () => {
  const session = useSessionContext();

  const protectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.isAuthenticated,
    authenticationPath: "/login",
    redirectPathOnAuthentication: session.redirectPath ?? "/",
    setRedirectPathOnAuthentication: session.setRedirectPath,
  };

  return (
    <Router>
      <Navigationbar />
      <Switch>
        <Route path="/" exact component={MainPage} />

        <Route path="/ad/create" exact component={CreateAdPage} />
        <Route path="/ad/:id" component={AdViewPage} />

        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
        <ProtectedRoute {...protectedRouteProps} path="/profile" component={ProfilePage} exact />
      </Switch>
    </Router>
  );
};

export default App;
