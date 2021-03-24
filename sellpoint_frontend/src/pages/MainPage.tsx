import React, { FunctionComponent, useState, useEffect } from "react";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";
import { AdListView } from "../components/ads/AdListView";
import { Row, Col } from "react-bootstrap";
import { CategoriesForFilterAds } from "../components/category/CategoryFilterAdsView";

export const MainPage: FunctionComponent = () => {
  const [items, setItems] = useState<Ad[]>([]);

  useEffect(() => {
    AdAPI.getAllAds().then((ads) => setItems(ads));
  }, []);
  return (
    <>
      <Row>
        <Col md={2}>
          <CategoriesForFilterAds filteredAds={items} setFilteredAds={setItems} />
        </Col>
        <Col md={8}>
          <AdListView ads={items} />
        </Col>
        <Col md={2}>{/* Insert commercial picture here */}</Col>
      </Row>
    </>
  );
};

export default MainPage;
