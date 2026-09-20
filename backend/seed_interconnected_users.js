const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedInterconnectedMembers = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillora';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('password123', 12);

    const members = [
      {
        name: 'Alice Johnson',
        email: 'alice@skillora.com',
        password: hashedPassword,
        phone: '1111111111',
        role: 'both',
        skills_offered: [{ name: 'React', level: 'expert', creditValue: 30 }],
        skills_wanted: ['Node.js'],
        college: 'Stanford University',
        credits: 100,
        is_verified: true
      },
      {
        name: 'Bob Miller',
        email: 'bob@skillora.com',
        password: hashedPassword,
        phone: '2222222222',
        role: 'both',
        skills_offered: [{ name: 'Node.js', level: 'expert', creditValue: 25 }],
        skills_wanted: ['UI Design'],
        college: 'MIT',
        credits: 100,
        is_verified: true
      },
      {
        name: 'Charlie Davis',
        email: 'charlie@skillora.com',
        password: hashedPassword,
        phone: '3333333333',
        role: 'both',
        skills_offered: [{ name: 'UI Design', level: 'expert', creditValue: 20 }],
        skills_wanted: ['Marketing'],
        college: 'Harvard University',
        credits: 100,
        is_verified: true
      },
      {
        name: 'Diana Smith',
        email: 'diana@skillora.com',
        password: hashedPassword,
        phone: '4444444444',
        role: 'both',
        skills_offered: [{ name: 'Marketing', level: 'expert', creditValue: 15 }],
        skills_wanted: ['React'],
        college: 'Cambridge University',
        credits: 100,
        is_verified: true
      }
    ];

    for (const member of members) {
      await User.findOneAndUpdate(
        { email: member.email },
        member,
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded/Updated member: ${member.name} (${member.email})`);
    }

    console.log('\n--- Credentials for Test Members ---');
    members.forEach(m => {
      console.log(`Name: ${m.name}`);
      console.log(`Email: ${m.email}`);
      console.log(`Password: password123`);
      console.log('---------------------------------');
    });

    process.exit(0);
  } catch (err) {
    console.error('Error seeding interconnected members:', err);
    process.exit(1);
  }
};

seedInterconnectedMembers();
