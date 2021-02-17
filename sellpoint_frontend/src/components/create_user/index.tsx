import React, { FunctionComponent, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useSessionContext } from "../../context/Session";
import AuthenticationService from "../../core/auth";
import User, {Address} from "../../models/user";

//import { Link } from 'react-router-dom';

export const CreateUserForm: FunctionComponent = () => {
  const session = useSessionContext();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [postalcode, setPostalcode] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [validated, setValidated] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitting with " + email + ", " + password1);
    setValidated(true);

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity() || password1!==password2) {
      e.stopPropagation();
      return;
    }

    const address: Address = {
      city: city,
      country: country,
      postalcode: postalcode,
      line1: address1,
      line2: address2,
    };
    const user: User = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      address: address,
    };
    AuthenticationService.signUp(user, password1)
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
    <div>
      <Container>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>Fornavn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ola"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Etternavn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nordmann"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="eMail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="passord">
              <Form.Label>Passord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Passord"
                onChange={(e) => setPassword1(e.target.value)}
                isInvalid={validated && password1 !== password2}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="passord2">
              <Form.Label>Gjenta passord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Passord"
                onChange={(e) => setPassword2(e.target.value)}
                isInvalid={validated && password1 !== password2}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="Address">
            <Form.Label>Addresse 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="Høyskoleringen 4"
              onChange={(e) => setAddress1(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="Address">
            <Form.Label>Addresse 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Leilighet nr. 3"
              onChange={(e) => setAddress2(e.target.value)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="land">
              <Form.Label>Land</Form.Label>
              <Form.Control
                type="text"
                placeholder="Norge"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="by">
              <Form.Label>By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Trondheim"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="postkode">
              <Form.Label>Postkode</Form.Label>
              <Form.Control
                type="text"
                placeholder="7030"
                onChange={(e) => setPostalcode(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Registrer
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateUserForm;
