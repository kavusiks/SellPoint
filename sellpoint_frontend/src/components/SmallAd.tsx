import React, { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import './SmallAd.css';
import {Ad} from '../models/ad'

const SmallAd: React.FC<Ad> = (props) => {

    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>();

    const [img, setImg] = useState<string>("https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg");

    useEffect (() => {
        fetchItems();
    },[]);

    const fetchItems = async () => {
        if (props.img != null){
            setImg("http://127.0.0.1:8000" + props.img);
        }
    }
        
    return(
    <div className="container">
        <img className="image" src={img} alt=""></img>
        <div className="title">{props.title}</div>
        <div className="price">{props.price} kr</div>
    </div>
    );
};




export default SmallAd;
