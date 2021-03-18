import React, { FunctionComponent } from "react";
import {
  CenteredRow,
  LeftCenterRow,
  RightCenterRow,
  ShadowedContainer,
  SpaceBetweenCenterRow,
} from "../styled";
import { AdComponentProps, AdModifyDialog } from "./Ads";
import { Carousel, Image, Badge } from "react-bootstrap";
import { AdImage } from "../../models/ad";
import "./ads.css";
import { useSessionContext } from "../../context/Session";
import { useHistory } from "react-router";

interface AdImageProps {
  image: AdImage;
}

const AdImageComponent: FunctionComponent<AdImageProps> = ({ image }: AdImageProps) => {
  return (
    <>
      <Image className="ad-image-item d-block" src={image.url} alt={image.description} />

      <Carousel.Caption className="ad-image-description">
        <h3>{image.description}</h3>
      </Carousel.Caption>
    </>
  );
};

const AdImagePlaceholder: FunctionComponent = () => {
  return (
    <Image
      className="d-block w-100"
      src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
      alt="Ingen bilder"
    />
  );
};

/**
 * A full page ad view
 *
 * @param props - The props
 */
export const LargeAd: FunctionComponent<AdComponentProps> = ({
  ad,
  children,
}: AdComponentProps) => {
  const session = useSessionContext();
  const history = useHistory();

  const isThumbnail = (img: AdImage): boolean => {
    return !!ad.thumbnail && ad.thumbnail.url === img.url;
  };

  // At first this returned the Carousel.Item components directly,
  // but that didn't work at all for some reason.
  const makeCarouselComponents = () => {
    const images = [];

    if (!ad.images || ad.images?.length === 0) {
      images.push(<AdImagePlaceholder />);
      return images;
    }

    if (ad.thumbnail) {
      images.push(<AdImageComponent image={ad.thumbnail} />);
    }

    ad.images.forEach((image) => {
      if (isThumbnail(image)) {
        return;
      }

      images.push(<AdImageComponent image={image} />);
    });

    return images;
  };

  return (
    <ShadowedContainer className="ad large">
      <CenteredRow noGutters>
        <Carousel interval={null} slide={false}>
          {makeCarouselComponents().map((component, idx) => {
            return <Carousel.Item key={idx}>{component}</Carousel.Item>;
          })}
        </Carousel>
      </CenteredRow>
      {
        // Check if this is our own ad, if so we should display edit buttons etc.
        session.user && ad.owner?.email === session.user.email ? (
          <SpaceBetweenCenterRow noGutters>
            <h2>
              {ad.title} {ad.is_sold ? <Badge variant="success">Solgt!</Badge> : null}
            </h2>
            <RightCenterRow noGutters>
              <AdModifyDialog ad={ad} onDeleted={() => history.push("/")} />
            </RightCenterRow>
            <hr style={{ width: "100%", margin: "0px 0px 10px 0px" }} />
          </SpaceBetweenCenterRow>
        ) : (
          <LeftCenterRow noGutters>
            <div className="ad title">
              <h1>
                {ad.title} {ad.is_sold ? <Badge variant="success">Solgt!</Badge> : null}
              </h1>
            </div>
            <hr style={{ width: "100%", margin: "0px 0px 10px 0px" }} />
          </LeftCenterRow>
        )
      }

      <LeftCenterRow noGutters>
        <div className="ad info">
          <p>
            <strong>Pris:</strong> {ad.price},-
            <br />
            <strong>Selger: </strong> {ad.owner?.first_name} {ad.owner?.last_name}
            <br />
            <strong>Telefonnummer: </strong> {ad.owner?.phone_number}
            <br />
            <strong>E-mail: </strong> <a href={"mailto:" + ad.owner?.email}>{ad.owner?.email}</a>
            <br />
          </p>
        </div>
        <hr style={{ width: "100%", margin: "10px 0px 10px 0px" }} />
        <div className="ad desc">
          <p>{ad.description}</p>
        </div>
      </LeftCenterRow>
      {children}
    </ShadowedContainer>
  );
};

export default LargeAd;
