const express = require('express');
const router = express.Router();
const verifyController = require('../controllers/verificationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/request', protect, verifyController.requestVerification);
router.get('/', protect, admin, verifyController.getVerifications);
router.put('/:id', protect, admin, verifyController.updateVerificationStatus);

module.exports = router;
