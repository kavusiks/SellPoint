import { Ad, AdImage, FavoriteAd } from "../../models/ad";
import client from "../client";

/**
 * API abstraction of endpoints that interact with ads
 */
class AdAPI {
  /**
   * @returns All existing ads
   */
  async getAllAds(): Promise<Ad[]> {
    const response = await client.get(`ad/list/`);
    return response.data;
  }

  /**
   * @returns All ads belonging to the currently authenticated user
   */
  async getOwnAds(): Promise<Ad[]> {
    const response = await client.get(`ad/list/self/`);
    return response.data;
  }

  /**
   * Fetches all information about the ad with the given id
   *
   * @param id - The ID
   * @returns Extensive information about the ad
   */
  async getById(id: number): Promise<Ad> {
    const response = await client.get(`ad/${id}/`);
    return response.data;
  }

  /**
   * Posts the given ad
   *
   * @param ad - The ad
   * @returns The newly posted ad
   */
  async createAd(ad: Ad): Promise<Ad> {
    const response = await client.post("ad/create/", {
      title: ad.title,
      price: ad.price,
      description: ad.description,
      is_sold: ad.is_sold,
    });
    return response.data;
  }

  /**
   * Updates an existing ad with new information
   *
   * @param ad - The ad to update, containing the new information
   * @returns The updated ad
   */
  async updateAd(ad: Ad): Promise<Ad> {
    const response = await client.put(`ad/${ad.id}/`, {
      title: ad.title,
      price: ad.price,
      description: ad.description,
      is_sold: ad.is_sold,
    });
    return response.data;
  }

  /**
   * Deletes the given ad
   *
   * @param ad - The ad to delete
   */
  async deleteAd(ad: Ad): Promise<void> {
    await client.delete(`ad/${ad.id}/`);
  }

  /**
   * Ads an image to the ad with the given ID
   *
   * @param id - The ID of the ad to attach this image to
   * @param image - The image
   * @param description - Description of the image
   * @returns The uploaded image information
   */
  async addImage(id: number, image: File, description?: string): Promise<AdImage> {
    const formData = new FormData();
    formData.append("image", image);

    if (description) {
      formData.append("description", description);
    }

    const response = await client.post(`ad/create/image/${id}/`, formData);
    return response.data;
  }

  async getAllFavorites(): Promise<FavoriteAd[]> {
    const response = await client.get(`favorite/list/`);
    return response.data;
  }

  async getAllFavoritesByUserId(id: number): Promise<FavoriteAd[]> {
    const response = await client.get(`ad/favorite/user/${id}/`);
    return response.data;
  }

  async createFavorite(favorite_ad: FavoriteAd): Promise<FavoriteAd> {
    const response = await client.post("ad/favorite/create/", {
      user: favorite_ad.user,
      favorite_ad: favorite_ad.favorite_ad,
    });
    return response.data;
  }
  async updateImage(id: number, description?: string): Promise<AdImage> {
    const formData = new FormData();

    if (description) {
      formData.append("description", description);
    }

    const response = await client.put(`ad/image/${id}/`, formData);
    return response.data;
  }

  /**
   * Deletes the given image
   *
   * @param image - The image
   */
  async deleteImage(image: AdImage): Promise<void> {
    await client.delete(`ad/image/${image.id}`);
  }
}

export default new AdAPI();
