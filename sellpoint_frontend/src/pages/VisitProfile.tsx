import React, { FunctionComponent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ProfileDisplay } from "../components/Profile";
import { CenteredRow, DefaultSpinner, useErrorState } from "../components/styled";
import { Ad } from "../models/ad";
import AdAPI from "../core/api/ad";
import UserAPI from "../core/api/user";
import { useParams } from "react-router";
import User from "../models/user";

interface AdOwnerViewParams {
  id: string;
}
const VisitProfilePage: FunctionComponent = () => {
  const { id } = useParams<AdOwnerViewParams>();
  const { error, setError } = useErrorState();
  const [ad, setAd] = useState<Ad | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    AdAPI.getById(+id)
      .then((ad) => setAd(ad))
      .catch((error) => setError("En error oppstod!"));

    if (ad !== undefined) {
      if (ad.owner?.email !== undefined) {
        UserAPI.getUserToVisit(ad.owner.email).then((user) => setUser(user));
      }
    }
  }, [id, setError]);

  useEffect(() => {
    if (ad !== undefined) {
      if (ad.owner !== undefined) {
        UserAPI.getUserToVisit(ad.owner.email).then((user) => setUser(user));
        console.log(user?.email);
      }
    }
  }, [ad, setAd]);

  return (
    <Container fluid>
      {user ? <ProfileDisplay user={user} /> : <DefaultSpinner />}
      <CenteredRow>{error}</CenteredRow>
    </Container>
  );
};

export default VisitProfilePage;
