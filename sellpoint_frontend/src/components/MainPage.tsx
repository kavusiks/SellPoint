import React, { FunctionComponent, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";
import SmallAd from "./ads/SmallAd";

const CategoryContainer = styled(Row)`
  width: 15%;
`;

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

  useEffect(() => {
    AdAPI.getAllAds().then((ads) => setItems(ads));
  }, []);

  return (
    <>
      <Row>
        <Col md={2}>{/* Insert selection for categories here */}</Col>
        <Col md={8}>
          <AdContainer noGutters>
            {items
              .filter((item) => !item.is_sold)
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
