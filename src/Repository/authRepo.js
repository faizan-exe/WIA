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

export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:5001/api/auth/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data.user;
}
