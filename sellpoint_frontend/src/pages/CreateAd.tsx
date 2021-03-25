import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { CreateAdForm } from "../components/forms/CreateAdForm";
import { CenteredRow, FormContainer, useErrorState } from "../components/styled";

const CreateAdPage: FunctionComponent = () => {
  const { error, setError } = useErrorState();

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Opprett annonse</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            <CreateAdForm setError={setError} />
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default CreateAdPage;
