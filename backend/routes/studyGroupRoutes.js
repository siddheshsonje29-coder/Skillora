const express = require('express');
const router = express.Router();
const groupController = require('../controllers/studyGroupController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, groupController.createGroup);
router.get('/', protect, groupController.getGroups);
router.post('/:id/join', protect, groupController.joinGroup);
router.post('/:id/leave', protect, groupController.leaveGroup);

module.exports = router;
