import axios from "axios";

export const API_URL = "http://localhost:8000/";

const client = axios.create({baseURL: API_URL})
export default client;
