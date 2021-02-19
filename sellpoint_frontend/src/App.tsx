import React, { FunctionComponent } from "react";
import "./App.css";
import CreateAd from "./components/CreateAd"
import MainPage from "./components/MainPage";
import Navigationbar from "./components/Navigationbar";
import AdComponent from "./components/AdComponent";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: FunctionComponent = () => {
  return (
    <Router>
      <div>
        <Navigationbar/>
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/create-ad" exact component={CreateAd}/>
          <Route path="/:id" component={AdComponent}/>
        </Switch>
      </div>
   </Router>
  );
  
};

export default App;
