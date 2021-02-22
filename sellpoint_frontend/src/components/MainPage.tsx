import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";
import SmallAd from "./ads/SmallAd";

export const MainPage: FunctionComponent = () => {
  const [items, setItems] = useState<Ad[]>([]);

  useEffect(() => {
    AdAPI.getAllAds().then((ads) => setItems(ads));
  }, []);

  return (
    <div>
      {items
        .filter((item) => !item.is_sold)
        .map((item) => (
          <p key={item.id}>
            <Link to={`/ad/${item.id}`}>
              <SmallAd ad={item} />
            </Link>
          </p>
        ))}
    </div>
  );
};

export default MainPage;
