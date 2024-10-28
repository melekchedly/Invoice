import axios from 'axios';
import { createClient } from './cilent';
import { createProduct } from './product';
import { createSeller } from './seller';
const API_URL = "http://localhost:3000/api/v1"
export const getInvoices = async (clientFullName = null, companyName = null,order=-1,page = 1, limit = 4) => {
    
    try {
        const response = await axios.get(API_URL+'/invoices', {
            params: {
                page,
                limit,
                clientFullName,
                companyName,
               order
            },
        });
        console.log(response.data)
        return response.data; 
    } catch (error) {
        console.error('Error fetching invoices:', error);
        throw error; 
    }

}
export const getById = async (id) => {
    try {
        const response = await axios.get(API_URL+"/invoices/"+id);
       
        return response.data; 
    } catch (error) {
        console.error('Error fetching invoice:', error);
        throw error; 
    }
}
    export const createInvoice = async () => {

        const clientId= await createClient(JSON.parse(localStorage.getItem('client')))
        const sellerId=await createSeller(JSON.parse(localStorage.getItem('seller')))
        const productIds=await createProduct(JSON.parse(localStorage.getItem('products')))

        try {
            const response = await axios.post(API_URL+"/invoices",{clientId, sellerId,productIds });
            localStorage.clear();
            return response.data.invoice; 
        } catch (error) {
            console.error('Error creating invoice:', error);
            throw error; 
        }

}

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(API_URL+"/invoices/"+id);
        return response.data; 
    } catch (error) {
        console.error('Error deleting invoice:', error);
        throw error; 
    }
}

export const exportCsv = async () => {
    try {
        const response = await axios.get(API_URL+"/invoices/export");
       
        return response; 
    } catch (error) {
        console.error('Error fetching invoice:', error);
        throw error; 
    }
}

export const uploadCsv =async(file)=>{

    try{
      const response = await axios.post(API_URL+'/invoices/upload',file )
      return response
    }catch(e){
        console.error('Error uploading invoice:', error);
        throw error; 

    }
}

export const update = async (invoice) => {
    try {
        const invoiceId =invoice._id
        const clientId = await axios.put(API_URL+"/clients",invoice.client);
        const sellerId = await axios.put(API_URL+"/sellers" , invoice.seller);

        const productIds = await axios.put(API_URL+"/products",invoice.products);
        const response = await axios.put(API_URL+"/invoices",{invoiceId,clientId, sellerId,productIds })
       return response.data
    } catch (error) {
        console.error('Error updating invoice:', error);
        throw error; 
    }
}