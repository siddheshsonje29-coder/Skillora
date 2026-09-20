const express = require('express');
const { signup, login, googleLogin, sendOtp, verifyOtp, refreshToken, logout } = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiter for auth routes - generous for local development
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: 'Too many auth requests from this IP, please try again later'
});

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.post('/google', googleLogin);
router.post('/send-otp', authLimiter, sendOtp);
router.post('/verify-otp', authLimiter, verifyOtp);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

module.exports = router;
