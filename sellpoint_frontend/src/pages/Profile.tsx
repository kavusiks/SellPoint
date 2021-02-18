import React, { FunctionComponent } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { CenteredRow } from "../components/styled";
import { useSessionContext } from "../context/Session";
import AuthenticationService from "../core/auth";


// This is just an example component and should be removed
const LoggedInExample: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();


  const goBack = () => {
    //AuthenticationService.logOut();
    session.updateSelfUser().then(() => history.push("/success"));
  };

  return (
    <Container>
      <h1>Min profil</h1>
      <CenteredRow>
          <img alt="profilepicture" style={{width: 100}} src={String('profile_picture_holder.png')}/>
      </CenteredRow>
      <CenteredRow>
      <h2>
        Navn: {session.user ? session.user.first_name : "Loading..."}{" "}
        {session.user ? session.user.last_name : "Loading..."}
      </h2>
      </CenteredRow>
      <CenteredRow>
      <h3>Email: {session.user ? session.user.email : "Loading..."}</h3>
      </CenteredRow>
      <CenteredRow>
      <h3>Telefonnummer: {session.user ? session.user.phone_number : "Loading..."}</h3>
      </CenteredRow>
      <CenteredRow>
      <h3>
        Adresse: {session.user ? session.user.address.line1 : "Loading..."}, Adresse2:{" "}
        {session.user ? session.user.address.line2 : "Loading..."}
      </h3>
      </CenteredRow>
      <CenteredRow>
      <h3>
        {session.user ? session.user.address.postalcode : "Loading..."}{" "}
        {session.user ? session.user.address.city : "Loading..."}{" "}
        {session.user ? session.user.address.country : "Loading..."}
      </h3>
      </CenteredRow>

      <Button variant="primary" onClick={goBack}>
        Tilbake
      </Button>
    </Container>
    
  );
};

export default LoggedInExample;
