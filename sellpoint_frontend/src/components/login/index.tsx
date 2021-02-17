import React, { FunctionComponent, useState } from "react";
import { Alert, Container, Button, Form } from "react-bootstrap";
import { useSessionContext } from "../../context/Session";
import AuthenticationService from "../../core/auth";
import { CenteredRow } from "../styled";
import { useHistory } from "react-router";

export const LoginForm: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [validated, setValidated] = useState<boolean>(false);

  const makeError = () => {
    if (!error) {
      return null;
    }

    return (
      <CenteredRow>
        <Alert style={{ margin: "10px" }} variant="danger">
          {error}
        </Alert>
      </CenteredRow>
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValidated(true);

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }

    AuthenticationService.login(email, password, remember)
      .then((tokens) => {
        session
          .updateSelfUser()
          .then(() => history.push("/success"))
          .catch((error) => setError("En error oppstod!"));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError("Feil brukernavn eller passord!");
          return;
        }

        setError("En error oppstod!");
      });
  };

  return (
    <>
      <Container>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <CenteredRow>
            <Form.Group controlId="form-login-email">
              <Form.Label>Emailaddresse</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Vennligst skriv inn din emailaddresse!
              </Form.Control.Feedback>
            </Form.Group>
          </CenteredRow>
          <CenteredRow>
            <Form.Group controlId="form-login-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Passord"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Vennligst skriv inn ditt passord!
              </Form.Control.Feedback>
            </Form.Group>
          </CenteredRow>
          <CenteredRow>
            <Form.Group controlId="form-login-remember">
              <Form.Check
                type="checkbox"
                label="Forbli innlogget"
                onClick={(e) => setRemember(!remember)}
                isInvalid={false}
                isValid={false}
              />
            </Form.Group>
          </CenteredRow>
          <CenteredRow>
            <Button variant="primary" type="submit">
              Logg inn
            </Button>
          </CenteredRow>
          {makeError()}
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
