const mongoose = require("mongoose");
    var schema = mongoose.Schema(
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }
    );

  
    const Product = mongoose.model("Product", schema);
    module.exports = Product
