import React, { FunctionComponent, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useSessionContext } from "../../context/Session";
import AuthenticationService from "../../core/auth";
import Adress from "../../models/user";
import User from "../../models/user";

//import { Link } from 'react-router-dom';

export const CreateUserForm: FunctionComponent = () => {
  const session = useSessionContext();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [validated, setValidated] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitting with " + email + ", " + password);
    setValidated(true);

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }
   
    const user: User={
      email: email,
      first_name: firstName,
      last_name: lastName,   
    }
    AuthenticationService.signUp(user, password)
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="passord">
              <Form.Label>Passord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Passord"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="Adress">
            <Form.Label>Addresse</Form.Label>
            <Form.Control
              type="text"
              placeholder="Høyskoleringen 4"
              onChange={(e) => setAdress(e.target.value)}
            />
          </Form.Group>

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
                onChange={(e) => setZip(e.target.value)}
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
