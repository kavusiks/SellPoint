export default interface Address {
    street_name: string;
    street_number: number;
    zip: number;
    city: string;
}

export default interface User {
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    last_login?: Date;
    adress: Address;
}

