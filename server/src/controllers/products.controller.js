const products = require("../data/products");

const getAllProducts = async (req, res) => {
  res.json(products);
};

const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((product) => product.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
