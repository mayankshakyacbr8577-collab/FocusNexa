import StudySession from '../models/StudySession.js';
import Goal from '../models/Goal.js';
import Topic from '../models/Topic.js';

// @desc    Get analytics for logged in user
// @route   GET /api/analytics
// @access  Private
export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all sessions
    const sessions = await StudySession.find({ user: userId });
    const totalStudyTime = sessions.reduce((acc, session) => acc + session.duration, 0);
    const totalSessions = sessions.length;

    // Calculate today's study time and comparison with yesterday
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todaySessions = sessions.filter((s) => {
      const d = new Date(s.date);
      return d >= todayStart && d <= todayEnd;
    });
    const todayStudyMinutes = todaySessions.reduce((acc, s) => acc + s.duration, 0);
    const todayStudyTime = `${Math.floor(todayStudyMinutes / 60)}h ${todayStudyMinutes % 60}m`;

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayStart);
    yesterdayEnd.setMilliseconds(yesterdayEnd.getMilliseconds() - 1);

    const yesterdaySessions = sessions.filter((s) => {
      const d = new Date(s.date);
      return d >= yesterdayStart && d <= yesterdayEnd;
    });
    const yesterdayMinutes = yesterdaySessions.reduce((acc, s) => acc + s.duration, 0);
    const todayTrend = yesterdayMinutes > 0
      ? Math.round(((todayStudyMinutes - yesterdayMinutes) / yesterdayMinutes) * 100)
      : (todayStudyMinutes > 0 ? 100 : 0);

    // Calculate this week's study time and comparison with last week
    const now = new Date();
    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(now.getDate() - now.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const thisWeekSessions = sessions.filter((s) => new Date(s.date) >= thisWeekStart);
    const thisWeekMinutes = thisWeekSessions.reduce((acc, s) => acc + s.duration, 0);
    const weeklyStudyTime = `${Math.floor(thisWeekMinutes / 60)}h ${thisWeekMinutes % 60}m`;

    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const lastWeekEnd = new Date(thisWeekStart);
    lastWeekEnd.setMilliseconds(lastWeekEnd.getMilliseconds() - 1);

    const lastWeekSessions = sessions.filter((s) => {
      const d = new Date(s.date);
      return d >= lastWeekStart && d <= lastWeekEnd;
    });
    const lastWeekMinutes = lastWeekSessions.reduce((acc, s) => acc + s.duration, 0);
    const weeklyTrend = lastWeekMinutes > 0
      ? Math.round(((thisWeekMinutes - lastWeekMinutes) / lastWeekMinutes) * 100)
      : (thisWeekMinutes > 0 ? 100 : 0);

    // Calculate average daily study time (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSessions = sessions.filter((s) => new Date(s.date) >= sevenDaysAgo);
    const averageDailyStudyTime = recentSessions.length > 0
      ? (recentSessions.reduce((acc, s) => acc + s.duration, 0) / 7).toFixed(1)
      : 0;

    // Get most studied topic
    const topicCounts = {};
    sessions.forEach((session) => {
      topicCounts[session.topic] = (topicCounts[session.topic] || 0) + session.duration;
    });
    const mostStudiedTopic = Object.keys(topicCounts).reduce((a, b) =>
      topicCounts[a] > topicCounts[b] ? a : b
    , '') || 'No data';

    // Calculate goal completion percentage
    const goals = await Goal.find({ user: userId });
    const completedGoals = goals.filter((g) => g.completed).length;
    const goalCompletionPercentage = goals.length > 0
      ? Math.round((completedGoals / goals.length) * 100)
      : 0;

    // Calculate focus score (simple formula)
    const focusScore = Math.min(100, Math.round(
      (totalStudyTime / 60) * 2 + // Time factor
      (totalSessions * 3) + // Consistency factor
      (goalCompletionPercentage * 0.3) // Goal factor
    ));

    // Daily study hours for last 7 days
    const dailyStudyHours = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const daySessions = sessions.filter(
        (s) => new Date(s.date).toDateString() === date.toDateString()
      );
      return daySessions.reduce((acc, s) => acc + s.duration / 60, 0);
    });

    // Weekly study hours
    const weeklyStudyHours = Array.from({ length: 6 }, (_, i) => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const weekSessions = sessions.filter(
        (s) => new Date(s.date) >= weekStart && new Date(s.date) <= weekEnd
      );
      return daySessionsReduce(weekSessions);
    });

    function daySessionsReduce(arr) {
      return arr.reduce((acc, s) => acc + s.duration / 60, 0);
    }

    // Monthly study hours (last 6 months)
    const monthlyStudyHours = Array.from({ length: 6 }, (_, i) => {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      const monthSessions = sessions.filter(
        (s) => new Date(s.date) >= monthStart && new Date(s.date) <= monthEnd
      );
      return monthSessions.reduce((acc, s) => acc + s.duration / 60, 0);
    });

    // Topic distribution
    const topicDistribution = Object.keys(topicCounts).map((topic) => ({
      name: topic,
      value: Math.round(topicCounts[topic] / 60),
    }));

    // Goal completion over time
    const goalCompletion = goals.map((goal) => ({
      name: goal.title.substring(0, 10),
      completed: goal.completed ? 1 : 0,
      total: 1,
    }));

    res.json({
      totalStudyTime: Math.round(totalStudyTime / 60),
      todayStudyTime,
      todayStudyMinutes,
      todayTrend,
      weeklyStudyTime,
      weeklyStudyMinutes,
      weeklyTrend,
      averageDailyStudyTime: parseFloat(averageDailyStudyTime),
      totalSessions,
      mostStudiedTopic,
      goalCompletionPercentage,
      focusScore,
      dailyStudyHours,
      weeklyStudyHours,
      monthlyStudyHours,
      topicDistribution,
      goalCompletion,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
