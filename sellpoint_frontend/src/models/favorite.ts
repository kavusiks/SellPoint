import User from "./user";
import { Ad } from "./ad";


export interface FavoriteAd {
    owner: User;
    ad: Ad;
}