import React, { FunctionComponent } from "react";
import { LeftCenterRow, CenteredRow, ShadowedContainer } from "../styled";
import { AdComponentProps } from "./Ads";
import { Image } from "react-bootstrap";
import "./ads.css";

const SmallAd: FunctionComponent<AdComponentProps> = ({ ad, children }: AdComponentProps) => {
  return (
    <ShadowedContainer className="ad small">
      <CenteredRow noGutters>
        <Image className="image" src={ad.thumbnail?.url} alt={ad.thumbnail?.description} />
      </CenteredRow>
      <LeftCenterRow noGutters>
        <h2>{ad.title}</h2>
      </LeftCenterRow>
      <LeftCenterRow noGutters>
        <p>{ad.price},-</p>
      </LeftCenterRow>
      {children}
    </ShadowedContainer>
  );
};

export default SmallAd;
