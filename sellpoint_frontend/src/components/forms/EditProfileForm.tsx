import React, { FunctionComponent, useState, useEffect } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import UserAPI from "../../core/api/user";
import User, { Address } from "../../models/user";
import { CenteredRow } from "../styled";
import { AddressFormPart, FormProps } from "./FormParts";
import { readDjangoError } from "../../core/client";
import styled from "styled-components";

const StyledButton = styled(Button)`
  margin: 10px;
`;

/**
 * The props for the {@link EditProfileForm}
 */
export interface EditProfileFormProps extends FormProps {
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

  user: User;
}

/**
 * A form for registering a new user
 *
 * @param props - The props
 */
export const EditProfileForm: FunctionComponent<EditProfileFormProps> = ({
  setError,
  user,
}: EditProfileFormProps) => {
  const history = useHistory();
  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastName] = useState<string>(user.last_name);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    //setAddress(user.address);
    if (user.phone_number) {
      setPhoneNumber(user.phone_number);
    }
  }, [user.phone_number]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("KJører onSUbmit");
    // We use a state for this so that validation doesn't display
    // until after the first submission attempt
    setValidated(true);
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity() || !address || password !== confirmPassword) {
      e.stopPropagation();
      console.log("feil:" + e);
      console.log(address);
      console.log(password === confirmPassword);
      console.log(form.checkValidity);
      return;
    }

    const user: User = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address: address,
    };

    console.log(user.first_name, "test");
    UserAPI.editUser(user, password, address)
      .then(() => history.push("/login"))
      .catch((error) => {
        setPassword("");
        setConfirmPassword("");
        setError(error.response ? readDjangoError(error.response) : "En uforventet error oppstod!");
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="form-edit-first-name">
          <Form.Label>Fornavn</Form.Label>

          <Form.Control
            defaultValue={firstName}
            autoFocus
            type="text"
            pattern="^[a-zA-Z\p{L}]+$"
            minLength={2}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="form-edit-last-name">
          <Form.Label>Etternavn</Form.Label>

          <Form.Control
            defaultValue={lastName}
            type="text"
            pattern="^[a-zA-Z\p{L}]+$"
            minLength={2}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="form-edit-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          defaultValue={email}
          type="email"
          minLength={7}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="form-edit-phonenumber">
        <Form.Label>Telefonnummer</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">+47</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            defaultValue={phoneNumber.replace("+47", "")}
            type="text"
            pattern="[0-9]*"
            minLength={8}
            maxLength={17}
            onChange={(e) => setPhoneNumber("+47" + e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="form-edit-password">
        <Form.Label>Passord</Form.Label>
        <Form.Control
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={validated && password !== confirmPassword}
          required
        />
      </Form.Group>
      <Form.Group controlId="form-edit-confirm-password">
        <Form.Label>Gjenta Passord</Form.Label>
        <Form.Control
          type="password"
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isInvalid={validated && password !== confirmPassword}
          required
        />
      </Form.Group>

      {!user.is_staff ? <AddressFormPart onChange={setAddress} editingUser={user} /> : <br />}

      <CenteredRow noGutters>
        <StyledButton variant="primary" type="submit">
          Rediger
        </StyledButton>
      </CenteredRow>
    </Form>
  );
};
