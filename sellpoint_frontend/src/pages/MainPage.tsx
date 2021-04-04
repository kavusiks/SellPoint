import React, { FunctionComponent, useEffect, useState } from "react";
import { Ad } from "../models/ad";
import { AdListView } from "../components/ads/AdListView";
import { Row, Col } from "react-bootstrap";
import { CategoriesForFilterAds } from "../components/category/CategoryFilterAdsView";
import { SortingMethod, SortingSelector, SORTING_METHODS } from "../components/SearchSort";
import { useSessionContext } from "../context/Session";

export const MainPage: FunctionComponent = () => {
  const session = useSessionContext();
  const [items, setItems] = useState<Ad[]>([]);
  const [sortingMethod, setSortingMethod] = useState<SortingMethod>(SORTING_METHODS[0]);

  useEffect(() => {
    if (session.isAuthenticated || !sortingMethod.requireAuthenticated) {
      return;
    }

    // We know this does not require authentication
    setSortingMethod(SORTING_METHODS[2]);
  }, [session, sortingMethod.requireAuthenticated]);

  return (
    <>
      <Row>
        <Col md={2}>
          <CategoriesForFilterAds setFilteredAds={setItems} />
          <hr className="w-75 m-1 mt-3 mb-3" />
          <SortingSelector
            selected={sortingMethod}
            setSortingMethod={setSortingMethod}
            authenticated={session.isAuthenticated}
          />
          {session.isAuthenticated ? null : (
            <p className="w-75 text-center">
              Logg inn for å <br />
              sortere på avstand!
            </p>
          )}
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
