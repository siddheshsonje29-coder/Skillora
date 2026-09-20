const User = require('../models/User');

/**
 * Calculates matching score between a learner and a potential teacher
 * Score = (0.4 * Skill Match) + (0.2 * Rating) + (0.2 * Availability) + (0.2 * Language)
 */
exports.getSuggestions = async (learnerId, skillWanted) => {
  try {
    const learner = await User.findById(learnerId);
    if (!learner) throw new Error('Learner not found');

    // Find teachers offering the required skill
    const potentialTeachers = await User.find({
      role: { $in: ['teacher', 'both'] },
      'skills_offered.name': skillWanted,
      _id: { $ne: learner._id }
    });

    const matches = potentialTeachers.map(teacher => {
      // 1. Skill Match Score (Simplified: exact match = 1.0)
      const exactSkillMatch = teacher.skills_offered.some(s => s.name === skillWanted) ? 1.0 : 0.0;
      
      // 2. Rating Score
      const ratingScore = teacher.rating / 5.0;

      // 3. Availability Score (Simplified for demo)
      // Real app compares schedule arrays
      const availabilityScore = 0.8; 

      // 4. Language Score
      const languageScore = (teacher.language_preference === learner.language_preference) ? 1.0 : 0.0;

      const totalScore = (0.4 * exactSkillMatch) + (0.2 * ratingScore) + (0.2 * availabilityScore) + (0.2 * languageScore);

      return {
        teacher,
        score: totalScore
      };
    });

    // Sort descending by score
    matches.sort((a, b) => b.score - a.score);

    return matches.slice(0, 10);
  } catch (error) {
    throw error;
  }
};

exports.getAiExplanation = async (learnerId, teacherId) => {
  // Stub for OpenAI API call
  return "This teacher has great ratings and speaks your language perfectly.";
};
