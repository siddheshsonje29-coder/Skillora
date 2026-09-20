const User = require('../models/User');
const CreditTransaction = require('../models/CreditTransaction');

/**
 * Calculates dynamic credit value of a skill based on demand and difficulty
 */
exports.getDynamicSkillValue = (skillName) => {
  // Stub for basic calculation logic
  const baseRates = {
    'Python': 10,
    'React': 12,
    'Guitar': 7,
    'Mandarin': 15
  };
  
  const baseValue = baseRates[skillName] || 10;
  // Assume mock demand multiplier = 1.2
  const demandMultiplier = 1.2;
  return Math.round(baseValue * demandMultiplier);
};

exports.transferCredits = async (fromUserId, toUserId, amount, type, description, sessionId) => {
  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (fromUser.credits < amount) {
      throw new Error('Insufficient credits');
    }

    fromUser.credits -= amount;
    fromUser.credits_spent += amount;
    toUser.credits += amount;
    toUser.credits_earned += amount;

    await fromUser.save();
    await toUser.save();

    const transaction = new CreditTransaction({
      from_user: fromUserId,
      to_user: toUserId,
      amount,
      type,
      description,
      session_id: sessionId
    });

    await transaction.save();
    return true;
  } catch (error) {
    throw error;
  }
};
