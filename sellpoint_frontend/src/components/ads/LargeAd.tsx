import React, { FunctionComponent } from "react";
import { CenteredRow, LeftCenterRow, ShadowedContainer } from "../styled";
import { AdComponentProps } from "./Ads";
import { Carousel, Image } from "react-bootstrap";
import { AdImage } from "../../models/ad";
import "./ads.css";

interface AdImageProps {
  image: AdImage;
}

const AdImageComponent: FunctionComponent<AdImageProps> = ({ image }: AdImageProps) => {
  return (
    <>
      <Image className="ad-image-item d-block w-100" src={image.url} alt={image.description} />

      <Carousel.Caption className="ad-image-description">
        <h3>{image.description ?? "Bilde " + image.id}</h3>
      </Carousel.Caption>
    </>
  );
};

const AdImagePlaceholder: FunctionComponent = () => {
  return (
    <Carousel.Item>
      <Image
        className="d-block w-100"
        src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        alt="Ingen bilder"
      />
    </Carousel.Item>
  );
};

export const LargeAd: FunctionComponent<AdComponentProps> = ({
  ad,
  children,
}: AdComponentProps) => {
  const isThumbnail = (img: AdImage): boolean => {
    return !!ad.thumbnail && ad.thumbnail.url === img.url;
  };

  // At first this returned the Carousel.Item components directly,
  // but that didn't work at all for some reason.
  const makeCarouselComponents = () => {
    const images = [];

    if (!ad.images) {
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
      <LeftCenterRow noGutters>
        <h1>{ad.title}</h1>
      </LeftCenterRow>
      <LeftCenterRow noGutters>
        <p>
          <strong>Pris:</strong> {ad.price},-
          <br />
          <br />
          {ad.description}
        </p>
      </LeftCenterRow>
      {children}
    </ShadowedContainer>
  );
};

export default LargeAd;
