import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { EditPasswordForm } from "../components/forms/EditPasswordForm";
import { CenteredRow, FormContainer, useErrorState } from "../components/styled";
import { useSessionContext } from "../context/Session";

const EditPasswordPage: FunctionComponent = () => {
  const { error, setError } = useErrorState();
  const session = useSessionContext();

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Rediger Bruker</h1>
            <h1>{session.user?.first_name}</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            <EditPasswordForm setError={setError} logIn rememberLogIn />
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default EditPasswordPage;
