const mongoose = require("mongoose");
  var schema = mongoose.Schema(
    {
      companyName: { type: String, required: true },
      address: { type: String, required: true },
      serie: { type: String, required: false },
    },
   
  );

  const Seller = mongoose.model("Seller", schema);
  module.exports = Seller;
