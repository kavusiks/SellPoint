import React, { FunctionComponent } from "react";
import MainPage from "./pages/MainPage";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Route";
import { useSessionContext } from "./context/Session";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import AdViewPage from "./pages/AdView";
import CreateAdPage from "./pages/CreateAd";
import EditProfilePage from "./pages/EditProfile";
import EditPasswordPage from "./pages/EditPassword";
import EditAdPage from "./pages/EditAd";
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
      <NavigationBar />
      <Switch>
        <Route path="/" component={MainPage} exact />

        <ProtectedRoute {...protectedRouteProps} path="/ad/create" component={CreateAdPage} exact />

        <Route path="/ad/:id" component={AdViewPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/editprofile" component={EditProfilePage} exact />
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/password" component={EditPasswordPage} exact />
        <ProtectedRoute {...protectedRouteProps} path="/profile" component={ProfilePage} exact />

        <ProtectedRoute
          {...protectedRouteProps}
          path="/profile/:page?"
          component={ProfilePage}
          exact
        />
        <ProtectedRoute {...protectedRouteProps} path="/ad/:id/edit" component={EditAdPage} exact />

        {/* Leave this at the very bottom, since it will match to anything */}
        <Route path="/" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
