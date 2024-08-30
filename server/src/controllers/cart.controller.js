const products = require("../data/products");

let cart = [{
  ...products[0], quantity: 1
}];

const getCart = (req, res) => {
  res.json(cart);
};

const addToCart = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const cartItem = cart.find(item => item.id === parseInt(id));

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    const product = products.find(product => product.id === parseInt(id));
    if (product) {
      cart.push({ ...product, quantity: 1 });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  }

  res.json(cart);
};
const emptyCart = (req, res) => {
  cart = [];
  res.json({ message: "Cart has been emptied" });
};

module.exports = {
  getCart,
  addToCart,
  emptyCart,
};
