import React, { FunctionComponent, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CreateAdForm } from "../components/forms/CreateAdForm";
import { CenteredRow, FormContainer, useErrorState } from "../components/styled";
import AdAPI from "../core/api/ad";

const CreateAdPage: FunctionComponent = () => {
  const { error, setError } = useErrorState();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    AdAPI.getAllCategories().then((category) =>
      category.forEach((category) => setCategories((state) => [...state, category.name])),
    );
  }, []);

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Opprett annonse</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            <CreateAdForm categories={categories} setError={setError} />
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default CreateAdPage;
