const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
  color: { type: String, trim: true },
  colorHex: { type: String, trim: true },
  image: { type: String, trim: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'ชื่อสินค้าต้องมีความยาวอย่างน้อย 3 ตัวอักษร'],
    trim: true,
    minlength: [3, 'ชื่อสินค้าต้องมีความยาวอย่างน้อย 3 ตัวอักษร']
  },
  description: {
    type: String,
    required: [true, 'คำอธิบายต้องมีความยาวอย่างน้อย 10 ตัวอักษร'],
    trim: true,
    minlength: [10, 'คำอธิบายต้องมีความยาวอย่างน้อย 10 ตัวอักษร']
  },
  price: {
    type: Number,
    required: [true, 'ราคาต้องเป็นตัวเลขที่มากกว่า 0'],
    min: [0.01, 'ราคาต้องเป็นตัวเลขที่มากกว่า 0']
  },
  originalPrice: {
    type: Number,
    default: function() { return this.price; }
  },
  quantity: {
    type: Number,
    required: [true, 'จำนวนสต็อกต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป'],
    min: [0, 'จำนวนสต็อกต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป'],
    default: 20
  },
  tag: {
    type: String,
    required: [true, 'กรุณาระบุ Tag หรือประเภทสินค้า'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'กรุณาเลือกหมวดหมู่สินค้า'],
    trim: true
  },
  subCategory: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String,
    required: [true, 'รูปภาพสินค้าจำเป็นต้องมี'],
    default: '/images/products/autumn/tops/shirts/color_1_brown.jpeg'
  },
  season: {
    type: String,
    trim: true,
    default: 'All Season'
  },
  color: {
    type: String,
    trim: true,
    default: 'Matcha Green'
  },
  colorHex: {
    type: String,
    trim: true,
    default: '#2D5A27'
  },
  fit: {
    type: String,
    trim: true,
    default: 'Regular'
  },
  sizes: {
    type: [String],
    default: ['S', 'M', 'L', 'XL']
  },
  variants: [productVariantSchema],
  inStock: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual alias: stock <-> quantity เพื่อรองรับทั้งฟอร์ม Admin และเกณฑ์ Task 10
productSchema.virtual('stock')
  .get(function() {
    return this.quantity;
  })
  .set(function(val) {
    this.quantity = val;
  });

// Pre-save hook: auto-sync inStock flag and default id
productSchema.pre('save', function() {
  if (this.quantity !== undefined) {
    this.inStock = Number(this.quantity) > 0;
  }
  if (!this.id && this._id) {
    this.id = this._id.toString();
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
