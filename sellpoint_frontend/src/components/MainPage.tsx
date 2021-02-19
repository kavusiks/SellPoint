import React, { FunctionComponent, useState, useEffect } from "react";
import SmallAd from "./SmallAd";
import { Link } from 'react-router-dom';

export const MainPage: FunctionComponent = () => {

    

    const [items, setItems] = useState<Array<any>>([]);

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
            <h1>Hovedside</h1>
            
            
            {items.map(item => 
                <h1 key={item.id}>
                    <Link to={`/${item.id}`}>
                        {item.title}
                    </Link>
                </h1>)}
            
        </div>

    );

}

export default MainPage;