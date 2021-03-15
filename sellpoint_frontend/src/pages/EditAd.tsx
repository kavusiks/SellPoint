import React, { FunctionComponent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { EditAdForm } from "../components/forms/CreateAdForm";
import { CenteredRow, DefaultSpinner, FormContainer, useErrorState } from "../components/styled";
import { Ad } from "../models/ad";
import AdAPI from "../core/api/ad";

interface AdEditParams {
  id: string;
}

const EditAdPage: FunctionComponent = () => {
  const { id } = useParams<AdEditParams>();
  const [ad, setAd] = useState<Ad | undefined>(undefined);
  const { error, setError } = useErrorState();

  useEffect(() => {
    AdAPI.getById(+id)
      .then((found) => setAd(found))
      .catch((err) => setError("En error oppstod!"));
  }, [id, setError]);

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Rediger annonse</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            {ad ? <EditAdForm initial={ad} setError={setError} /> : <DefaultSpinner />}
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default EditAdPage;
