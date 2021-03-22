import User from "./user";

/**
 * An image belonging to a specific Ad
 */
export interface AdImage {
  /**
   * The unique ID of this image
   */
  id: number;
  /**
   * URL pointing to the image file
   */
  url: string;
  /**
   * Textual description of this image
   */
  description: string;
}

/**
 * A posted ad
 */
export interface Ad {
  /**
   * The user that posted the ad
   */
  readonly owner?: User;
  /**
   * The unique id of the ad
   */
  readonly id?: number;
  /**
   * The title of the ad
   */
  title?: string;
  /**
   * The price
   */
  price?: number;
  /**
   * Description of the ad
   */
  description?: string;
  /**
   * When the ad was created
   */
  created_at?: Date;
  /**
   * When the ad was last updated
   */
  last_modified?: Date;
  /**
   * If the item has been sold
   */
  is_sold?: boolean;
  /**
   * The image that is the thumbnail for this ad, will be
   * displayed first
   */
  thumbnail?: AdImage;
  /**
   * All images uploaded for this ad
   */
  images?: AdImage[];
}

export interface FavoriteAd {
  user: number;
  favorite_ad: number;
}