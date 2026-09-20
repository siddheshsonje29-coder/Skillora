const Verification = require('../models/Verification');
const User = require('../models/User');

exports.requestVerification = async (req, res) => {
  try {
    const { skillName, description, proofLinks } = req.body;
    const verification = new Verification({
      userId: req.user.id,
      skillName,
      description,
      proofLinks
    });
    await verification.save();
    res.status(201).json(verification);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting verification request', error: error.message });
  }
};

exports.getVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find().populate('userId', 'name email');
    res.status(200).json(verifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verifications', error: error.message });
  }
};

exports.updateVerificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const verification = await Verification.findByIdAndUpdate(id, {
      status,
      adminNotes,
      reviewedAt: new Date()
    }, { new: true });

    if (status === 'approved') {
      const user = await User.findById(verification.userId);
      const skillIndex = user.skills_offered.findIndex(s => s.name === verification.skillName);
      if (skillIndex > -1) {
        user.skills_offered[skillIndex].isVerified = true;
        await user.save();
      }
    }

    res.status(200).json(verification);
  } catch (error) {
    res.status(500).json({ message: 'Error updating verification status', error: error.message });
  }
};
