const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    url: String,
    title: {
      shortTitle: String,
      longTitle: String,
    },
    price: {
      mrp: Number,
      discount: String,
    },
    category: String,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String,
  },
  {
    versionKey: false,
  },{
    timeStamps: true
  }
);

const ProductsModel = mongoose.model("product", productsSchema);

module.exports = {
  ProductsModel,
};
