import React, { FunctionComponent, useState, useEffect } from "react";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";
import { AdListView } from "../components/ads/AdListView";

export const MainPage: FunctionComponent = () => {
  const [items, setItems] = useState<Ad[]>([]);

  useEffect(() => {
    AdAPI.getAllAds().then((ads) => {
      console.log(ads);
      setItems(ads);
    });
  }, []);

  return <AdListView ads={items} />;
};

export default MainPage;
