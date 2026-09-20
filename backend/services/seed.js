const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedUsers = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillora';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({ email: { $ne: 'admin@skillora.com' } });

    const password = await bcrypt.hash('password123', 12);

    const users = [
      {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        password,
        role: 'both',
        skills_offered: [{ name: 'Guitar', level: 'expert', creditValue: 20 }],
        skills_wanted: ['Python', 'Data Science'],
        college: 'IIT Bombay',
        credits: 100,
        trust_score: 95
      },
      {
        name: 'Priya Kapoor',
        email: 'priya@example.com',
        password,
        role: 'teacher',
        skills_offered: [{ name: 'Python', level: 'expert', creditValue: 15 }, { name: 'Data Science', level: 'intermediate', creditValue: 25 }],
        skills_wanted: ['French'],
        college: 'MIT Pune',
        credits: 50,
        trust_score: 98
      },
      {
        name: 'Amit Deshmukh',
        email: 'amit@example.com',
        password,
        role: 'learner',
        skills_offered: [{ name: 'UI/UX', level: 'intermediate', creditValue: 10 }],
        skills_wanted: ['Guitar', 'React'],
        college: 'COEP',
        credits: 30,
        trust_score: 85
      },
      {
        name: 'Sneha Patil',
        email: 'sneha@example.com',
        password,
        role: 'both',
        skills_offered: [{ name: 'French', level: 'expert', creditValue: 30 }],
        skills_wanted: ['Guitar'],
        college: 'Mumbai University',
        credits: 75,
        trust_score: 92
      }
    ];

    await User.insertMany(users);
    console.log('✅ Mock users seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedUsers();
