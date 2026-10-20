import User from '../models/User.js';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, learningGoals, preferredDuration, preferredTopics } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (learningGoals !== undefined) user.learningGoals = learningGoals;
    if (preferredDuration !== undefined) user.preferredDuration = preferredDuration;
    if (preferredTopics !== undefined) user.preferredTopics = preferredTopics;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      learningGoals: user.learningGoals,
      preferredDuration: user.preferredDuration,
      preferredTopics: user.preferredTopics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
