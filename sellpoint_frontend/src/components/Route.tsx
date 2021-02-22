import React, { FunctionComponent, useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router";

/**
 * Props for a {@link ProtectedRoute}
 */
export interface ProtectedRouteProps extends RouteProps {
  /**
   * If the user is currently authenticated
   */
  isAuthenticated: boolean;
  /**
   * The path to the authentication route, e. g. `/login`
   */
  authenticationPath: string;
  /**
   * The path to redirect to after authenticating
   */
  redirectPathOnAuthentication: string;
  /**
   * Sets the redirectPathOnAuthentication field
   *
   * @param path - The new path for redirectPathOnAuthentication
   */
  setRedirectPathOnAuthentication: (path: string | undefined) => void;
}

/**
 * A {@link Route} that requires the user to be logged in to view. Note
 * that this is not a security feature, but more of a convenience feature.
 * If a user was so inclined, they could override this and access the page
 * anyway. This component serves as a utility, avoiding users using links
 * to access pages that require them to be logged in by the backend.
 *
 * @param props - The props
 */
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
