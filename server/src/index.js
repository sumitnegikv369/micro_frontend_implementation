const express = require("express");
const cors = require("cors");
const cartRoutes = require("./routes/cart.routes");
const productRoutes = require("./routes/products.routes");
const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(cartRoutes);
app.use(productRoutes);

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
