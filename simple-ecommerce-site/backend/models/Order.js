const mongoose = require('mongoose');const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  status: String,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);