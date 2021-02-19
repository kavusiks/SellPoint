import React, { FunctionComponent, useState, useEffect } from "react";
import SmallAd from "./SmallAd";
import { Link } from 'react-router-dom';
import {Ad} from '../models/ad';

export const MainPage: FunctionComponent = () => {

    

    const [items, setItems] = useState<Array<Ad>>([]);

    useEffect (() => {
        fetchItems();
    },[]);

    const fetchItems = async () => {
        const data = await fetch("http://127.0.0.1:8000/ad-list");
        const items = await data.json();
        console.log(items)
        setItems(items)
    }   

    return(
        <div>
            {items
            .filter(item => item.is_sold === false)
            .map(item => 
                <p key={item.id}>
                    <Link to={`/${item.id}`}>

                        {/* Have to send the values of "item" to SmallAd */}
                        <SmallAd 
                        title={item.title}
                        price={item.price}
                        img={item.img}
                        />

                    </Link>
                </p>)}
            
        </div>

    );

}

export default MainPage;