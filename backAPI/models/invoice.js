const mongoose= require ("mongoose");
const { Schema } = mongoose;
    const schema = new Schema(
      {
        client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
        products: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
    ],
    totalPrice: { type: Number, required: true, min:0 }
    });
  
    const Invoice = mongoose.model("Invoice", schema);
    module.exports = Invoice 
