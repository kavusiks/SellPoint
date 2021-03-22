import React, { FunctionComponent, useState, useEffect } from "react";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";
import { AdListView } from "../components/ads/AdListView";
import { Row, Col, DropdownButton, Button, ButtonGroup } from "react-bootstrap";
import { makeCategoriesDropdownComponent } from "../components/forms/FormParts";

export const MainPage: FunctionComponent = () => {
  const [items, setItems] = useState<Ad[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);

  useEffect(() => {
    AdAPI.getAllAds().then((ads) => setItems(ads));
    AdAPI.getAllCategories().then((category) => setCategories(category.map((cat) => cat.name)));
  }, []);

  const handleSelect = (e: string | null) => {
    if (e == null) {
      throw new Error("e is null");
    }
    !chosenCategories.includes(e) ? setChosenCategories((state) => [...state, e]) : void 0;
    setCategories((state) => state.filter((cat) => cat !== e));
  };

  const makeChosenCategoriesButtons = () => {
    return chosenCategories
      .sort((a, b) => (a > b ? 1 : -1))
      .map((category) => {
        return (
          <Button variant="success" onClick={handleRemoveCategory} key={category} id={category}>
            {category + " x"}
          </Button>
        );
      });
  };

  const handleRemoveCategory = (e: React.MouseEvent<HTMLElement, MouseEvent> | null) => {
    if (e == null) {
      throw new Error("e is null");
    }
    const tempId = e.currentTarget.id;
    setChosenCategories((state) => state.filter((category) => category !== tempId));
    setCategories((state) => [...state, tempId]);
  };

  return (
    <>
      <Row>
        <Col md={2}>
          <br />
          <DropdownButton
            title="Velg kategorier"
            variant="outline-success"
            id="dropdown-basic"
            onSelect={handleSelect}
          >
            {makeCategoriesDropdownComponent(categories)}
          </DropdownButton>
          <br />
          <ButtonGroup vertical>{makeChosenCategoriesButtons()}</ButtonGroup>
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
