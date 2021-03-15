import { FavoriteAd } from './../../models/favorite';
import client from "../client";

class FavoriteAPI {
    async getAllFavorites(): Promise<FavoriteAd[]> {
        const response = await client.get(`favorite/list/`);
        return response.data;
    }
}

export default new FavoriteAPI();