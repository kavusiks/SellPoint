import React, { FunctionComponent } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Ad } from "../../models/ad";
import { OtherSmallAd, SelfSmallAd } from "../../components/ads/SmallAd";

const AdContainer = styled(Row)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const AdLink = styled(Link)`
  width: 100%;
  height: auto;
  padding: 10px;
`;

const AdDiv = styled("div")`
  width: 100%;
  height: auto;
  padding: 10px;
`;

/**
 * Props for the AdListView
 */
export interface AdListViewProps {
  /**
   * The ads to display in the list view
   */
  ads: Ad[];
  /**
   * How many ads should be displayed per row
   */
  perRow?: number;
  /**
   * Children nodes
   */
  children?: React.ReactNode;
  /**
   * If this view should use the SelfSmallAd component instead of
   * the SmallAd component
   */
  self?: boolean;
}

/**
 * Displays a list of Ads
 *
 * @param props - The props
 */
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
      {ads.reverse().map((item) => {
        if (self) {
          return (
            <AdDiv key={item.id} style={{ flex: `0 ${width}%` }}>
              <SelfSmallAd ad={item} />
            </AdDiv>
          );
        }

        return (
          <AdLink key={item.id} to={`/ad/${item.id}`} style={{ flex: `0 ${width}%` }}>
            <OtherSmallAd ad={item} />
          </AdLink>
        );
      })}
    </AdContainer>
  );
};
