import React, { FunctionComponent } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { ProfileDisplay } from "../components/Profile";
import { CenteredRow, DefaultSpinner, FormContainer } from "../components/styled";
import { useSessionContext } from "../context/Session";

const ProfilePage: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

  const goBack = () => {
    session.updateSelfUser().then(() => history.push("/"));
  };

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer style={{ maxWidth: "80%", width: "auto" }}>
          <h1>Min profil</h1>
          {session.user ? <ProfileDisplay user={session.user} /> : <DefaultSpinner />}

          <Button style={{ marginTop: "10px" }} variant="primary" onClick={goBack}>
            Tilbake
          </Button>
        </FormContainer>
      </CenteredRow>
    </Container>
  );
};

export default ProfilePage;
