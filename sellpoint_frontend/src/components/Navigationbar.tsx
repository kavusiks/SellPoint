import React from "react";
import { FunctionComponent } from "react";
import { Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Button } from "react-bootstrap";
import './Navigationbar.css';


const Navigationbar: FunctionComponent = () => {
    return (
        <div className="page">
      <br />
      <Navbar bg="light" variant="light">
        
        <Navbar.Brand href="/" className = "sellpointFont">Sellpoint</Navbar.Brand>
        
        <Nav className="mr-auto">
          <Nav.Link href="/create-ad">Ny annonse</Nav.Link>
        </Nav>
        
        <Form inline>
          <Button href='/register' variant="outline-success" >Opprett bruker</Button>
          <Button href='/login' variant="outline-success" >Logg inn</Button>
        </Form>

      </Navbar> 
        
    
        </div>
      );

        
};

export default Navigationbar;
