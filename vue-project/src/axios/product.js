import axios from 'axios';
const API_URL = "http://localhost:3000/api/v1/products"

export const createProduct = async (products ) => {
    try {
        const response = await axios.post(API_URL,products);
        return response.data; 
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error; 
    }

}