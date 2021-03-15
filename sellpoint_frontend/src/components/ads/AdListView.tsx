import React, { FunctionComponent } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Ad } from "../../models/ad";
import SmallAd, { SelfSmallAd } from "../../components/ads/SmallAd";

const AdContainer = styled(Row)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export interface AdListViewProps {
  ads: Ad[];
  perRow?: number;
  children?: React.ReactNode;
  self?: boolean;
}

const AdLink = styled(Link)`
  width: 100%;
  height: auto;
  padding: 10px;
`;

export const AdListView: FunctionComponent<AdListViewProps> = ({
  ads,
  perRow = 3,
  children,
  self,
}) => {
  // Calculates the minimum width we can set that will not allow another item on this row,
  // e. g. if we want 3 items per row, each item needs to take up at least 26% of the width
  // since 4 * 26% = 104%, forcing a wrap.
  const width = Math.min(100, Math.floor(100 / perRow) - 1);

  return (
    <AdContainer noGutters>
      {children}
      {ads
        .filter((item) => !item.is_sold)
        .map((item) => (
          <AdLink key={item.id} to={`/ad/${item.id}`} style={{ flex: `0 ${width}%` }}>
            {self ? <SelfSmallAd ad={item} /> : <SmallAd ad={item} />}
          </AdLink>
        ))}
    </AdContainer>
  );
};
