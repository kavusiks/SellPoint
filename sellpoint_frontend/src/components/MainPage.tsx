import React, { FunctionComponent, useState, useEffect } from "react";
import { Row, Col, DropdownButton, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";
import SmallAd from "./ads/SmallAd";

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
    AdAPI.getAllCategories().then((categor) =>
      categor.forEach((category) => setCategories((state) => [...state, category.name])),
    );
  }, []);

  const makeCategoriesComponents = () => {
    const categorylist: JSX.Element[] = [];

    categories.sort().forEach((category) => {
      categorylist.push(
        <Dropdown.Item key={category} eventKey={category}>
          {category}
        </Dropdown.Item>,
      );
    });

    return categorylist;
  };

  const handleSelect = (e: any) => {
    if (typeof e === "string") {
      setChosenCategories((state) => [...state, e]);
      setCategories((state) => state.filter((category) => category !== e));
    }
  };

  const makeChosenCategoriesButtons = () => {
    const categorylist: JSX.Element[] = [];

    chosenCategories.forEach((category) => {
      categorylist.push(
        <Button variant="success" onClick={handleRemoveCategory} key={category} id={category}>
          {category} x
        </Button>,
      );
    });

    return categorylist;
  };

  const handleRemoveCategory = (e: any) => {
    if (typeof e.target.id === "string") {
      setCategories((state) => [...state, e.target.id]);
      setChosenCategories((state) => state.filter((category) => category !== e.target.id));
    }
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
            {makeCategoriesComponents()}
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
