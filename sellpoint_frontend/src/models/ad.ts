import User from "./user";

export interface AdImage {
  id: number;
  url: string;
  description: string;
}

export interface Ad {
  owner?: User;
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  created_at?: Date;
  last_modified?: Date;
  is_sold?: boolean;
  thumbnail?: AdImage;
  images?: AdImage[];
  category?: string;
}

export interface Category {
  name: string;
}
