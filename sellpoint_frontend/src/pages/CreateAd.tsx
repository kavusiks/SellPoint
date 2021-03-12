import React, { FunctionComponent, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CreateAdForm from "../components/forms/CreateAdForm";
import { CenteredRow, FormContainer, useErrorState } from "../components/styled";
import { Category } from "../models/ad";
import AdAPI from "../core/api/ad";

const CreateAdPage: FunctionComponent = () => {
  const { error, setError } = useErrorState();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    AdAPI.getAllCategories().then((categories) => setCategories(categories));
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
