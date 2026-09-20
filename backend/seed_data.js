const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const users = [
  {
    name: 'Ayush Sharma',
    email: 'ayush@skillora.com',
    password: 'password123',
    college: 'IIT Bombay',
    role: 'both',
    skills_offered: [{ name: 'React', level: 'expert', creditValue: 25 }],
    skills_wanted: ['Node.js', 'UI/UX Design'],
    credits: 120,
    rating: 4.9,
    sessions_completed: 15
  },
  {
    name: 'Siddhesh Jain',
    email: 'siddhesh@skillora.com',
    password: 'password123',
    college: 'BITS Pilani',
    role: 'both',
    skills_offered: [{ name: 'Javascript', level: 'expert', creditValue: 20 }],
    skills_wanted: ['Python', 'Machine Learning'],
    credits: 85,
    rating: 4.8,
    sessions_completed: 12
  },
  {
    name: 'Mrunali Patil',
    email: 'mrunali@skillora.com',
    password: 'password123',
    college: 'NID Ahmedabad',
    role: 'both',
    skills_offered: [{ name: 'UI/UX Design', level: 'expert', creditValue: 30 }],
    skills_wanted: ['Javascript', 'React'],
    credits: 150,
    rating: 5.0,
    sessions_completed: 20
  },
  {
    name: 'Rahul Verma',
    email: 'rahul@skillora.com',
    password: 'password123',
    college: 'DTU Delhi',
    role: 'teacher',
    skills_offered: [{ name: 'Python', level: 'intermediate', creditValue: 15 }],
    skills_wanted: ['French', 'Public Speaking'],
    credits: 40,
    rating: 4.5,
    sessions_completed: 5
  },
  {
    name: 'Sarah Jones',
    email: 'sarah@skillora.com',
    password: 'password123',
    college: 'Stanford Online',
    role: 'learner',
    skills_offered: [{ name: 'English', level: 'expert', creditValue: 10 }],
    skills_wanted: ['Javascript', 'Python'],
    credits: 200,
    rating: 4.7,
    sessions_completed: 8
  },
  {
    name: 'Ishaan Gupta',
    email: 'ishaan@skillora.com',
    password: 'password123',
    college: 'VIT Vellore',
    role: 'both',
    skills_offered: [{ name: 'Machine Learning', level: 'intermediate', creditValue: 40 }],
    skills_wanted: ['Data Structures', 'C++'],
    credits: 60,
    rating: 4.6,
    sessions_completed: 10
  }
];

const seedData = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillora';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing users except the main test user if needed, but let's just add new ones
    for (const u of users) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        u.password = await bcrypt.hash(u.password, 12);
        const newUser = new User(u);
        await newUser.save();
        console.log(`User ${u.name} seeded`);
      } else {
        console.log(`User ${u.name} already exists`);
      }
    }

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
