require('dotenv').config();
const dns = require('dns');
// แก้ปัญหา Windows / Node.js c-ares DNS SRV lookup ขัดข้องกับ MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { issueToken, authRequired, adminOnly, selfOrAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// API Request Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Origin: ${req.headers.origin || 'direct'}`);
  next();
});


// Root endpoint info
app.get('/', (req, res) => {
  res.json({
    app: 'MatchA API Server',
    status: 'online',
    frontendUrl: 'http://localhost:5173',
    message: 'Backend API is running. Please visit http://localhost:5173 to view the Landing Page UI.',
    endpoints: ['/api/health', '/api/items']
  });
});

// Health check endpoint (Sprint 1 Task 3.5)
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ok',
    state: 'online',
    message: 'Backend server is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});


const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const User = require('./models/User');
const productsData = require('./data/products');


// Sample Starter API endpoint
app.get('/api/items', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Starter Item 1', description: 'Sample data item 1' },
      { id: 2, name: 'Starter Item 2', description: 'Sample data item 2' }
    ]
  });
});

// Categories list with counts (Aggregated dynamically from MongoDB with fallback)
app.get('/api/categories', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const counts = await Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
      const categoryCounts = counts.reduce((acc, c) => {
        if (c._id) acc[c._id] = c.count;
        return acc;
      }, {});
      const totalAll = await Product.countDocuments();
      return res.json({
        success: true,
        data: [
          { id: 'ALL', name: 'All Products', count: totalAll },
          { id: 'Tops', name: 'Tops & Knitwear', count: categoryCounts['Tops'] || 0 },
          { id: 'Bottoms', name: 'Bottoms & Denim', count: categoryCounts['Bottoms'] || 0 },
          { id: 'Outerwear', name: 'Outerwear & Coats', count: categoryCounts['Outerwear'] || 0 },
          { id: 'Accessories', name: 'Accessories & Bags', count: categoryCounts['Accessories'] || 0 }
        ]
      });
    }
  } catch (err) {
    console.warn('DB categories query fallback:', err.message);
  }

  // Fallback to static data
  const categoryCounts = productsData.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: [
      { id: 'ALL', name: 'All Products', count: productsData.length },
      { id: 'Tops', name: 'Tops & Knitwear', count: categoryCounts['Tops'] || 0 },
      { id: 'Bottoms', name: 'Bottoms & Denim', count: categoryCounts['Bottoms'] || 0 },
      { id: 'Outerwear', name: 'Outerwear & Coats', count: categoryCounts['Outerwear'] || 0 },
      { id: 'Accessories', name: 'Accessories & Bags', count: categoryCounts['Accessories'] || 0 }
    ]
  });
});

// Full Catalog API with search, category, sort, price, inStock, and pagination (MongoDB)
app.get(['/api/products', '/api/admin/products'], async (req, res) => {
  try {
    const {
      category = 'ALL',
      season = 'ALL',
      search = '',
      sort = 'featured',
      color = '',
      fit = '',
      inStockOnly = 'false',
      minPrice = 0,
      maxPrice = 1000,
      page = 1,
      limit = 24
    } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;

    if (mongoose.connection.readyState === 1) {
      const query = {};

      if (category && category !== 'ALL') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      if (season && season !== 'ALL') {
        query.season = { $regex: new RegExp(`^${season}$`, 'i') };
      }
      if (color && color !== 'ALL') {
        query.color = { $regex: new RegExp(`^${color}$`, 'i') };
      }
      if (fit && fit !== 'ALL') {
        query.fit = { $regex: new RegExp(`^${fit}$`, 'i') };
      }
      if (inStockOnly === 'true') {
        query.inStock = true;
      }

      const minP = parseFloat(minPrice) || 0;
      const maxP = parseFloat(maxPrice) || 10000;
      query.price = { $gte: minP, $lte: maxP };

      if (search && search.trim()) {
        const qRegex = { $regex: search.trim(), $options: 'i' };
        query.$or = [
          { name: qRegex },
          { id: qRegex },
          { description: qRegex },
          { color: qRegex },
          { tag: qRegex }
        ];
      }

      let sortOption = {};
      switch (sort) {
        case 'price-asc':
          sortOption = { price: 1 };
          break;
        case 'price-desc':
          sortOption = { price: -1 };
          break;
        case 'newest':
          sortOption = { createdAt: -1 };
          break;
        case 'rating':
          sortOption = { rating: -1 };
          break;
        case 'featured':
        default:
          sortOption = { isFeatured: -1, createdAt: -1 };
          break;
      }

      const totalItems = await Product.countDocuments(query);
      const totalPages = Math.ceil(totalItems / limitNum);
      const paginatedProducts = await Product.find(query)
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean();

      const totalAll = await Product.countDocuments();
      return res.json({
        success: true,
        data: paginatedProducts,
        pagination: {
          total: totalItems,
          page: pageNum,
          totalPages,
          limit: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        },
        availableFilters: {
          totalAll,
          priceMin: 0,
          priceMax: 1000
        }
      });
    }
  } catch (error) {
    console.error('Error fetching products from DB:', error);
  }

  // Fallback to local memory filtering if DB is unavailable
  let filtered = [...productsData];
  const {
    category = 'ALL',
    season = 'ALL',
    search = '',
    sort = 'featured',
    color = '',
    fit = '',
    inStockOnly = 'false',
    minPrice = 0,
    maxPrice = 1000,
    page = 1,
    limit = 24
  } = req.query;

  if (category && category !== 'ALL') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (season && season !== 'ALL') {
    filtered = filtered.filter(p => p.season && p.season.toLowerCase() === season.toLowerCase());
  }
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  }
  if (color && color !== 'ALL') {
    filtered = filtered.filter(p => p.color.toLowerCase().includes(color.toLowerCase()));
  }
  if (fit && fit !== 'ALL') {
    filtered = filtered.filter(p => p.fit && p.fit.toLowerCase().includes(fit.toLowerCase()));
  }
  if (inStockOnly === 'true') {
    filtered = filtered.filter(p => p.inStock);
  }

  const minP = parseFloat(minPrice) || 0;
  const maxP = parseFloat(maxPrice) || 1000;
  filtered = filtered.filter(p => p.price >= minP && p.price <= maxP);

  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 12;
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedProducts = filtered.slice(startIndex, startIndex + limitNum);

  res.json({
    success: true,
    data: paginatedProducts,
    pagination: {
      total: totalItems,
      page: pageNum,
      totalPages,
      limit: limitNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1
    },
    availableFilters: {
      totalAll: productsData.length,
      priceMin: Math.min(...productsData.map(p => p.price)),
      priceMax: Math.max(...productsData.map(p => p.price))
    }
  });
});

// Single Product Details (Task 8.1)
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      let product = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        product = await Product.findById(id);
      }
      if (!product) {
        product = await Product.findOne({ id });
      }
      if (product) {
        return res.json({ success: true, data: product });
      }
    }

    const fallback = productsData.find(p => p.id === id || p._id === id);
    if (fallback) {
      return res.json({ success: true, data: fallback });
    }

    res.status(404).json({ success: false, message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving product', error: error.message });
  }
});

// Create Product Endpoint (Task 8.2 & Task 10, Task 6.5)
app.post(['/api/products', '/api/admin/products'], authRequired, adminOnly, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      stock,
      date,
      tag,
      category,
      subCategory,
      image,
      season,
      color,
      colorHex,
      fit,
      sizes,
      variants,
      id
    } = req.body;

    const finalQuantity = quantity !== undefined ? Number(quantity) : (stock !== undefined ? Number(stock) : 20);

    const newProduct = new Product({
      id: id || `SKU-${Date.now().toString().slice(-4)}`,
      name,
      description,
      price: Number(price),
      quantity: finalQuantity,
      date: date || new Date().toISOString().split('T')[0],
      tag: tag || 'New Drop',
      category: category || 'Tops',
      subCategory: subCategory || '',
      image: image || '/images/products/autumn/tops/shirts/color_1_brown.jpeg',
      season: season || 'All Season',
      color: color || 'Matcha Green',
      colorHex: colorHex || '#2D5A27',
      fit: fit || 'Regular',
      sizes: sizes && sizes.length ? sizes : ['S', 'M', 'L', 'XL'],
      variants: variants || []
    });

    const saved = await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully in MongoDB',
      data: saved
    });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', '), errors: error.errors });
    }
    res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
  }
});

// Update Product / Stock Endpoint (Task 8.3 & Task 6.6)
app.put(['/api/products/:id', '/api/admin/products/:id'], authRequired, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.stock !== undefined && updateData.quantity === undefined) {
      updateData.quantity = Number(updateData.stock);
    }
    if (updateData.quantity !== undefined) {
      updateData.inStock = Number(updateData.quantity) > 0;
    }

    let updated = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updated = await Product.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true });
    }
    if (!updated) {
      updated = await Product.findOneAndUpdate({ id }, updateData, { returnDocument: 'after', runValidators: true });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found to update' });
    }

    res.json({
      success: true,
      message: 'Product updated successfully in MongoDB',
      data: updated
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
});

// Delete Product Endpoint (Task 8.4 & Task 6.7)
app.delete(['/api/products/:id', '/api/admin/products/:id'], authRequired, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      deleted = await Product.findByIdAndDelete(id);
    }
    if (!deleted) {
      deleted = await Product.findOneAndDelete({ id });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found to delete' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully from MongoDB',
      data: deleted
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
});

// ==========================================
// Cart CRUD Endpoints (Task 8.5, 8.6, 8.7)
// ==========================================

// Get user cart (Task 6.1 & 8.5)
app.get(['/api/cart', '/api/cart/:userId'], async (req, res) => {
  try {
    const userId = req.params.userId || req.query.userId || 'guest';
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = { userId, items: [], totalAmount: 0 };
    }
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve cart', error: error.message });
  }
});

// Add item to cart (Task 8.5)
app.post('/api/cart', async (req, res) => {
  try {
    const { userId = 'guest', item } = req.body;
    if (!item || !item.productId) {
      return res.status(400).json({ success: false, message: 'Item and productId are required' });
    }

    const itemId = item.itemId || `${item.productId}-${item.size || 'M'}-${item.color || 'Default'}`;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingIndex = cart.items.findIndex(i => i.itemId === itemId);
    const qtyToAdd = Number(item.quantity) || 1;

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += qtyToAdd;
    } else {
      cart.items.push({
        itemId,
        productId: item.productId,
        name: item.name || 'MatchA Product',
        price: Number(item.price) || 0,
        quantity: qtyToAdd,
        image: item.image || '',
        size: item.size || 'M',
        color: item.color || 'Default',
        colorHex: item.colorHex || ''
      });
    }

    await cart.save();
    res.json({ success: true, message: 'Item added to cart', data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add item to cart', error: error.message });
  }
});

// Update item quantity in cart (Task 8.6 & 6.4)
app.put(['/api/cart/:itemId', '/api/cart/:userId/:itemId'], async (req, res) => {
  try {
    const { itemId } = req.params;
    const { userId = 'guest', quantity } = req.body;
    const finalUserId = req.params.userId || userId;
    const newQty = Number(quantity);

    let cart = await Cart.findOne({ userId: finalUserId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(i => i.itemId === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    if (newQty <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = newQty;
    }

    await cart.save();
    res.json({ success: true, message: 'Cart updated successfully', data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update cart', error: error.message });
  }
});

// Delete item from cart (Task 8.7 & 6.3)
app.delete(['/api/cart/:itemId', '/api/cart/:userId/:itemId'], async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.params.userId || req.query.userId || 'guest';

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(i => i.itemId !== itemId);
    await cart.save();
    res.json({ success: true, message: 'Item removed from cart', data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete item from cart', error: error.message });
  }
});

// ==========================================
// Order CRUD Endpoints (Task 8.5 / Order)
// ==========================================

// Create new order (Checkout)
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      discount = 0,
      shippingFee = 0,
      total,
      paymentMethod = 'visa',
      shippingOption = 'standard'
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Order items are required' });
    }

    const newOrder = new Order({
      customer: customer || {},
      items,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      shippingFee: Number(shippingFee) || 0,
      total: Number(total) || 0,
      paymentMethod,
      shippingOption,
      status: 'completed',
      paymentStatus: 'paid'
    });

    const savedOrder = await newOrder.save();

    // Reset guest cart after checkout
    await Cart.findOneAndUpdate({ userId: 'guest' }, { items: [], totalAmount: 0 });

    res.status(201).json({
      success: true,
      message: 'Order created successfully in MongoDB',
      data: savedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
});

// List orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
});

// Get single order details
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let order = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findById(id);
    }
    if (!order) {
      order = await Order.findOne({ orderId: id });
    }
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve order', error: error.message });
  }
});

// ==========================================
// User & Member CRUD Endpoints (Task 10.7)
// ==========================================

// List all users / members
// Users are addressed by ObjectId, userId or email across the app.
async function findUserByIdentifier(identifier, withPassword = false) {
  const select = withPassword ? '+password' : '';
  let user = null;
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    user = await User.findById(identifier).select(select);
  }
  if (!user) {
    user = await User.findOne({
      $or: [{ userId: identifier }, { email: String(identifier).toLowerCase() }]
    }).select(select);
  }
  return user;
}

// Shape a user for the client. The password never leaves the server.
function publicUser(user) {
  const { password, ...safe } = user.toObject ? user.toObject() : user;
  return safe;
}

// ==========================================================
// AUTHENTICATION
// ==========================================================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email is already registered' });
    }

    // role is deliberately not read from the body: nobody signs themselves up
    // as an administrator.
    const user = await new User({
      name,
      email: String(email).toLowerCase(),
      password,
      role: 'Member',
      phone: phone || '',
      address: address || ''
    }).save();

    res.status(201).json({
      success: true,
      message: 'Account created',
      token: issueToken(user),
      data: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create account', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await findUserByIdentifier(email, true);
    // One message for both cases, so the response cannot be used to find out
    // which addresses are registered.
    const invalid = { success: false, message: 'Incorrect email or password' };
    if (!user || !user.password) {
      return res.status(401).json(invalid);
    }

    const ok = await user.verifyPassword(password);
    if (!ok) {
      return res.status(401).json(invalid);
    }

    // Upgrade any row still holding a pre-hashing plaintext password.
    if (!User.isHashed(user.password)) {
      user.password = password;
      await user.save();
    }

    res.json({
      success: true,
      message: 'Signed in',
      token: issueToken(user),
      data: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to sign in', error: error.message });
  }
});

app.get('/api/auth/me', authRequired, (req, res) => {
  res.json({ success: true, data: publicUser(req.user) });
});

app.get('/api/users', authRequired, adminOnly, async (req, res) => {
  try {
    const { role, tier, search } = req.query;
    const query = {};

    if (role && role !== 'ALL') {
      query.role = role;
    }
    if (tier && tier !== 'ALL') {
      query.tier = tier;
    }
    if (search && search.trim()) {
      const qRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { name: qRegex },
        { email: qRegex },
        { userId: qRegex }
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
});

// Get user by ID or email
app.get('/api/users/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    let user = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id);
    }
    if (!user) {
      user = await User.findOne({ $or: [{ userId: id }, { email: id }] });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve user', error: error.message });
  }
});

// Create new user / member
// Administrator-created accounts. Public sign-up goes through
// POST /api/auth/register, which never honours a role from the body.
app.post('/api/users', authRequired, adminOnly, async (req, res) => {
  try {
    const { name, email, password, role, tier, phone, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: password || '',
      role: role || 'Member',
      tier: tier || 'Regular Member',
      phone: phone || '',
      address: address || ''
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully in MongoDB',
      data: savedUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
  }
});

// Update user info or tier
app.put('/api/users/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const target = await findUserByIdentifier(id);
    if (!target) {
      return res.status(404).json({ success: false, message: 'User not found to update' });
    }

    const isAdmin = req.user.role === 'Admin';
    if (!isAdmin && String(target._id) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'You may only modify your own account' });
    }
    // Privilege and credentials are not ordinary profile fields.
    if (!isAdmin) {
      delete updateData.role;
      delete updateData.tier;
    }
    delete updateData.password;

    Object.assign(target, updateData);
    const updated = await target.save();

    res.json({
      success: true,
      message: 'User updated successfully in MongoDB',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
  }
});

// Delete user
app.delete('/api/users/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;

    const target = await findUserByIdentifier(id);
    if (!target) {
      return res.status(404).json({ success: false, message: 'User not found to delete' });
    }
    if (req.user.role !== 'Admin' && String(target._id) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'You may only close your own account' });
    }

    const deleted = await User.findByIdAndDelete(target._id);

    res.json({
      success: true,
      message: 'User deleted successfully from MongoDB',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete user', error: error.message });
  }
});

// 404 Route Handler for unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot GET ${req.originalUrl}. Route not found on API server.`,
    availableRoutes: ['/api/health', '/api/products', '/api/categories', '/api/cart', '/api/orders', '/api/users']
  });
});

// Error handling fallback
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// ทดสอบเชื่อมต่อแบบ Non-blocking (ไม่ทำให้เซิร์ฟเวอร์ค้างถ้าต่อไม่ติด)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('🍃 [MongoDB] Connected successfully!'))
    .catch(err => console.error('❌ [MongoDB] Connection error:', err.message));
}

app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
});


