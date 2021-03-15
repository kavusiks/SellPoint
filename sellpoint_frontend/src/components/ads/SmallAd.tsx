import React, { FunctionComponent } from "react";
import {
  LeftCenterRow,
  RightCenterRow,
  CenteredRow,
  ShadowedContainer,
  formatDate,
  SpaceBetweenCenterRow,
} from "../styled";
import { AdComponentProps } from "./Ads";
import { Button, Image } from "react-bootstrap";
import "./ads.css";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import AdAPI from "../../core/api/ad";

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

export const SelfSmallAd: FunctionComponent<AdComponentProps> = ({ ad, children }) => {
  const history = useHistory();

  const deleteAd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    AdAPI.deleteAd(ad).then(() => window.location.reload());
  };

  const editAd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push(`/ad/${ad.id}/edit`);
  };

  // TODO: Add modal asking to confirm deletion

  return (
    <SmallAd ad={ad}>
      <Button variant="danger" onClick={deleteAd} style={{ marginRight: "10px" }}>
        <Trash size={24} style={{ margin: "-1px -4px 1px -4px" }} />
      </Button>
      <Button variant="primary" onClick={editAd}>
        <Pencil size={24} style={{ margin: "-1px -4px 1px -4px" }} />
      </Button>
      {children}
    </SmallAd>
  );
};

export default SmallAd;
