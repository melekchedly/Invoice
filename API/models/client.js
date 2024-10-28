const mongoose = require("mongoose");
    var schema = mongoose.Schema(
      {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phone:{ type: String, required: true },
        serie:{ type: String, required: false }
      }
    );
  
    const Client = mongoose.model("Client", schema);
 
  module.exports = Client