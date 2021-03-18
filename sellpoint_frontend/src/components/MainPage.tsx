import React, { FunctionComponent, useState, useEffect } from "react";
import { Row, Col, DropdownButton, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";
import SmallAd from "./ads/SmallAd";
import { makeCategoriesDropdownComponent } from "./forms/FormParts";

const AdContainer = styled(Row)`
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const AdLink = styled(Link)`
  flex: 0 47%;
  margin: 10px;
  width: 100%;
  height: 300px;
`;

export const MainPage: FunctionComponent = () => {
  const [items, setItems] = useState<Ad[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);

  useEffect(() => {
    AdAPI.getAllAds().then((ads) => setItems(ads));
    AdAPI.getAllCategories().then((category) =>
      category.forEach((category) => setCategories((state) => [...state, category.name])),
    );
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
          <AdContainer noGutters>
            {items
              .filter((item) =>
                chosenCategories.length
                  ? !item.is_sold &&
                    (item.category ? chosenCategories.includes(item.category) : false)
                  : !item.is_sold,
              )
              .reverse()
              .map((item) => (
                <AdLink key={item.id} to={`/ad/${item.id}`}>
                  <SmallAd ad={item} />
                </AdLink>
              ))}
          </AdContainer>
        </Col>
        <Col md={2}>{/* Insert commercial picture here */}</Col>
      </Row>
    </>
  );
};

export default MainPage;
