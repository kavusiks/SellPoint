import React, { FunctionComponent, useState } from "react";
import { Alert, Container, Button, Form } from "react-bootstrap";
import { useSessionContext } from "../../context/Session";
import AuthenticationService from "../../core/auth";
import { CenteredRow } from "../styled";
import UserAPI from "../../core/api/user";

export const LoginForm: FunctionComponent = () => {
  const session = useSessionContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [validated, setValidated] = useState<boolean>(false);

  const makeError = () => {
    if (!error) {
      return null;
    }

    return <Alert variant="warning">{error}</Alert>;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitting with " + email + ", " + password);
    setValidated(true);

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }

    AuthenticationService.login(email, password, remember)
      .then((tokens) => {
        console.log("Authenticated successfully! Received tokens!");
        console.log(tokens);
        
        session.updateSelfUser();
      })
      .catch((error) => {
        console.log(error);
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
        </Form>
      </Container>
      {makeError()}
    </>
  );
};

export default LoginForm;
