import React, { FunctionComponent } from "react";
import {
  LeftCenterRow,
  RightCenterRow,
  CenteredRow,
  ShadowedContainer,
  formatDate,
  SpaceBetweenCenterRow,
} from "../styled";
import { AdComponentProps, AdModifyDialog } from "./Ads";
import { Button, Image } from "react-bootstrap";
import "./ads.css";
import { ChevronExpand } from "react-bootstrap-icons";

/**
 * A small ad view, suitable for displaying multiple ads in the same place
 *
 * @param props - The props
 */
const SmallAd: FunctionComponent<AdComponentProps> = ({ ad, children }: AdComponentProps) => {
  return (
    <ShadowedContainer className="ad small">
      <CenteredRow noGutters>
        <Image className="image" src={ad.thumbnail?.url} alt={ad.thumbnail?.description} />
      </CenteredRow>
      {children ? (
        <SpaceBetweenCenterRow noGutters>
          <h2>{ad.title}</h2>
          <RightCenterRow noGutters>{children}</RightCenterRow>
        </SpaceBetweenCenterRow>
      ) : (
        <LeftCenterRow noGutters>
          <h2>{ad.title}</h2>
        </LeftCenterRow>
      )}
      <LeftCenterRow noGutters>
        <p>{ad.price},-</p>
      </LeftCenterRow>
      <RightCenterRow noGutters>
        <p style={{ marginBottom: "5px" }}>{formatDate(ad.created_at)}</p>
      </RightCenterRow>
    </ShadowedContainer>
  );
};

/**
 * A small ad view for showing ads that are owned by the currently authenticated
 * user
 *
 * @param props - The props
 */
export const SelfSmallAd: FunctionComponent<AdComponentProps> = ({ ad, children }) => {
  const onDeleted = () => {
    window.location.reload();
  };

  return (
    <>
      <SmallAd ad={ad}>
        <Button variant="info" href={`/ad/${ad.id}`} style={{ marginRight: "10px" }}>
          <ChevronExpand size={24} style={{ margin: "-1px -4px 1px -4px" }} />
        </Button>

        <AdModifyDialog ad={ad} onDeleted={onDeleted} />

        {children}
      </SmallAd>
    </>
  );
};

export default SmallAd;
