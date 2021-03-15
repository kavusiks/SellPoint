import { FavoriteAd } from './../../models/favorite';
import client from "../client";
import { Ad } from "../../models/ad";
import User from "../../models/user";

class FavoriteAPI {
    async getAllFavorites(): Promise<FavoriteAd[]> {
        const response = await client.get(`favorite/list/`);
        return response.data;
    }

    async createFavorite(user: User, ad: Ad): Promise<FavoriteAd> {
        const response = await client.post("favorite/create/", {
            user: user,
            ad: ad,
          });
    return response.data;
    }
}

export default new FavoriteAPI();