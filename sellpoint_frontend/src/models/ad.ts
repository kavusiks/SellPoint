export interface Ad{
    //Kommer til å endre dette til å referer til ad i databasen
    title?: string;
    price?: number;
    image?: string;
    description?: string;
    created_at?: Date;
    last_modified?: Date;
    is_sold?: boolean;
    //Kommer til å endre dette til å referere til en bruker i databasen
    user?: string;

}
