import Topic from '../models/Topic.js';

// @desc    Get all topics for logged in user
// @route   GET /api/topics
// @access  Private
export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ user: req.user._id }).sort('-createdAt');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new topic
// @route   POST /api/topics
// @access  Private
export const createTopic = async (req, res) => {
  try {
    const { name, subtopics } = req.body;

    const topic = await Topic.create({
      user: req.user._id,
      name,
      subtopics: subtopics || [],
    });

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update topic
// @route   PUT /api/topics/:id
// @access  Private
export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    if (topic.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete topic
// @route   DELETE /api/topics/:id
// @access  Private
export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    if (topic.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await topic.deleteOne();
    res.json({ message: 'Topic removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
