import React, { FunctionComponent, useState } from "react";
import { Ad } from "../models/ad";
import { AdListView } from "../components/ads/AdListView";
import { Row, Col } from "react-bootstrap";
import { CategoriesForFilterAds } from "../components/category/CategoryFilterAdsView";
import { SortingMethod, SortingSelector, SORTING_METHODS } from "../components/SearchSort";

export const MainPage: FunctionComponent = () => {
  const [items, setItems] = useState<Ad[]>([]);
  const [sortingMethod, setSortingMethod] = useState<SortingMethod>(SORTING_METHODS[0]);

  return (
    <>
      <Row>
        <Col md={2}>
          <CategoriesForFilterAds setFilteredAds={setItems} />
          <hr className="w-75 m-1 mt-3 mb-3" />
          <SortingSelector selected={sortingMethod} setSortingMethod={setSortingMethod} />
        </Col>
        <Col md={8}>
          <AdListView ads={items.sort(sortingMethod.sort)} />
        </Col>
        <Col md={2}>{/* Insert commercial picture here */}</Col>
      </Row>
    </>
  );
};

export default MainPage;
