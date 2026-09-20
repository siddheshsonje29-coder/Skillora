const Session = require('../models/Session');
const User = require('../models/User');
const CreditTransaction = require('../models/CreditTransaction');

exports.createSession = async (req, res) => {
  try {
    const { teacher_id, skill, scheduled_at, credit_cost } = req.body;
    const learner_id = req.user.id;

    if (!teacher_id || !skill || !scheduled_at) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Fetch profiles
    const learner = await User.findById(learner_id);
    if (!learner) {
      return res.status(404).json({ message: 'Learner profile not found' });
    }

    const teacher = await User.findById(teacher_id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }

    const skillOffered = teacher.skills_offered.find(s => s.name === skill);
    const cost = skillOffered ? skillOffered.creditValue : (Number(credit_cost) || 20);

    if (learner.credits < cost) {
      return res.status(400).json({ message: `Insufficient credits. You need ${cost} but have ${learner.credits}.` });
    }

    const session = new Session({
      teacher_id,
      learner_id,
      skill,
      credit_cost: cost,
      scheduled_at: new Date(scheduled_at),
      status: 'pending'
    });

    await session.save();

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await Session.find({
      $or: [{ teacher_id: userId }, { learner_id: userId }]
    })
    .populate('teacher_id', 'name email avatar')
    .populate('learner_id', 'name email avatar')
    .sort({ scheduled_at: 1 });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateSessionStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const session = await Session.findById(req.params.id);
    
    if (!session) return res.status(404).json({ message: 'Session not found' });

    if (notes) session.notes = notes;

    // Handle credit transfer when session is completed
    if (status === 'completed' && session.status !== 'completed' && !session.credit_transferred) {
      const teacher = await User.findById(session.teacher_id);
      const learner = await User.findById(session.learner_id);
      
      if (!teacher || !learner) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (learner.credits < session.credit_cost) {
        return res.status(400).json({ message: 'Learner has insufficient credits to finalize this session' });
      }

      // Deduct from learner
      learner.credits -= session.credit_cost;
      learner.credits_spent = (learner.credits_spent || 0) + session.credit_cost;

      // Add to teacher
      teacher.credits += session.credit_cost;
      teacher.credits_earned = (teacher.credits_earned || 0) + session.credit_cost;

      // Increment session counts
      learner.sessions_completed += 1;
      teacher.sessions_taught += 1;
      teacher.sessions_completed += 1;

      // Create transaction records
      await CreditTransaction.create([
        {
          user_id: learner._id,
          to_user: teacher._id,
          amount: session.credit_cost,
          balance_after: learner.credits,
          type: 'spent',
          description: `Paid for session: ${session.skill}`,
          session_id: session._id
        },
        {
          user_id: teacher._id,
          from_user: learner._id,
          amount: session.credit_cost,
          balance_after: teacher.credits,
          type: 'earned',
          description: `Earned from session: ${session.skill}`,
          session_id: session._id
        }
      ]);

      await learner.save();
      await teacher.save();
      
      session.credit_transferred = true;
    }

    if (status === 'accepted' && !session.room_id) {
      session.room_id = `room-${session._id}-${Math.random().toString(36).substring(7)}`;
    }

    session.status = status;
    await session.save();

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
