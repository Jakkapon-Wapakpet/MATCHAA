const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    default: '',
    // Never ships with a query unless a route asks for it explicitly.
    select: false
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

const BCRYPT_ROUNDS = 10;
const BCRYPT_PATTERN = /^\$2[aby]\$\d{2}\$/;

userSchema.pre('save', async function () {
  if (!this.userId && this._id) {
    this.userId = `MEM-${this._id.toString().slice(-4).toUpperCase()}`;
  }
  // Hash here rather than at each call site, so no route can write a plaintext
  // password by forgetting to. Already-hashed values pass through untouched.
  if (this.isModified('password') && this.password && !BCRYPT_PATTERN.test(this.password)) {
    this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
  }
});

// True when the stored value predates hashing and is still readable plaintext.
userSchema.statics.isHashed = (value) => BCRYPT_PATTERN.test(value || '');

userSchema.methods.verifyPassword = async function (candidate) {
  if (!candidate || !this.password) return false;
  if (BCRYPT_PATTERN.test(this.password)) {
    return bcrypt.compare(candidate, this.password);
  }
  // Legacy row stored before hashing existed: compare directly this once, and
  // the login route rewrites it as a hash so the next sign-in is a real check.
  return candidate === this.password;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
