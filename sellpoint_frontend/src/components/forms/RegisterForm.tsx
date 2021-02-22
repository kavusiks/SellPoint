import React, { FunctionComponent, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import { useSessionContext } from "../../context/Session";
import AuthenticationService from "../../core/auth";
import User, { Address } from "../../models/user";
import { CenteredRow } from "../styled";
import { AddressFormPart, FormProps } from "./FormParts";
import { readDjangoError } from "../../core/client";
import styled from "styled-components";

const StyledButton = styled(Button)`
  margin: 10px;
`;

/**
 * The props for the {@link RegisterForm}
 */
export interface RegisterFormProps extends FormProps {
  /**
   * If the user should be logged in automatically after registering,
   * if registration is successful.
   */
  logIn?: boolean;
  /**
   * If the user should stay logged in. This option will not do anything
   * unless `logIn` is set to `true`.
   */
  rememberLogIn?: boolean;
}

/**
 * A form for registering a new user
 *
 * @param props - The props
 */
export const RegisterForm: FunctionComponent<RegisterFormProps> = ({
  setError,
  logIn,
  rememberLogIn,
}: RegisterFormProps) => {
  const session = useSessionContext();
  const history = useHistory();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [validated, setValidated] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // We use a state for this so that validation doesn't display
    // until after the first submission attempt
    setValidated(true);

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity() || !address || password !== confirmPassword) {
      e.stopPropagation();
      return;
    }

    const user: User = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address: address,
    };

    AuthenticationService.signUp(user, password, logIn, rememberLogIn)
      .then(() => {
        session
          .updateSelfUser()
          .then(() => history.push(logIn ? session.redirectPath ?? "/" : "/login"))
          .catch((error) => setError("En uforventet error oppstod!"));
      })
      .catch((error) => {
        setError(error.response ? readDjangoError(error.response) : "En uforventet error oppstod!");
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="form-signup-first-name">
          <Form.Label>Fornavn</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            pattern="^[a-zA-Z\p{L}]+$"
            minLength={2}
            placeholder="Ola"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="form-signup-last-name">
          <Form.Label>Etternavn</Form.Label>
          <Form.Control
            type="text"
            pattern="^[a-zA-Z\p{L}]+$"
            minLength={2}
            placeholder="Nordmann"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="form-signup-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          minLength={7}
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="form-signup-password">
        <Form.Label>Passord</Form.Label>
        <Form.Control
          type="password"
          placeholder="Passord"
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={validated && password !== confirmPassword}
          required
        />
      </Form.Group>

      <Form.Group controlId="form-signup-confirm-password">
        <Form.Label>Gjenta passord</Form.Label>
        <Form.Control
          type="password"
          placeholder="Passord"
          minLength={8}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isInvalid={validated && password !== confirmPassword}
          required
        />
      </Form.Group>

      <Form.Group controlId="form-signup-phonenumber">
        <Form.Label>Telefonnummer</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">+47</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            pattern="[0-9]*"
            minLength={8}
            maxLength={17}
            placeholder="Telefonnummer"
            onChange={(e) => setPhoneNumber("+47" + e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>

      <AddressFormPart onChange={setAddress} />

      <CenteredRow noGutters>
        <StyledButton variant="secondary" href="/login">
          Tilbake
        </StyledButton>
        <StyledButton variant="primary" type="submit">
          Registrer
        </StyledButton>
      </CenteredRow>
    </Form>
  );
};
