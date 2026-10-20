import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a topic name'],
      trim: true,
    },
    subtopics: {
      type: [String],
      default: [],
    },
    totalTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
