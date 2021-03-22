import React from "react";
import { FunctionComponent } from "react";
import { ButtonGroup, Dropdown, Navbar } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
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
  className?: string;
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
  className = "button",
}: PathAwareButtonProps) => {
  const currentLocation = useLocation();
  const pathname = currentLocation.pathname;

  // Check if the current path is the one this button redirects to. If it
  // is, we can disable this button as it'd would do nothing
  return (
    <Button className={className} href={href} variant={variant} disabled={pathname === href}>
      {children}
    </Button>
  );
};

const ProfileButton: FunctionComponent = () => {
  return (
    <Dropdown as={ButtonGroup}>
      <Button className="" href="/profile" variant="outline-secondary">
        <Person size={24} style={{ margin: "-4px 5px -1px -3px" }} />
        Din Profil
      </Button>

      <Dropdown.Toggle split variant="outline-secondary" id="profile-split" />

      <Dropdown.Menu>
        <Dropdown.Item href="/profile/personal">Personlig Informasjon</Dropdown.Item>
        <Dropdown.Item href="/profile/ads">Dine Annonser</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

/**
 * Global navbar
 */
const NavigationBar: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

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

    return (
      <>
        {session.user?.is_staff ? (
          <Button
            className="button"
            href="http://127.0.0.1:8000/admin/"
            variant="outline-primary"
            target="_blank"
          >
            Adminpanel
          </Button>
        ) : null}

        <ProfileButton />
        <Button className="button" onClick={logOut} variant="outline-primary">
          Logg Ut
        </Button>
      </>
    );
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

export default NavigationBar;
