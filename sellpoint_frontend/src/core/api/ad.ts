import { Ad, AdImage } from "../../models/ad";
import client from "../client";

class AdAPI {
  async getAllAds(): Promise<Ad[]> {
    const response = await client.get(`ad/list/`);
    return response.data;
  }

  async getOwnAds(): Promise<Ad[]> {
    const response = await client.get(`ad/list/self/`);
    return response.data;
  }

  async getById(id: number): Promise<Ad> {
    const response = await client.get(`ad/${id}/`);
    return response.data;
  }

  async createAd(ad: Ad): Promise<Ad> {
    const response = await client.post("ad/create/", {
      title: ad.title,
      price: ad.price,
      description: ad.description,
    });
    return response.data;
  }

  async updateAd(ad: Ad): Promise<Ad> {
    const response = await client.put(`ad/${ad.id}/`, {
      title: ad.title,
      price: ad.price,
      description: ad.description,
    });
    return response.data;
  }

  async deleteAd(ad: Ad): Promise<void> {
    await client.delete(`ad/${ad.id}/`);
  }

  async addImage(id: number, image: File, description?: string): Promise<AdImage> {
    const formData = new FormData();
    formData.append("image", image);

    if (description) {
      formData.append("description", description);
    }

    const response = await client.post(`ad/create/image/${id}/`, formData);
    return response.data;
  }
}

export default new AdAPI();
