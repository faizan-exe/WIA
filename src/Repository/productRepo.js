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

export const getAllProducts = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/all`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data;
}

export const deleteProduct = async (id) => {
    console.log('Deleting product:', id);
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

export const editProduct = async (product) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`${API_URL}/${product._id}`, product,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;

    }
    catch (error) {
        console.error('Error editing product:', error);
        throw error;
    }
}

