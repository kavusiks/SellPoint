import React, { FunctionComponent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ProfileDisplay } from "../components/Profile";
import { CenteredRow, DefaultSpinner, useErrorState } from "../components/styled";
import UserAPI from "../core/api/user";
import AdAPI from "../core/api/ad";
import { useParams } from "react-router";
import { Ad } from "../models/ad";
import User from "../models/user";

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
    <Container fluid className="mt-3">
      <CenteredRow>{error}</CenteredRow>
      {user ? <ProfileDisplay user={user} ads={userAds} /> : <DefaultSpinner />}
    </Container>
  );
};
export default VisitProfilePage;
