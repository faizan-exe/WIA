import axios from "axios";

const API_URL = "https://web-be-180924265462.us-central1.run.app/api/jobs";
export const createProduct = async (userData) => {

   const response = await axios.post(`${API_URL}`, userData);
    return response.data;
}

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
}
