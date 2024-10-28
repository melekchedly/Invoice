import axios from 'axios';
const API_URL = "http://localhost:3000/api/v1/clients"

export const createClient = async (client ) => {
    try {
        const response = await axios.post(API_URL,client);
        return response.data; 
    } catch (error) {
        console.error('Error creating client:', error);
        throw error; 
    }

}