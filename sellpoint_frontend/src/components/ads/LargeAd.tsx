import React, { FunctionComponent, useEffect, useState } from "react";
import { CenteredRow, LeftCenterRow, ShadowedContainer } from "../styled";
import { AdComponentProps } from "./Ads";
import { Button, Carousel, Image } from "react-bootstrap";
import { AdImage, FavoriteAd, Ad } from "../../models/ad";
import "./ads.css";
import { useSessionContext } from "../../context/Session";
import AdAPI from "../../core/api/ad";

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

export const LargeAd: FunctionComponent<AdComponentProps> = ({
  ad,
  children,
}: AdComponentProps) => {
  const session = useSessionContext();

  const [isFavorite, setIsFavorite] = useState<boolean>();

  useEffect(() => {
    if (session.user?.id) {
      AdAPI.getAllFavoritesByUserId(session.user.id).then((favorites) =>
        favorites.filter((a) => a.favorite_ad == ad.id).length
          ? setIsFavorite(true)
          : setIsFavorite(false),
      );
    }
  }, []);

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

  const handleAddFavoriteAd = () => {
    if (session.user?.id && ad.id) {
      const userAccount: number = session.user.id;
      const favoriteAd: number = ad.id;

      const tempFavoriteAd: FavoriteAd = {
        user: userAccount,
        favorite_ad: favoriteAd,
      };

      AdAPI.createFavorite(tempFavoriteAd);
      setIsFavorite(true);
    }
  };

  const handleRemoveFavoriteAd = () => {
    setIsFavorite(false);
  };

  // Shows the favoritebutton if a user is logged in and the owner of the ad
  // is not the user
  const makeFavoriteButton = () => {
    return session.user && ad.owner ? (
      session.isAuthenticated && ad.owner.email !== session.user.email ? (
        isFavorite ? (
          <>
            <Button onClick={handleRemoveFavoriteAd}>Fjern lagret annonse</Button>
            <br />
          </>
        ) : (
          <>
            <Button onClick={handleAddFavoriteAd}>Lagre annonsen</Button>
            <br />
          </>
        )
      ) : null
    ) : null;
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
        <div className="ad title">
          <h1>{ad.title}</h1>
        </div>
      </LeftCenterRow>
      <LeftCenterRow noGutters>
        <div className="ad info">
          <p>
            {makeFavoriteButton()}
            <strong>Pris:</strong> {ad.price},-
            <br />
            <strong>Selger: </strong> {ad.owner?.first_name} {ad.owner?.last_name}
            <br />
            <strong>Telefonnummer: </strong> {ad.owner?.phone_number}
            <br />
            <strong>E-mail: </strong> {ad.owner?.email}
            <br />
            <br />
            {ad.description}
          </p>
        </div>
      </LeftCenterRow>
      {children}
    </ShadowedContainer>
  );
};

export default LargeAd;
