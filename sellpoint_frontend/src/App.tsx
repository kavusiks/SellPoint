import React, { FunctionComponent } from "react";
import "./App.css";
import AdComponent from "./components/ad";

const App: FunctionComponent = () => {
  return (
    <div>
      <AdComponent title="hei" price={2}/>
   </div>
  );
  
};

export default App;
