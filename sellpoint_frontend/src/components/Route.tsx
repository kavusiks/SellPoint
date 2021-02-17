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
  const pathname = currentLocation.pathname;

  useEffect(() => {
    if (!props.isAuthenticated) {
      props.setRedirectPathOnAuthentication(pathname);
    }
  }, [currentLocation.pathname, pathname, props]);

  if (!props.isAuthenticated) {
    const renderComponent = () => <Redirect to={{ pathname: props.authenticationPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
