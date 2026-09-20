const express = require('express');
const { getMatches } = require('../controllers/matchController');
const { optionalProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', optionalProtect, getMatches);

module.exports = router;
