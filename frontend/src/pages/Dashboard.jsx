import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import { analyticsAPI, sessionAPI, goalAPI } from '../services/api';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const [todayGoals, setTodayGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [analyticsData, sessionsData, goalsData] = await Promise.all([
        analyticsAPI.get(),
        sessionAPI.getAll(),
        goalAPI.getAll(),
      ]);

      setAnalytics(analyticsData);
      setRecentSessions(sessionsData.slice(0, 5));
      setTodayGoals(goalsData.filter((g) => !g.completed).slice(0, 3));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  if (loading) {
    return (
      <div className="page-layout">
        <div className="page-content">
          <div className="loading-container">
            <div className="spinner" />
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your study overview.</p>
        </div>

        <div className="dashboard-stats">
          <StatCard
            title="Today's Study"
            value="3h 25m"
            icon="⏱️"
            trend={12}
            color="primary"
          />
          <StatCard
            title="Weekly Study"
            value="18h 40m"
            icon="📅"
            trend={8}
            color="success"
          />
          <StatCard
            title="Sessions"
            value={analytics?.totalSessions || 0}
            icon="🎯"
            trend={15}
            color="warning"
          />
          <StatCard
            title="Goals"
            value={`${analytics?.goalCompletionPercentage || 0}%`}
            subtitle="Completion"
            icon="✅"
            color="success"
          />
          <StatCard
            title="Focus Score"
            value={`${analytics?.focusScore || 0}/100`}
            icon="🎯"
            trend={5}
            color="primary"
          />
        </div>

        <div className="dashboard-charts">
          <div className="dashboard-chart">
            <ChartCard title="Daily Study Hours">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.dailyStudyHours?.map((h, i) => ({ name: `Day ${i + 1}`, hours: h })) || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="dashboard-chart">
            <ChartCard title="Weekly Progress">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.weeklyStudyHours?.map((h, i) => ({ name: `Week ${i + 1}`, hours: h })) || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="dashboard-chart">
            <ChartCard title="Topic Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics?.topicDistribution || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(analytics?.topicDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="dashboard-chart">
            <ChartCard title="Goal Completion">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.goalCompletion || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="total" fill="#e2e8f0" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <h2 className="section-title">Recent Study Sessions</h2>
            <div className="session-list">
              {recentSessions.length > 0 ? (
                recentSessions.map((session) => (
                  <div key={session._id} className="session-item">
                    <div className="session-info">
                      <span className="session-topic">{session.topic}</span>
                      {session.subtopic && (
                        <span className="session-subtopic">→ {session.subtopic}</span>
                      )}
                    </div>
                    <div className="session-meta">
                      <span className="session-duration">{session.duration}m</span>
                      <span className="session-date">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-secondary">No recent sessions</p>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <h2 className="section-title">Today's Goals</h2>
            <div className="goal-list">
              {todayGoals.length > 0 ? (
                todayGoals.map((goal) => (
                  <div key={goal._id} className="goal-item">
                    <div className="goal-info">
                      <span className="goal-title">{goal.title}</span>
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-success"
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="goal-percentage">
                      {Math.round((goal.progress / goal.target) * 100)}%
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-secondary">No active goals</p>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <h2 className="section-title">AI Quick Insight</h2>
            <div className="ai-insight-card">
              <div className="ai-icon">🤖</div>
              <p className="ai-insight-text">
                You are spending more time on React than backend technologies.
                Consider adding more Node.js sessions this week to balance your
                learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
