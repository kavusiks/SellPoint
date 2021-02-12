import React, { FunctionComponent } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'


const App: FunctionComponent = () => {
  return (
    <div>

<>
  <br />
  <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">Sellpoint</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Sett link 1</Nav.Link>
      <Nav.Link href="#features">Sett link 2</Nav.Link>
      <Nav.Link href="#pricing">Sett link 3</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Logg inn</Button>
    </Form>
  </Navbar>
</>
      
      
      
      
      
      <button>Logg</button>


      <p>
        <Button variant="outline-success">Logg inn</Button>{' '}
      </p>
      
      <div className ="form-group"> 
        <button className="btn outline-success btn-lg float-right" 
        type="submit"> 
        Submit  
      </button> 
    </div>

    </div>
  );
};

export default App;
