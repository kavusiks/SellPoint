import React, { FunctionComponent } from "react";

import "./App.css";
//import {Switch, Route, Router } from "react-router-dom";
import { LoginForm }  from "./components/login"
import { CreateUserForm } from "./components/create_user";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


const App: FunctionComponent = () => {
  return (
    <div>
      <h1>SellPoint</h1>
      <p>Velkommen!</p>

      <Router>
      <Switch>
        <Route exact path="/" component ={LoginForm} />
        <Route path="/createUser" component = {CreateUserForm} /> 


      </Switch>
    </Router>
    </div>


  );
};

export default App;
