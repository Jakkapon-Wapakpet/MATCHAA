require('dotenv').config();
const dns = require('dns');
// แก้ปัญหา Windows / Node.js DNS SRV lookup ขัดข้องกับ MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const Product = require('./models/Product');
const productsData = require('./data/products');

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    console.log('🍃 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const existingCount = await Product.countDocuments();
    console.log(`📦 Currently found ${existingCount} products in collection.`);

    console.log('🔄 Preparing product data...');
    const preparedProducts = productsData.map((p) => {
      const { _id, ...rest } = p;
      return {
        ...rest,
        quantity: typeof p.quantity === 'number' ? p.quantity : 25,
        tag: p.tag || 'New Drop',
        date: p.date || p.createdAt || new Date().toISOString().split('T')[0],
        inStock: typeof p.inStock === 'boolean' ? p.inStock : true,
      };
    });

    console.log('🗑️  Clearing old collection data...');
    await Product.deleteMany({});

    console.log(`📥 Inserting ${preparedProducts.length} products...`);
    const inserted = await Product.insertMany(preparedProducts, { ordered: false });
    console.log(`🎉 Successfully seeded ${inserted.length} products into MongoDB Atlas!`);

    const finalCount = await Product.countDocuments();
    console.log(`📊 Total products verified in collection: ${finalCount}`);

    await mongoose.connection.close();
    console.log('🔌 Database connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
