const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  image: { type: String, default: '' },
  size: { type: String, default: 'M' },
  color: { type: String, default: 'Default' },
  colorHex: { type: String, default: '' }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: String, default: 'guest', index: true },
  sessionId: { type: String, default: 'default-session' },
  items: [cartItemSchema],
  totalAmount: { type: Number, default: 0 }
}, { timestamps: true });

cartSchema.pre('save', function() {
  this.totalAmount = this.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

module.exports = Cart;
