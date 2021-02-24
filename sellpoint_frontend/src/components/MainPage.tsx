import React, { FunctionComponent, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AdAPI from "../core/api/ad";
import { Ad } from "../models/ad";
import SmallAd from "./ads/SmallAd";
import { CenteredRow } from "./styled";

const AdContainer = styled(Row)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const AdLink = styled(Link)`
  flex: 0 30%;
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
    <AdContainer noGutters>
      {items
        .filter((item) => !item.is_sold)
        .map((item) => (
          <AdLink key={item.id} to={`/ad/${item.id}`}>
            <SmallAd ad={item} />
          </AdLink>
        ))}
    </AdContainer>
  );
};

export default MainPage;
