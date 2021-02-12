import React, { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import "./App.css";


const App: FunctionComponent = () => {
  return (
    <div className ="form-group"> 
        <button className="btn btn-success btn-lg float-right" type="submit"> 
           Logg Inn 
      </button> 
    </div>

  );
};


export default App;
