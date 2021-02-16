import { Ad } from "../../models/ad";
import client from "../client";

class AdAPI {

    async getAllAds(): Promise<Ad> {
        const response = await client.get('/ad-list/');
        return response.data;
    }

    async getById(id: number): Promise<Ad> {
        const response = await client.get('/ad-detail/${id}');
        return response.data;
    }

}
export default AdAPI;