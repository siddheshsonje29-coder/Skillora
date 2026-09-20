const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createTestUser = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillora';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const existingUser = await User.findOne({ email: 'test@skillora.com' });
    if (existingUser) {
      console.log('Test user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('password123', 12);
    const testUser = new User({
      name: 'Test Administrator',
      email: 'test@skillora.com',
      password: hashedPassword,
      phone: '9876543210',
      role: 'both',
      skills_offered: [{ name: 'Javascript', level: 'expert', creditValue: 20 }],
      skills_wanted: ['Python', 'Machine Learning'],
      college: 'Skillora University',
      credits: 500
    });

    await testUser.save();
    console.log('✅ Test user created successfully!');
    console.log('Email: test@skillora.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (err) {
    console.error('Error creating test user:', err);
    process.exit(1);
  }
};

createTestUser();
