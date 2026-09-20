const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const seedInitialUsers = async () => {
  try {
    const count = await User.countDocuments();
    if (count > 0) {
      console.log(`ℹ️  Found ${count} existing users in database.`);
      return;
    }

    console.log('🌱 Seeding initial demo users into database...');
    const hashedPassword = await bcrypt.hash('password123', 12);

    const demoUsers = [
      {
        name: 'Siddhesh Jain',
        email: 'siddhesh@skillora.com',
        password: hashedPassword,
        college: 'BITS Pilani',
        role: 'both',
        skills_offered: [{ name: 'Javascript', level: 'expert', creditValue: 20 }],
        skills_wanted: ['Python', 'Machine Learning'],
        credits: 100,
        rating: 4.9,
        trust_score: 90
      },
      {
        name: 'Ayush Sharma',
        email: 'ayush@skillora.com',
        password: hashedPassword,
        college: 'IIT Bombay',
        role: 'both',
        skills_offered: [{ name: 'React', level: 'expert', creditValue: 25 }],
        skills_wanted: ['Node.js', 'UI/UX Design'],
        credits: 120,
        rating: 4.8,
        trust_score: 95
      },
      {
        name: 'Aravind Iyer',
        email: 'aravind@skillora.com',
        password: hashedPassword,
        college: 'IIT Madras',
        role: 'both',
        skills_offered: [{ name: 'Python', level: 'expert', creditValue: 20 }],
        skills_wanted: ['UI/UX Design'],
        credits: 100,
        rating: 4.7,
        trust_score: 85
      },
      {
        name: 'Mrunali Patil',
        email: 'mrunali@skillora.com',
        password: hashedPassword,
        college: 'NID Ahmedabad',
        role: 'both',
        skills_offered: [{ name: 'UI/UX Design', level: 'expert', creditValue: 30 }],
        skills_wanted: ['Javascript', 'React'],
        credits: 150,
        rating: 5.0,
        trust_score: 92
      }
    ];

    for (const u of demoUsers) {
      await User.findOneAndUpdate({ email: u.email }, u, { upsert: true, new: true });
    }

    console.log('✅ Demo users successfully seeded:');
    console.log('   - siddhesh@skillora.com (pass: password123)');
    console.log('   - ayush@skillora.com (pass: password123)');
    console.log('   - aravind@skillora.com (pass: password123)');
  } catch (err) {
    console.error('⚠️  Failed to seed users:', err.message);
  }
};

let memServer = null;

const connectDB = async () => {
  const targetUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillora';

  try {
    console.log(`🔄 Attempting to connect to MongoDB at: ${targetUri}...`);
    await mongoose.connect(targetUri, {
      serverSelectionTimeoutMS: 2500
    });
    console.log('✅ Connected to MongoDB at ' + targetUri);
    await seedInitialUsers();
    return;
  } catch (err) {
    console.warn(`⚠️  Could not connect to ${targetUri} (${err.message}).`);
    console.log('🚀 Starting in-memory MongoDB fallback...');
  }

  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memServer = await MongoMemoryServer.create();
    const memUri = memServer.getUri();
    await mongoose.connect(memUri);
    console.log(`✅ In-Memory MongoDB connected successfully at ${memUri}`);
    await seedInitialUsers();
  } catch (err) {
    console.error('❌ Failed to start In-Memory MongoDB:', err);
  }
};

module.exports = { connectDB };
