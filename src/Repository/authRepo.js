import axios from "axios";

const API_URL = "https://web-be-180924265462.us-central1.run.app/api/auth";
export const registerUser = async (userData) => {

   const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
}

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
}
