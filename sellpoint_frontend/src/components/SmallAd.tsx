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
    <div className="container bootstrap snipets">
        <div className="col-xs-6 col-md-4">
        <div className="product tumbnail thumbnail-3"><a href="#"><img src={img} alt=""></img></a>
            <div className="caption">
                <h6><a href="#">{props.title}</a></h6><span className="price">
                </span><span className="price">{props.price} kr</span>
            </div>
        </div>
        </div>
    </div>
    );
};




export default SmallAd;
