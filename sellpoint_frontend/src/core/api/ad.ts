import { Ad } from "../../models/ad";
import client from "../client";

class AdAPI {
  async getAllAds(): Promise<Ad[]> {
    const response = await client.get(`ad/list/`);
    return response.data;
  }

  async getById(id: number): Promise<Ad> {
    const response = await client.get(`ad/${id}/`);
    return response.data;
  }

  async createAd(ad: Ad): Promise<void> {
    await client.post("ad/create/", {
      title: ad.title,
      price: ad.price,
      description: ad.description,
    });
  }
}

export default new AdAPI();
