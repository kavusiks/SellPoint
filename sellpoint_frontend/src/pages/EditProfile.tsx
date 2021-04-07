import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
//import { useHistory } from "react-router";
import { EditProfileForm } from "../components/forms/EditProfileForm";
import { CenteredRow, FormContainer, useErrorState } from "../components/styled";
import { useSessionContext } from "../context/Session";

const EditProfilePage: FunctionComponent = () => {
  const { error, setError } = useErrorState();
  const session = useSessionContext();

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Rediger din bruker</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            {session.user ? <EditProfileForm setError={setError} user={session.user} /> : <br />}
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default EditProfilePage;
