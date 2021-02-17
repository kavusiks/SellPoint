import React, { FunctionComponent, useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPathOnAuthentication: string;
  setRedirectPathOnAuthentication: (path: string | undefined) => void;
}

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const currentLocation = useLocation();

  useEffect(() => {
    if (!props.isAuthenticated) {
      const pathname = currentLocation.pathname;
      props.setRedirectPathOnAuthentication(pathname);
    }
  }, [currentLocation.pathname, props]);

  let redirectPath = props.redirectPathOnAuthentication;
  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath;
  }

  if (redirectPath !== currentLocation.pathname) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
