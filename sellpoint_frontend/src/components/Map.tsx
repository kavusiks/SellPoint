import React, { FunctionComponent } from "react";
import { Position } from "../models/geocode";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// Please do not abuse <3
const MAPS_API_KEY = "AIzaSyBFKGZqoHV5JYKkkp8-von2FEBXPpdQkbc";

export interface MarkedMapProps {
  position: Position;
  children?: React.ReactNode;
}

const containerStyle = {
  width: "100%",
  minHeight: "400px",
  maxHeight: "100%",
};

const MarkedMap: FunctionComponent<MarkedMapProps> = ({ position, children }) => {
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
      {children}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MarkedMap);
