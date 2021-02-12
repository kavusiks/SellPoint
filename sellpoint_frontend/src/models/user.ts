export default interface User {
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    last_login: Date;
}