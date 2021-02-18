import React, { FunctionComponent } from "react";
import { Button, ButtonGroup, ButtonToolbar, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { useSessionContext } from "../context/Session";
import AuthenticationService from "../core/auth";

// This is just an example component and should be removed
const LoggedInExample: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

  const logOut = () => {
    AuthenticationService.logOut();
    session.updateSelfUser().then(() => history.push("/login"));
  };

  const myProfile = () => {
    session.updateSelfUser().then(() => history.push("/profile"));
  };

  return (
    <Container>
      <h1>{session.user ? session.user.email : "Loading..."}</h1>

      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button variant="primary" onClick={logOut}>
            Logg Ut
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2" aria-label="Second group">
          <Button variant="primary" onClick={myProfile}>
            Min profil
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Container>
  );
};

export default LoggedInExample;
