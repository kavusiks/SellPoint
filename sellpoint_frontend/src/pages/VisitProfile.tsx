import React, { FunctionComponent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ProfileDisplay } from "../components/Profile";
import { CenteredRow, DefaultSpinner, useErrorState } from "../components/styled";
import UserAPI from "../core/api/user";
import { useParams } from "react-router";
import User from "../models/user";

interface AdOwnerViewParams {
  id: string;
}
const VisitProfilePage: FunctionComponent = () => {
  const { id } = useParams<AdOwnerViewParams>();
  const { error, setError } = useErrorState();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    UserAPI.getUserToVisit(+id)
      .then((user) => setUser(user))
      .catch((error) => setError("En error oppstod!"));
  }, [id, setError]);

  return (
    <Container fluid>
      {user ? <ProfileDisplay user={user} /> : <DefaultSpinner />}
      <CenteredRow>{error}</CenteredRow>
    </Container>
  );
};

export default VisitProfilePage;
