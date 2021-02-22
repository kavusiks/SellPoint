import { Ad } from "../models/ad";
import client from "./client";

class AdService {

    async createAd (ad:Ad): Promise<void>{
        await client.post("ad-create/", {
            
            title: ad.title,
            price: ad.price,
            description: ad.description,
            img : ad.image,
          });

    }
}
export default new AdService();