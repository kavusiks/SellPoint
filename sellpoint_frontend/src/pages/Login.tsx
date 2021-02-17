import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../components/forms/LoginForm";
import { CenteredRow, FormContainer, useErrorState } from "../components/styled";

const LoginPage: FunctionComponent = () => {
  const { error, setError } = useErrorState();

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Logg Inn</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            <LoginForm setError={setError} />
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default LoginPage;
