const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  brand: { type: String, required: true },
  partNumber: { type: String, required: true },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  image: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
