import { Ad } from "../../models/ad";
import client from "../client";

class AdAPI {

    async getAllAds(): Promise<Ad> {
        const response = await client.get('/ad');
        return response.data;
    }

    async getById(id: number): Promise<Ad> {
        const response = await client.get('/ad/${id}');
        return response.data;
    }

}
export default new AdAPI();