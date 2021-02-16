import React, { FunctionComponent } from "react";

import {Ad} from '../models/ad' 
import AdAPI from '../core/api/adAPI'
import adAPI from "../core/api/adAPI";

const AdComponent: React.FC<Ad> = ({price, title, image, description}) => {
    fetch('http://127.0.0.1:8000/ad-list/')
    .then(response => response.json())
    .then(data =>  console.log(data));
    return (
      <div className="page">
          <div className="parent">
              <img alt="alternatetext" src={image} className="Adimage"/>
          </div>
          <div className="description">
              
              <h2 className="title">{title}</h2>
              <h2 className="price">{price} kr</h2>
              <p>{description}</p>
 
          </div>
      </div>
    );
    
        
      
  };
  
  export default AdComponent;