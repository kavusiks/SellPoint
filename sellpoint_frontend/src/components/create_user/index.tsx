import React, { FunctionComponent } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
//import { Link } from 'react-router-dom';



export const CreateUserForm: FunctionComponent = () => {
  return (
    <div>
      <Container>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>Fornavn</Form.Label>
              <Form.Control type="text" placeholder="Ola" />
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Etternavn</Form.Label>
              <Form.Control type="text" placeholder="Nordmann" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="eMail">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="example@gmail.com" />
          </Form.Group>

          <Form.Group controlId="Adress">
            <Form.Label>Addresse</Form.Label>
            <Form.Control placeholder="Høyskoleringen 4" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="by">
              <Form.Label>By</Form.Label>
              <Form.Control placeholder="Trondheim" />
            </Form.Group>

            <Form.Group as={Col} controlId="postkode">
              <Form.Label>Postkode</Form.Label>
              <Form.Control placeholder="7030" />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="signup">
            Registrer
  </Button>
        </Form>
      </Container>
    </div>
  );
};


export default CreateUserForm;
