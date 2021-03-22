import React, { FunctionComponent } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { EditPasswordForm } from "../components/forms/EditPasswordForm";
import {
  CenteredRow,
  FormContainer,
  useAuthenticationPage,
  useErrorState,
} from "../components/styled";
import { useSessionContext } from "../context/Session";

/*const EditProfile: FunctionComponent = () => {
    const session = useSessionContext();
    const history = useHistory();
  
    const goBack = () => {
      session.updateSelfUser().then(() => history.push("/"));
    };
*/

const EditPasswordPage: FunctionComponent = () => {
  const { error, setError } = useErrorState();
  const session = useSessionContext();
  const history = useHistory();

  //useAuthenticationPage();

  return (
    <Container fluid>
      <CenteredRow noGutters>
        <FormContainer fluid>
          <CenteredRow noGutters>
            <h1>Rediger Bruker</h1>
            <h1>{session.user?.first_name}</h1>
          </CenteredRow>
          <CenteredRow noGutters>
            <EditPasswordForm setError={setError} logIn rememberLogIn />
          </CenteredRow>
        </FormContainer>
      </CenteredRow>

      {error}
    </Container>
  );
};

export default EditPasswordPage;
