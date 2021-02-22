import React, { FunctionComponent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSessionContext } from "../../context/Session";
import AuthenticationService from "../../core/auth";
import { CenteredRow, LeftCenterRow } from "../styled";
import { useHistory } from "react-router";
import { FormProps } from "./FormParts";
import styled from "styled-components";

const StyledButton = styled(Button)`
  margin: 10px;
`;

/**
 * A form for logging in. Handles input validation and authentication
 * automatically.
 *
 * @param props - The props
 */
export const LoginForm: FunctionComponent<FormProps> = ({ setError }: FormProps) => {
  const session = useSessionContext();
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

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
          .then(() => history.push(session.redirectPath ?? "/"))
          .catch((error) => setError("En uforventet error oppstod!"));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError("Feil brukernavn eller passord!");
          return;
        }

        setError("En uforventet error oppstod!");
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Form.Group controlId="form-login-email">
        <Form.Label>
          <p>Emailaddresse</p>
        </Form.Label>
        <Form.Control
          autoFocus
          type="email"
          placeholder="Emailaddresse"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Vennligst skriv inn din emailaddresse!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="form-login-password">
        <Form.Label>
          <p>Passord</p>
        </Form.Label>
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

      <LeftCenterRow noGutters>
        <Form.Group controlId="form-login-remember">
          <Form.Check
            type="checkbox"
            label="Forbli innlogget"
            onClick={(e) => setRemember(!remember)}
          />
        </Form.Group>
      </LeftCenterRow>

      <CenteredRow noGutters>
        <StyledButton variant="secondary" href="/register">
          Opprett konto
        </StyledButton>
        <StyledButton variant="primary" type="submit">
          Logg inn
        </StyledButton>
      </CenteredRow>
    </Form>
  );
};

export default LoginForm;
