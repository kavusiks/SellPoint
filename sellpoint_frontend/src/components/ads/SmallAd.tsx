import React, { FunctionComponent } from "react";
import { LeftCenterRow, CenteredRow, ShadowedContainer } from "../styled";
import { AdComponentProps } from "./Ads";
import { Image } from "react-bootstrap";

const SmallAd: FunctionComponent<AdComponentProps> = ({ ad, children }: AdComponentProps) => {
  return (
    <ShadowedContainer className="ad small">
      <CenteredRow>
        <Image src={ad.thumbnail?.url} alt={ad.thumbnail?.description} />
      </CenteredRow>
      <LeftCenterRow>
        <h2>{ad.title}</h2>
        <p>{ad.price},-</p>
      </LeftCenterRow>
      {children}
    </ShadowedContainer>
  );
};

export default SmallAd;
