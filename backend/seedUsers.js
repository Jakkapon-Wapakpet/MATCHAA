require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const User = require('./models/User');

// Demo accounts for marking and local walkthroughs. Passwords come from the
// environment so no working credential is ever committed; the fallbacks below
// are development-only and should be replaced before any public deployment.
const ACCOUNTS = [
  {
    name: 'MatchA Admin',
    email: process.env.SEED_ADMIN_EMAIL || 'admin@matcha.vip',
    password: process.env.SEED_ADMIN_PASSWORD,
    role: 'Admin',
    tier: 'VIP Connoisseur'
  },
  {
    name: 'Alex Collector',
    email: process.env.SEED_MEMBER_EMAIL || 'member@matcha.vip',
    password: process.env.SEED_MEMBER_PASSWORD,
    role: 'Member',
    tier: 'Regular Member'
  }
];

async function seedUsers() {
  const missing = ACCOUNTS.filter((a) => !a.password);
  if (missing.length) {
    console.error('Set SEED_ADMIN_PASSWORD and SEED_MEMBER_PASSWORD in backend/.env first.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB Atlas');

  for (const account of ACCOUNTS) {
    const existing = await User.findOne({ email: account.email.toLowerCase() });
    if (existing) {
      // Assigning triggers the model's pre-save hook, so this stores a hash.
      existing.password = account.password;
      existing.role = account.role;
      await existing.save();
      console.log(`Updated ${account.role}: ${account.email}`);
    } else {
      await new User({ ...account, email: account.email.toLowerCase() }).save();
      console.log(`Created ${account.role}: ${account.email}`);
    }
  }

  await mongoose.connection.close();
  console.log('Done. Passwords are stored as bcrypt hashes.');
}

seedUsers().catch(async (error) => {
  console.error('Seeding users failed:', error.message);
  await mongoose.connection.close().catch(() => {});
  process.exit(1);
});
