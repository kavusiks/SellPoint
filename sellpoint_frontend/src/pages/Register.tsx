import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { RegisterForm } from "../components/forms/RegisterForm";
import { CenteredRow, FormContainer, useAuthenticationPage, useErrorState } from "../components/styled";

const RegisterPage: FunctionComponent = () => {
  const { error, setError } = useErrorState();

  useAuthenticationPage();

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Opprett Bruker</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            <RegisterForm setError={setError} />
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default RegisterPage;
