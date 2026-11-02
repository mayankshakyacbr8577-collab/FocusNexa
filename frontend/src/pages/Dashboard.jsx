import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import ExtensionCTA from '../components/ExtensionCTA';
import { analyticsAPI, sessionAPI, goalAPI } from '../services/api';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const [todayGoals, setTodayGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDashboardData = async () => {
      try {
        const [analyticsData, sessionsData, goalsData] = await Promise.all([
          analyticsAPI.get(),
          sessionAPI.getAll(),
          goalAPI.getAll(),
        ]);

        if (isMounted) {
          setAnalytics(analyticsData);
          setRecentSessions(sessionsData.slice(0, 5));
          setTodayGoals(goalsData.filter((g) => !g.completed).slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

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
        <div className="page-header-modern">
          <div>
            <h1 className="page-title-modern">Dashboard</h1>
            <p className="page-subtitle-modern">Welcome back! Here's your study overview.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">Quick Start</button>
          </div>
        </div>

        <div className="dashboard-stats-modern">
          <StatCard
            title="Today's Study"
            value={analytics?.todayStudyTime || '0h 0m'}
            icon="⏱️"
            trend={analytics?.todayTrend}
            color="primary"
          />
          <StatCard
            title="Weekly Study"
            value={analytics?.weeklyStudyTime || '0h 0m'}
            icon="📅"
            trend={analytics?.weeklyTrend}
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

        <div className="dashboard-charts-modern">
          <div className="dashboard-chart-large">
            <ChartCard title="Weekly Study Progress">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={analytics?.weeklyStudyHours?.map((h, i) => ({ name: `Week ${i + 1}`, hours: h })) || []}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="dashboard-chart-modern">
            <ChartCard title="Topic Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics?.topicDistribution || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
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

          <div className="dashboard-chart-modern">
            <ChartCard title="Daily Study Hours">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.dailyStudyHours?.map((h, i) => ({ name: `Day ${i + 1}`, hours: h })) || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="dashboard-chart-modern">
            <ChartCard title="Goal Completion">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.goalCompletion || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="total" fill="#e2e8f0" name="Total" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <div className="dashboard-grid-modern">
          <div className="dashboard-section-modern">
            <div className="section-header-modern">
              <h2 className="section-title-modern">Recent Study Sessions</h2>
              <Link to="/sessions" className="view-all-link">View All</Link>
            </div>
            <div className="session-list-modern">
              {recentSessions.length > 0 ? (
                recentSessions.map((session) => (
                  <div key={session._id} className="session-item-modern">
                    <div className="session-icon">📚</div>
                    <div className="session-info-modern">
                      <span className="session-topic-modern">{session.topic}</span>
                      {session.subtopic && (
                        <span className="session-subtopic-modern">→ {session.subtopic}</span>
                      )}
                    </div>
                    <div className="session-meta-modern">
                      <span className="session-duration-modern">{session.duration}m</span>
                      <span className="session-date-modern">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state-modern">
                  <span className="empty-icon">📖</span>
                  <p className="empty-text">No recent sessions</p>
                  <Link to="/sessions" className="empty-action">Start Studying</Link>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-section-modern">
            <div className="section-header-modern">
              <h2 className="section-title-modern">Today's Goals</h2>
              <Link to="/goals" className="view-all-link">View All</Link>
            </div>
            <div className="goal-list-modern">
              {todayGoals.length > 0 ? (
                todayGoals.map((goal) => (
                  <div key={goal._id} className="goal-item-modern">
                    <div className="goal-info-modern">
                      <span className="goal-title-modern">{goal.title}</span>
                      <div className="progress-modern">
                        <div
                          className="progress-bar-modern progress-bar-success-modern"
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="goal-percentage-modern">
                      {Math.round((goal.progress / goal.target) * 100)}%
                    </span>
                  </div>
                ))
              ) : (
                <div className="empty-state-modern">
                  <span className="empty-icon">🎯</span>
                  <p className="empty-text">No active goals</p>
                  <Link to="/goals" className="empty-action">Set Goals</Link>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-section-modern">
            <div className="section-header-modern">
              <h2 className="section-title-modern">Productivity Boost</h2>
            </div>
            <ExtensionCTA variant="card" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
