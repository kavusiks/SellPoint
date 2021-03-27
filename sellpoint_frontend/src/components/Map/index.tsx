import React, { FunctionComponent } from "react";
import { Position } from "../../models/geocode";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// Please do not abuse <3
const MAPS_API_KEY = "AIzaSyBFKGZqoHV5JYKkkp8-von2FEBXPpdQkbc";

export interface MarkedMapProps {
  position: Position;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "500px",
};

const MarkedMap: FunctionComponent<MarkedMapProps> = ({ position }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY,
  });

  if (loadError) {
    return <p>En error oppstod!</p>;
  }

  if (!isLoaded) {
    return <p>Laster...</p>;
  }

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={14}>
      <Marker position={position} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MarkedMap);
