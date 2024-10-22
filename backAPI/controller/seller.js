
const Seller = require("../models/seller.js");

exports.create = async (req, res) => {
    try {
        const seller = new Seller(req.body.seller);  
        await seller.save();  
        res.status(201).json(seller); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedData = req.body; 
        const  sellerId  = req.body._id; 

        const updatedSeller = await Seller.findByIdAndUpdate(sellerId, updatedData, { new: true });

        if (!updatedSeller) {
            return res.status(404).send({ message: 'Seller not found' });
        }

        res.status(200).json(updatedSeller._id);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

