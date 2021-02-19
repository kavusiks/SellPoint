import React from "react";
import { FunctionComponent } from "react";
import './SmallAd.css';

const SmallAd: React.FC = () => {

    return(
    <div className="container bootstrap snipets">
        <div className="col-xs-6 col-md-4">
        <div className="product tumbnail thumbnail-3"><a href="#"><img src={"https://via.placeholder.com/350x280/FFB6C1/000000"} alt=""></img></a>
            <div className="caption">
                <h6><a href="#">Short Sleeve T-Shirt</a></h6><span className="price">
                </span><span className="price">$12.49</span>
            </div>
        </div>
        </div>
    </div>
    );
};




export default SmallAd;
