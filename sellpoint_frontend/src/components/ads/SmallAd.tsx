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
import { Badge, Button, Image } from "react-bootstrap";
import "./ads.css";
import { ChevronExpand } from "react-bootstrap-icons";

/**
 * A small ad view, suitable for displaying multiple ads in the same place
 *
 * @param props - The props
 */
const SmallAd: FunctionComponent<AdComponentProps> = ({ ad, children }: AdComponentProps) => {
  const getTitle = () => {
    if (ad.title.length <= 20) {
      return ad.title;
    }

    return ad.title?.substring(0, 17).concat("...");
  };

  return (
    <ShadowedContainer className="ad small">
      <CenteredRow noGutters>
        <Image className="image" src={ad.thumbnail?.url} alt={ad.thumbnail?.description} />
      </CenteredRow>
      {children ? (
        <SpaceBetweenCenterRow noGutters>
          <h2>
            {getTitle()} {ad.is_sold ? <Badge variant="success">Solgt!</Badge> : null}
          </h2>
          <RightCenterRow noGutters>{children}</RightCenterRow>
        </SpaceBetweenCenterRow>
      ) : (
        <LeftCenterRow noGutters>
          <h2>
            {getTitle()} {ad.is_sold ? <Badge variant="success">Solgt!</Badge> : null}
          </h2>
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

export const OtherSmallAd: FunctionComponent<AdComponentProps> = ({ ad, children }) => {
  const dist = ad.distance ?? -1;
  return (
    <SmallAd ad={ad}>
      <p>{dist <= 0 ? null : dist <= 1 ? "< 1 km" : `~${ad.distance}km`}</p>
    </SmallAd>
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
    <SmallAd ad={ad}>
      <Button variant="info" href={`/ad/${ad.id}`} style={{ marginRight: "10px" }}>
        <ChevronExpand size={24} style={{ margin: "-1px -4px 1px -4px" }} />
      </Button>

      <AdModifyDialog ad={ad} onDeleted={onDeleted} />

      {children}
    </SmallAd>
  );
};

export default SmallAd;
