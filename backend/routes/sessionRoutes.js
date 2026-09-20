const express = require('express');
const { createSession, getSessions, updateSessionStatus } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createSession);
router.get('/', protect, getSessions);
router.patch('/:id', protect, updateSessionStatus);

module.exports = router;
