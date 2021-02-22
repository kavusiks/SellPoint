import React from "react";
import { Ad } from "../../models/ad";

export interface AdComponentProps {
  ad: Ad;
  children?: React.ReactNode;
}
