import React from "react";
import { FunctionComponent } from "react";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import "./index.css";
import { useSessionContext } from "../../context/Session";
import AuthenticationService from "../../core/auth";
import { useHistory, useLocation } from "react-router";

interface PathAwareButtonProps {
  href: string;
  variant: string;
  children?: React.ReactNode;
}

/**
 * A button component which will be enabled/disabled depending on the
 * current pathname, e. g. if this button redirects to /profile and
 * the current path is /profile the button will be disabled.
 */
const PathAwareButton: FunctionComponent<PathAwareButtonProps> = ({
  href,
  variant,
  children,
}: PathAwareButtonProps) => {
  const currentLocation = useLocation();
  const pathname = currentLocation.pathname;

  // Check if the current path is the one this button redirects to. If it
  // is, we can disable this button as it'd would do nothing
  if (pathname !== href) {
    return (
      <Button className="button" href={href} variant={variant}>
        {children}
      </Button>
    );
  }

  return (
    <Button className="button" variant={variant} disabled>
      {children}
    </Button>
  );
};

const Navigationbar: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();
  const currentLocation = window.location.href;
  const adID = currentLocation.split("/").pop();

  const makeButtons = () => {
    if (!session.isAuthenticated) {
      return (
        <>
          <PathAwareButton href="/register" variant="outline-secondary">
            Opprett bruker
          </PathAwareButton>
          <PathAwareButton href="/login" variant="outline-success">
            Logg Inn
          </PathAwareButton>
        </>
      );
    }
    /*If a user has clicked on an ad and is a super user,
    the button "Rediger Annonse" will take the super user directly to the admin site for this ad,
    where the editing can be done*/
    if (currentLocation.indexOf("http://localhost:3000/ad/") > -1) {
      const adminPath = "http://127.0.0.1:8000/admin/sellpoint_ads/ad/" + adID + "/change/"
      return (
        <>
          {session.user?.is_staff ? (
            <Button className="button" href={adminPath} variant="outline-primary">
              Rediger Annonse
            </Button>
          ) : null}

          <PathAwareButton href="/profile" variant="outline-secondary">
            Din Profil
        </PathAwareButton>
          <Button className="button" onClick={logOut} variant="outline-primary">
            Logg Ut
        </Button>
        </>
      );
    }

    /* If the user hasn't clicked any ads but is a super user,
    the button "Adminpanel" will take the super user to the general admin site.
    
    Neither "Rediger Annonse" og "Admin Panel" will show if the user is not a super user*/
    else {
      return (
        <>
          {session.user?.is_staff ? (
            <Button className="button" href="http://127.0.0.1:8000/admin/" variant="outline-primary">
              Adminpanel
            </Button>
          ) : null}

          <PathAwareButton href="/profile" variant="outline-secondary">
            Din Profil
          </PathAwareButton>
          <Button className="button" onClick={logOut} variant="outline-primary">
            Logg Ut
          </Button>
        </>
      );
    }
  };

  const logOut = () => {
    AuthenticationService.logOut();
    session.updateSelfUser().then(() => history.push("/login"));
  };

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/" className="logo">
        Sell<strong>Point</strong>
      </Navbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link href="/ad/create">Ny annonse</Nav.Link>
      </Nav>

      {makeButtons()}
    </Navbar>
  );
};

export default Navigationbar;
