import React, { FunctionComponent, useState, useEffect } from "react";
import AdAPI from "../core/api/ad";
import { Ad, Category } from "../models/ad";
import { AdListView } from "../components/ads/AdListView";
import { Row, Col, DropdownButton, Button, ButtonGroup } from "react-bootstrap";
import { CategoriesForFilterAds } from "../components/category/CategoryFilterForAds";

export const MainPage: FunctionComponent = () => {
  const [items, setItems] = useState<Ad[]>([]);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);

  useEffect(() => {
    AdAPI.getAllAds().then((ads) => setItems(ads));
  }, []);
  /*
  const handleSelect = (e: string | null) => {
    if (e == null) {
      throw new Error("e is null");
    }
    !chosenCategories.includes(e) ? setChosenCategories((state) => [...state, e]) : void 0;
  };

  const makeChosenCategoriesButtons = () => {
    const categorylistBtns: JSX.Element[] = [];
    console.log(chosenCategories);
    chosenCategories.forEach((category) => {
      categorylistBtns.push(
        <Button variant="success" onClick={handleRemoveCategory} key={category} id={category}>
          {category + " x"}
        </Button>,
      );
    });

    return categorylistBtns;
  };

  const handleRemoveCategory = (e: React.MouseEvent<HTMLElement, MouseEvent> | null) => {
    if (e == null) {
      throw new Error("e is null");
    }
    const tempId = e.currentTarget.id;
    setChosenCategories((state) => state.filter((category) => category !== tempId));
  };
*/
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
