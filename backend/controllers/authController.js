const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateTokens = (userId) => {
  // Use 30 days so users are not prematurely logged out during testing/demo sessions
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  return { accessToken, refreshToken };
};

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, skills_offered, skills_wanted, language_preference, college } = req.body;
    const normalizedEmail = email ? email.toLowerCase().trim() : '';
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) return res.status(400).json({ message: 'User already exists with this email' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name, email: normalizedEmail, phone, password: hashedPassword, role, skills_offered, skills_wanted, language_preference, college
    });

    await user.save();
    
    // Default 50 credits are added automatically via default in schema
    const { accessToken, refreshToken } = generateTokens(user._id);
    res.status(201).json({ message: 'User created successfully', accessToken, refreshToken, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail }).select('+password');
    
    // If user does not exist but is a known demo account, automatically auto-provision it
    if (!user) {
      const demoAccounts = {
        'siddhesh@skillora.com': { name: 'Siddhesh Jain', college: 'BITS Pilani', role: 'both', skills_offered: [{ name: 'Javascript', level: 'expert', creditValue: 20 }] },
        'ayush@skillora.com': { name: 'Ayush Sharma', college: 'IIT Bombay', role: 'both', skills_offered: [{ name: 'React', level: 'expert', creditValue: 25 }] },
        'aravind@skillora.com': { name: 'Aravind Iyer', college: 'IIT Madras', role: 'both', skills_offered: [{ name: 'Python', level: 'expert', creditValue: 20 }] },
        'mrunali@skillora.com': { name: 'Mrunali Patil', college: 'NID Ahmedabad', role: 'both', skills_offered: [{ name: 'UI/UX Design', level: 'expert', creditValue: 30 }] }
      };

      if (demoAccounts[normalizedEmail]) {
        const info = demoAccounts[normalizedEmail];
        const hashedPassword = await bcrypt.hash('password123', 12);
        user = new User({
          name: info.name,
          email: normalizedEmail,
          password: hashedPassword,
          college: info.college,
          role: info.role,
          skills_offered: info.skills_offered,
          credits: 100,
          rating: 4.9,
          trust_score: 90
        });
        await user.save();
      } else {
        return res.status(400).json({ message: 'Account not found with this email. Please check your email or click a demo account.' });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password. Demo accounts use: password123' });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, role: user.role, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message, error: error.message });
  }
};

exports.googleLogin = async (req, res) => {
  // Stub for Google OAuth login
  res.status(200).json({ message: 'Google login placeholder' });
};

exports.sendOtp = async (req, res) => {
  // Stub for sending OTP via Twilio/MSG91
  res.status(200).json({ message: 'OTP sent successfully' });
};

exports.verifyOtp = async (req, res) => {
  // Stub for verifying OTP
  res.status(200).json({ message: 'OTP verified successfully' });
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const { accessToken, refreshToken } = generateTokens(decoded.id);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

exports.logout = async (req, res) => {
  // Client should delete the token, can add token blacklisting here
  res.status(200).json({ message: 'Logged out successfully' });
};
