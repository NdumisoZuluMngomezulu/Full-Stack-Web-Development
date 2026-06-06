const Product = require('../models/Product');
const Order = require('../models/Order');exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const user = req.user;  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });  
  const cartItem = user.cart.find(item => item.productId.toString() === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    user.cart.push({ productId, quantity });
  }  await user.save();
  res.json({ message: 'Added to cart', cart: user.cart });
};
exports.getCart = async (req, res) => {
  const user = await req.user.populate('cart.productId');
  res.json(user.cart.map(item => ({
    product: item.productId,
    quantity: item.quantity
  })));
};
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user;  const cartItem = user.cart.find(item => item.productId.toString() === productId);
  if (!cartItem) return res.status(404).json({ error: 'Product not in cart' });  if (quantity <= 0) {
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
  } else {
    cartItem.quantity = quantity;
  }  await user.save();
  res.json({ message: 'Cart updated', cart: user.cart });
};
exports.checkout = async (req, res) => {
  const user = req.user;
  if (user.cart.length === 0) return res.status(400).json({ error: 'Cart is empty' });  
  const order = new Order({
    userId: user._id,
    products: user.cart,
    status: 'Pending'
  });  
  await order.save();
  user.cart = [];
  await user.save();  
  res.json({ message: 'Order placed', order });
};
