import React, { FunctionComponent, useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { ProfileDisplay } from "../components/Profile";
import { CenteredRow, DefaultSpinner, useErrorState } from "../components/styled";
import UserAPI from "../core/api/user";
import AdAPI from "../core/api/ad";
import { useParams } from "react-router";
import { Ad } from "../models/ad";
import User from "../models/user";
import { AdListView } from "../components/ads/AdListView";

interface AdOwnerViewParams {
  id: string;
}
const VisitProfilePage: FunctionComponent = () => {
  const { id } = useParams<AdOwnerViewParams>();
  const { error, setError } = useErrorState();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userAds, setUserAds] = useState<Ad[]>([]);

  useEffect(() => {
    UserAPI.getUserToVisit(+id)
      .then((user) => setUser(user))
      .catch((error) => setError("En error oppstod!"));

    AdAPI.getAllAdsByUser(+id).then((ads) => setUserAds(ads));
  }, [id, setError]);

  return (
    <Container fluid>
      <Col sm={10}>
        <h2>Bruker</h2>
        {user ? <ProfileDisplay user={user} /> : <DefaultSpinner />}
        <CenteredRow>{error}</CenteredRow>
      </Col>
      <Col>
        <br />
        <h2>Brukerens annonser</h2>
        <AdListView perRow={1} ads={userAds} />
      </Col>
    </Container>
  );
};
export default VisitProfilePage;
