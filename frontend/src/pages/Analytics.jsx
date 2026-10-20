import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '../components/ChartCard';
import { analyticsAPI } from '../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await analyticsAPI.get();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  if (loading) {
    return <div className="loading-container"><div className="spinner" /><p>Loading analytics...</p></div>;
  }

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Analytics</h1>
          <p>Detailed insights into your study patterns and performance</p>
        </div>

        <div className="analytics-stats">
          <div className="stat-item">
            <span className="stat-label">Total Study Time</span>
            <span className="stat-value">{analytics?.totalStudyTime || 0}h</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Daily Study</span>
            <span className="stat-value">{analytics?.averageDailyStudyTime || 0}h</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Sessions</span>
            <span className="stat-value">{analytics?.totalSessions || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Most Studied Topic</span>
            <span className="stat-value">{analytics?.mostStudiedTopic || 'N/A'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Goal Completion</span>
            <span className="stat-value">{analytics?.goalCompletionPercentage || 0}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Focus Score</span>
            <span className="stat-value">{analytics?.focusScore || 0}/100</span>
          </div>
        </div>

        <div className="analytics-charts">
          <div className="analytics-chart">
            <ChartCard title="Daily Study Hours (Last 7 Days)">
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

          <div className="analytics-chart">
            <ChartCard title="Weekly Study Hours">
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

          <div className="analytics-chart">
            <ChartCard title="Monthly Study Hours">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.monthlyStudyHours?.map((h, i) => ({ name: `Month ${i + 1}`, hours: h })) || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="analytics-chart">
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

          <div className="analytics-chart full-width">
            <ChartCard title="Goal Completion Over Time">
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
      </div>
    </div>
  );
};

export default Analytics;
