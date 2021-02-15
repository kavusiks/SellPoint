import React, { FunctionComponent } from "react";

import "./App.css";
//import {Switch, Route, Router } from "react-router-dom";
import { LoginForm } from "./components/login";
import { CreateUserForm } from "./components/create_user";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: FunctionComponent = () => {
  return (
    <div>
      <h1>SellPoint</h1>
      <p>Velkommen!</p>

      <Router>
        <Switch>
          <Route path="/login" component={LoginForm} exact />
          <Route path="/signup" component={CreateUserForm} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
