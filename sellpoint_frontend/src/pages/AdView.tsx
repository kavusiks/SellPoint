import React, { FunctionComponent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import LargeAd from "../components/ads/LargeAd";
import { CenteredRow, DefaultSpinner, useErrorState } from "../components/styled";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";

interface AdViewParams {
  id: string;
}

const AdViewPage: FunctionComponent = () => {
  const { id } = useParams<AdViewParams>();
  const { error, setError } = useErrorState();
  const [ad, setAd] = useState<Ad | undefined>(undefined);

  useEffect(() => {
    AdAPI.getById(+id)
      .then((ad) => setAd(ad))
      .catch((error) => setError("En error oppstod!"));
  }, [id, setError]);

  return (
    <Container fluid>
      <CenteredRow noGutters>{ad ? <LargeAd ad={ad} /> : <DefaultSpinner />}</CenteredRow>
      <CenteredRow>{error}</CenteredRow>
    </Container>
  );
};

export default AdViewPage;
