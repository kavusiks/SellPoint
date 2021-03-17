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
import { NotFoundPage } from "./pages/NotFound";

const App: FunctionComponent = () => {
  const session = useSessionContext();

  const protectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.isAuthenticated,
    authenticationPath: "/login",
    setRedirectPathOnAuthentication: session.setRedirectPath,
  };

  return (
    <Router>
      <Navigationbar />
      <Switch>
        <Route path="/" component={MainPage} exact />

        <ProtectedRoute {...protectedRouteProps} path="/ad/create" component={CreateAdPage} exact />
        <ProtectedRoute {...protectedRouteProps} path="/profile" component={ProfilePage} exact />

        <Route path="/ad/:id" component={AdViewPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />

        <Route path="/" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
