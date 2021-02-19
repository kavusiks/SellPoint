import React, { FunctionComponent } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { CenteredRow, DefaultSpinner, FormContainer, LeftCenterRow } from "../components/styled";
import { useSessionContext } from "../context/Session";
import User from "../models/user";
import default_avatar from "../static/profile_picture_holder.png";

interface ProfileFieldProps {
  title: string;
  value: string | React.ReactNode;
}

interface ProfileDisplayProps {
  user: User;
}

const ProfileDisplay: FunctionComponent<ProfileDisplayProps> = ({ user }: ProfileDisplayProps) => {
  return (
    <>
      <LeftCenterRow xs={10}>
        <Col xs={2}>
          <img style={{ width: "100%", height: "auto" }} alt="Profilbilde" src={default_avatar} />
        </Col>

        <Col xs={8}>
          <Container>
            <LeftCenterRow>
              <h2>{user.first_name + " " + user.last_name}</h2>
            </LeftCenterRow>

            <LeftCenterRow>
              <p>Email: {user.email}</p>
            </LeftCenterRow>

            <LeftCenterRow>
              <p>Telefonnummer: {user.phone_number}</p>
            </LeftCenterRow>

            <LeftCenterRow>
              <p>
                Adresse: {user.address.line1}
                <br /> {user.address.line2}
              </p>
            </LeftCenterRow>

            <LeftCenterRow>
              <p>
                {user.address.postalcode} {user.address.city} {user.address.country}
              </p>
            </LeftCenterRow>
          </Container>
        </Col>
      </LeftCenterRow>
    </>
  );
};

const Profile: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

  const goBack = () => {
    session.updateSelfUser().then(() => history.push("/success"));
  };

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer style={{ maxWidth: "80%", width: "auto" }}>
          <h1>Min profil</h1>
          {session.user ? <ProfileDisplay user={session.user} /> : <DefaultSpinner />}

          <Button style={{ marginTop: "10px" }} variant="primary" onClick={goBack}>
            Tilbake
          </Button>
        </FormContainer>
      </CenteredRow>
    </Container>
  );
};

export default Profile;
