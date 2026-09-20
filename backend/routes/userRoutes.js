const express = require('express');
const { getUserProfile, updateProfile, getLeaderboard, getStats } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfile);
router.get('/stats', protect, getStats);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
