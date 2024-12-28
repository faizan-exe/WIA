import axios from "axios";

const API_URL = "http://localhost:5001/api/jobs";
export const createProduct = async (userData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}`, userData,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
    );
    return response.data;
}

export const getProducts = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,   
        }
    });
    return response.data;
}
