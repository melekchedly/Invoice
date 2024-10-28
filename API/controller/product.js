
const Product = require("../models/product.js");



exports.create = async (req, res) => {
    try {
        const products = req.body; 

        
        if (!Array.isArray(products)) {
            return res.status(400).send({ message: "Invalid input: Expected an array of products." });
        }

        const savedProductIds = []; 
        for (const productData of products) {
            const product = new Product(productData);
            const savedProduct = await product.save();
            savedProductIds.push(savedProduct._id); 
        }

        res.status(201).json(savedProductIds); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const products = req.body; 

        if (!Array.isArray(products)) {
            return res.status(400).send({ message: "Invalid input: Expected an array of products." });
        }

        const updatedProductIds = []; 
        for (const productData of products) {
            const { _id, ...updateData } = productData; 

            const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
            if (!updatedProduct) {
                return res.status(404).send({ message: `Product with ID ${_id} not found.` });
            }
            updatedProductIds.push(updatedProduct._id); 
        }

        res.status(200).json(updatedProductIds); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

