export interface Address {
    line1: string;
    line2?: string;
    postalcode: string;
    city: string;
    country: string;
}

export default interface User {
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    last_login?: Date;
    address: Address;
}

