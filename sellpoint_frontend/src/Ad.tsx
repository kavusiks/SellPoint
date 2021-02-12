import React, { FunctionComponent } from "react";
import "./Ad.css";

interface Props{
    //Kommer til å endre dette til å referer til ad i databasen
    price?: number,
    image?: string,
    description?: string,
    title?: string,

    //Kommer til å endre dette til å referere til en bruker i databasen
    user?: string

}



const Ad: React.FC<Props> = ({price, title, image, description}) => {
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
  
  export default Ad;