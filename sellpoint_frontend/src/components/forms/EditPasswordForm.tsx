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
 * The props for the {@link EditPasswordForm}
 */
export interface EditPasswordProps extends FormProps {
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
export const EditPasswordForm: FunctionComponent<EditPasswordProps> = ({
  setError,
  logIn,
  rememberLogIn,
}: EditPasswordProps) => {
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
          .catch((error) => {
            setPassword("");
            setConfirmPassword("");
            setError("En uforventet error oppstod!");
          });
      })
      .catch((error) => {
        setPassword("");
        setConfirmPassword("");
        setError(error.response ? readDjangoError(error.response) : "En uforventet error oppstod!");
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Form.Group controlId="form-signup-confirm-password">
        <Form.Label>Gjenta passord</Form.Label>
        <Form.Control
          type="password"
          placeholder="Passord"
          minLength={8}
          value={confirmPassword}
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

      <CenteredRow noGutters>
        <StyledButton variant="secondary" href="/login">
          Log Inn
        </StyledButton>
        <StyledButton variant="primary" type="submit">
          Registrer
        </StyledButton>
      </CenteredRow>
    </Form>
  );
};
