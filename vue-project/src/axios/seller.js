import axios from 'axios';
const API_URL = "http://localhost:3000/api/v1/sellers"

export const createSeller = async (seller ) => {
    try {
        console.log(seller)
        const response = await axios.post(API_URL,{ seller });
        return response.data; 
    } catch (error) {
        console.error('Error creating seller:', error);
        throw error; 
    }

}