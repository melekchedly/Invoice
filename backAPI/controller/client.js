

const Client = require("../models/client.js");

exports.create = async (req, res) => {
    try {
        const client = new Client(req.body);  
        await client.save();  
        res.status(201).json(client); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedData = req.body;   
        const  clientId = req.body._id; 
        
        const updatedClient = await Client.findByIdAndUpdate(clientId, updatedData, { new: true });

        if (!updatedClient) {
            return res.status(404).send({ message: 'Client not found' });
        }

        res.status(200).json(updatedClient._id);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};
 