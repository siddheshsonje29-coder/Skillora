const User = require('../models/User');

exports.getMatches = async (req, res) => {
  try {
    const { search } = req.query;
    const currentUserId = req.user ? req.user.id : null;
    const user = currentUserId ? await User.findById(currentUserId) : null;

    // If search query is provided, find users by name or skill
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      const query = {
        $or: [
          { name: searchRegex },
          { 'skills_offered.name': searchRegex },
          { skills_wanted: searchRegex }
        ]
      };
      if (user) query._id = { $ne: user._id };

      const searchResults = await User.find(query).limit(20);
      return res.status(200).json(searchResults);
    }

    // If guest visitor (not logged in), return all active mentors
    if (!user) {
      const publicMentors = await User.find({}).limit(20);
      return res.status(200).json(publicMentors);
    }

    // Default matching logic: find users who offer what this user wants
    // and want what this user offers
    const matches = await User.find({
      _id: { $ne: user._id },
      'skills_offered.name': { $in: user.skills_wanted },
      skills_wanted: { $in: user.skills_offered.map(s => s.name) }
    }).limit(10);

    // If no exact matches, find people who offer what user wants
    if (matches.length === 0) {
      const partialMatches = await User.find({
        _id: { $ne: user._id },
        'skills_offered.name': { $in: user.skills_wanted }
      }).limit(10);
      return res.status(200).json(partialMatches);
    }

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
