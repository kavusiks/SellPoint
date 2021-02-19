import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import {Ad} from '../models/ad' 
import AdAPI from '../core/api/adAPI'
import adAPI from "../core/api/adAPI";



export const AdComponent: React.FC = ({match}:any) => {

    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        fetchItem()
    }, []);

    const fetchItem = async () => {
        const fetchItem = await fetch(`http://127.0.0.1:8000/ad-detail/${match.params.id}`);
        const item = await fetchItem.json();
        console.log(item);
        setTitle(item.title);
        setPrice(item.price);
        setDescription(item.description);
    }

    return (
      <div className="page">
          <div className="parent">
              <img alt="alternatetext" src={"https://via.placeholder.com/350x280/FFB6C1/000000"} className="Adimage"/>
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