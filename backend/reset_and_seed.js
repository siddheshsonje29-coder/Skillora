const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const users = [
  {
    name: 'Aravind Iyer',
    email: 'aravind@skillora.com',
    password: 'password123',
    college: 'IIT Madras',
    role: 'both',
    skills_offered: [{ name: 'Python', level: 'expert', creditValue: 20 }],
    skills_wanted: ['UI/UX Design'],
    credits: 100,
    trust_score: 85
  },
  {
    name: 'Sanya Malhotra',
    email: 'sanya@skillora.com',
    password: 'password123',
    college: 'NID Delhi',
    role: 'both',
    skills_offered: [{ name: 'UI/UX Design', level: 'expert', creditValue: 25 }],
    skills_wanted: ['React'],
    credits: 100,
    trust_score: 90
  },
  {
    name: 'Rahul Sharma',
    email: 'rahul.s@skillora.com',
    password: 'password123',
    college: 'BITS Pilani',
    role: 'both',
    skills_offered: [{ name: 'React', level: 'intermediate', creditValue: 30 }],
    skills_wanted: ['Node.js'],
    credits: 100,
    trust_score: 80
  },
  {
    name: 'Priya Das',
    email: 'priya@skillora.com',
    password: 'password123',
    college: 'JU Kolkata',
    role: 'both',
    skills_offered: [{ name: 'Node.js', level: 'expert', creditValue: 35 }],
    skills_wanted: ['Python'],
    credits: 100,
    trust_score: 95
  }
];

const resetAndSeed = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillora';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Remove ALL existing users
    await User.deleteMany({});
    console.log('Cleared all existing user data');

    // Hash passwords and save new users
    for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, 12);
      const newUser = new User({
        ...u,
        password: hashedPassword
      });
      await newUser.save();
      console.log(`User ${u.name} inserted`);
    }

    console.log('✅ 4 New persons inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during reset and seed:', err);
    process.exit(1);
  }
};

resetAndSeed();
