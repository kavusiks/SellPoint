import React from "react";
import { Ad } from "../../models/ad";
import "./ads.css";

export interface AdComponentProps {
  ad: Ad;
  children?: React.ReactNode;
}
