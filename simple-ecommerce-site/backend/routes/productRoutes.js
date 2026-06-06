const express = require('express');
const router = express.Router();
const { getProducts, addToCart, getCart, updateCart, checkout } = require('../controllers/productController');
const auth = require('../middleware/auth');router.get('/', getProducts);
router.post('/cart', auth, addToCart);
router.get('/cart', auth, getCart);
router.put('/cart', auth, updateCart);
router.post('/checkout', auth, checkout);module.exports = router;