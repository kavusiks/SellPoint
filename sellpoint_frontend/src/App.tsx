import React, { FunctionComponent } from "react";
import CreateAd from "./components/CreateAd"
import MainPage from "./components/MainPage";
import Navigationbar from "./components/Navigationbar";
import AdComponent from "./components/AdComponent";
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
      <Navigationbar/>
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/create-ad" exact component={CreateAd}/>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
        <ProtectedRoute {...protectedRouteProps} path="/success" component={LoggedInExample} exact/>
        <ProtectedRoute {...protectedRouteProps} path="/profile" component={ProfilePage} exact />
        <Route path="/:id" component={AdComponent}/>
      </Switch>
    </Router>
  );  
};

export default App;
