import mongoose from 'mongoose';

const studySessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: String,
      required: [true, 'Please add a topic'],
      trim: true,
    },
    subtopic: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Please add duration in minutes'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    goal: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudySession = mongoose.model('StudySession', studySessionSchema);

export default StudySession;
