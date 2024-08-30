const router = require('express').Router();
const { getCart, addToCart, emptyCart } = require('../controllers/cart.controller'); 

router.get('/cart', getCart);
router.post('/cart', addToCart);
router.delete('/cart', emptyCart);

module.exports = router;
