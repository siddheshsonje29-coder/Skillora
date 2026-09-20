const StudyGroup = require('../models/StudyGroup');

exports.createGroup = async (req, res) => {
  try {
    const { name, topic, description, maxMembers } = req.body;
    const group = new StudyGroup({
      name,
      topic,
      description,
      maxMembers,
      creator: req.user.id,
      members: [req.user.id]
    });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error creating study group', error: error.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await StudyGroup.find().populate('creator', 'name').lean();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching study groups', error: error.message });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await StudyGroup.findById(id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (group.members.includes(req.user.id)) return res.status(400).json({ message: 'Already a member' });
    if (group.members.length >= group.maxMembers) return res.status(400).json({ message: 'Group is full' });

    group.members.push(req.user.id);
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error joining group', error: error.message });
  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await StudyGroup.findById(id);
    group.members = group.members.filter(m => m.toString() !== req.user.id);
    await group.save();
    res.status(200).json({ message: 'Left group successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error leaving group', error: error.message });
  }
};
