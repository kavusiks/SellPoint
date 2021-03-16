import React, { FunctionComponent } from "react";
import MainPage from "./pages/MainPage";
import Navigationbar from "./components/NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Route";
import { useSessionContext } from "./context/Session";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import AdViewPage from "./pages/AdView";
import CreateAdPage from "./pages/CreateAd";
import EditAdPage from "./pages/EditAd";

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

        <Route path="/ad/create" component={CreateAdPage} exact />
        <Route path="/ad/:id" component={AdViewPage} exact />

        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
        <ProtectedRoute
          {...protectedRouteProps}
          path="/profile/:page?"
          component={ProfilePage}
          exact
        />
        <ProtectedRoute {...protectedRouteProps} path="/ad/:id/edit" component={EditAdPage} exact />
      </Switch>
    </Router>
  );
};

export default App;
