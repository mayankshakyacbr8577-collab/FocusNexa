import StudySession from '../models/StudySession.js';
import Goal from '../models/Goal.js';

// @desc    Get weekly report
// @route   GET /api/weekly-report
// @access  Private
export const getWeeklyReport = async (req, res) => {
  try {
    const userId = req.user._id;

    // Calculate dates for last week and this week
    const today = new Date();
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const lastWeekEnd = new Date(thisWeekStart);
    lastWeekEnd.setMilliseconds(lastWeekEnd.getMilliseconds() - 1);

    // Get sessions for both weeks
    const sessions = await StudySession.find({ user: userId });

    const lastWeekSessions = sessions.filter(
      (s) => new Date(s.date) >= lastWeekStart && new Date(s.date) <= lastWeekEnd
    );
    const thisWeekSessions = sessions.filter(
      (s) => new Date(s.date) >= thisWeekStart
    );

    // Calculate stats
    const lastWeekStudyTime = lastWeekSessions.reduce((acc, s) => acc + s.duration, 0);
    const thisWeekStudyTime = thisWeekSessions.reduce((acc, s) => acc + s.duration, 0);

    const lastWeekHours = `${Math.floor(lastWeekStudyTime / 60)}h ${lastWeekStudyTime % 60}m`;
    const thisWeekHours = `${Math.floor(thisWeekStudyTime / 60)}h ${thisWeekStudyTime % 60}m`;

    // Get goals
    const goals = await Goal.find({ user: userId });

    // Calculate focus scores (simplified)
    const calculateFocusScore = (weekSessions) => {
      if (weekSessions.length === 0) return 0;
      const totalMinutes = weekSessions.reduce((acc, s) => acc + s.duration, 0);
      const avgSessionLength = totalMinutes / weekSessions.length;
      return Math.min(100, Math.round(avgSessionLength * 0.5 + weekSessions.length * 5));
    };

    const lastWeekFocusScore = calculateFocusScore(lastWeekSessions);
    const thisWeekFocusScore = calculateFocusScore(thisWeekSessions);

    // Calculate percentage changes
    const calculateChange = (oldValue, newValue) => {
      if (oldValue === 0) return newValue > 0 ? 100 : 0;
      return Math.round(((newValue - oldValue) / oldValue) * 100);
    };

    const changes = {
      studyTime: calculateChange(lastWeekStudyTime, thisWeekStudyTime),
      sessions: calculateChange(lastWeekSessions.length, thisWeekSessions.length),
      goals: calculateChange(
        goals.filter((g) => new Date(g.createdAt) >= lastWeekStart && new Date(g.createdAt) <= lastWeekEnd).length,
        goals.filter((g) => new Date(g.createdAt) >= thisWeekStart).length
      ),
      focusScore: calculateChange(lastWeekFocusScore, thisWeekFocusScore),
    };

    const summary = `Your study time ${changes.studyTime >= 0 ? 'increased' : 'decreased'} by ${Math.abs(changes.studyTime)}% this week. ${thisWeekSessions.length > 0 ? `You completed ${thisWeekSessions.length} sessions.` : ''} ${changes.focusScore >= 0 ? 'Your focus score improved!' : 'Try to maintain longer sessions.'}`;

    res.json({
      lastWeek: {
        studyTime: lastWeekHours || '0h 0m',
        sessions: lastWeekSessions.length,
        goals: goals.filter((g) => new Date(g.createdAt) >= lastWeekStart && new Date(g.createdAt) <= lastWeekEnd).length,
        focusScore: lastWeekFocusScore,
      },
      thisWeek: {
        studyTime: thisWeekHours || '0h 0m',
        sessions: thisWeekSessions.length,
        goals: goals.filter((g) => new Date(g.createdAt) >= thisWeekStart).length,
        focusScore: thisWeekFocusScore,
      },
      changes,
      summary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
