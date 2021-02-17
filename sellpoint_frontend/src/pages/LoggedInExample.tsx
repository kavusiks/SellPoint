import React, { FunctionComponent } from "react";
import { Button, Container } from "react-bootstrap";
import { Redirect, useHistory } from "react-router";
import { useSessionContext } from "../context/Session";
import AuthenticationService from "../core/auth";

// This is just an example component and should be removed
const LoggedInExample: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

  if (!session.user) {
    return <Redirect to="/login" />;
  }

  const logOut = () => {
    AuthenticationService.logOut();
    session.updateSelfUser().then(() => history.push("/login"));
  };

  return (
    <Container>
      <h1>{session.user.email}</h1>
      <Button variant="primary" onClick={logOut}>
        Logg Ut
      </Button>
    </Container>
  );
};

export default LoggedInExample;