const express = require("express");
const { ProductsModel } = require("../Models/products.model");
const productsRouter = express.Router();

productsRouter.post("/addproduct", async (req, res) => {
  const { url, title, price, category, quantity, description, discount, tagline} = req.body;
  try {
    const product = new ProductsModel({ url, title, price, category, quantity, description, discount, tagline});
    await product.save();
    res.send("Producted Added");
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

module.exports = {
  productsRouter,
};
