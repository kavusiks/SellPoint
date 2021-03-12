import { Ad, AdImage, Category } from "../../models/ad";
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

  async createAd(ad: Ad): Promise<Ad> {
    const response = await client.post("ad/create/", {
      title: ad.title,
      price: ad.price,
      description: ad.description,
      category: ad.category,
    });
    return response.data;
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

  async getAllCategories(): Promise<Category[]> {
    const response = await client.get(`ad/categorylist/`);
    return response.data;
  }
}

export default new AdAPI();
