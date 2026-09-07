const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'กรุณาระบุชื่อผู้ใช้งาน'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'กรุณาระบุอีเมล'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer', 'Member'],
    default: 'Member'
  },
  tier: {
    type: String,
    enum: ['Regular Member', 'VIP Connoisseur', 'Silver Member', 'Gold Member'],
    default: 'Regular Member'
  },
  totalSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  ordersCount: {
    type: Number,
    default: 0,
    min: 0
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  joined: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.pre('save', function() {
  if (!this.userId && this._id) {
    this.userId = `MEM-${this._id.toString().slice(-4).toUpperCase()}`;
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
