import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { EditPasswordForm } from "../components/forms/EditPasswordForm";
import { CenteredRow, FormContainer, useErrorState } from "../components/styled";

const EditPasswordPage: FunctionComponent = () => {
  const { error, setError } = useErrorState();

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Rediger passord</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            <EditPasswordForm setError={setError} />
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default EditPasswordPage;
