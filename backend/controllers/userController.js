const User = require('../models/User');
const Session = require('../models/Session');
const mongoose = require('mongoose');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const userIdStr = req.user.id.toString();
    const now = new Date();
    // Use UTC for all date calculations to match MongoDB/ISO strings
    const startOfTodayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    
    // Window of 10 days to be very safe
    const statsStartDate = new Date(startOfTodayUTC);
    statsStartDate.setDate(statsStartDate.getDate() - 10);

    const sessions = await Session.find({
      $or: [{ teacher_id: req.user.id }, { learner_id: req.user.id }],
      status: 'completed',
      updatedAt: { $gte: statsStartDate }
    });

    console.log(`[Stats DEBUG] User ${userIdStr}: Found ${sessions.length} completed sessions since ${statsStartDate.toISOString()}`);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const history = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date(startOfTodayUTC);
      d.setUTCDate(d.getUTCDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      history.push({
        name: days[d.getUTCDay()],
        date: dateStr,
        earned: 0,
        spent: 0
      });
    }

    sessions.forEach(session => {
      const dateStr = session.updatedAt.toISOString().split('T')[0];
      const dayData = history.find(h => h.date === dateStr);
      
      const teacherIdStr = session.teacher_id.toString();
      const learnerIdStr = session.learner_id.toString();

      if (dayData) {
        if (teacherIdStr === userIdStr) {
          dayData.earned += (session.credit_cost || 0);
          console.log(`[Stats DEBUG] Match: Earned ${session.credit_cost} on ${dateStr}`);
        } else if (learnerIdStr === userIdStr) {
          dayData.spent += (session.credit_cost || 0);
          console.log(`[Stats DEBUG] Match: Spent ${session.credit_cost} on ${dateStr}`);
        }
      } else {
        console.log(`[Stats DEBUG] No date match for ${dateStr} in history window`);
      }
    });

    res.status(200).json({
      creditHistory: history,
      totalEarned: req.user.credits_earned || 0,
      totalSpent: req.user.credits_spent || 0,
      sessionsCompleted: req.user.sessions_completed || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({ is_banned: false })
      .select('name college credits trust_score sessions_taught avatar')
      .sort({ credits: -1 })
      .limit(10);
    res.status(200).json(topUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

