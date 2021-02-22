import React, { FunctionComponent } from "react";
import { CenteredRow, LeftCenterRow, ShadowedContainer } from "../styled";
import { AdComponentProps } from "./Ads";
import { Carousel, Image } from "react-bootstrap";
import { AdImage } from "../../models/ad";

interface AdImageProps {
  image: AdImage;
}

const AdImageComponent: FunctionComponent<AdImageProps> = ({ image }: AdImageProps) => {
  return (
    <Carousel.Item>
      <Image className="image" src={image.url} alt={image.description} />

      {image.description ? (
        <Carousel.Caption>
          <p>{image.description}</p>
        </Carousel.Caption>
      ) : null}
    </Carousel.Item>
  );
};

const AdImagePlaceholder: FunctionComponent = () => {
  return (
    <Carousel.Item>
      <Image
        className="image"
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

  const makeImages = () => {
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
      <CenteredRow>
        <Carousel>{makeImages()}</Carousel>
      </CenteredRow>
      <LeftCenterRow>
        <h1>{ad.title}</h1>
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
