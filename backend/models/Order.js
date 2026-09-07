const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, default: 'M' },
  color: { type: String, default: 'Default' },
  image: { type: String, default: '' }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: () => `ORD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`
  },
  customer: {
    firstName: { type: String, default: 'Guest' },
    lastName: { type: String, default: 'User' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    country: { type: String, default: 'Thailand' }
  },
  items: {
    type: [orderItemSchema],
    required: [true, 'รายการสินค้าต้องไม่ว่างเปล่า'],
    validate: [v => Array.isArray(v) && v.length > 0, 'รายการสินค้าต้องมีอย่างน้อย 1 รายการ']
  },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'visa' },
  shippingOption: { type: String, default: 'standard' },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'shipped', 'cancelled'],
    default: 'completed'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'paid'
  }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;
