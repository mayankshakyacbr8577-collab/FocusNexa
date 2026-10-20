import { useState, useEffect } from 'react';
import { weeklyReportAPI } from '../services/api';

const WeeklyReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await weeklyReportAPI.get();
      setReport(data);
    } catch (error) {
      console.error('Error loading weekly report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner" /><p>Loading weekly report...</p></div>;
  }

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Weekly Report</h1>
          <p>Compare your performance week over week</p>
        </div>

        <div className="weekly-comparison">
          <div className="comparison-card">
            <h3 className="comparison-title">Last Week</h3>
            <div className="comparison-stats">
              <div className="comparison-stat">
                <span className="stat-label">Study Time</span>
                <span className="stat-value">{report?.lastWeek?.studyTime || '0h'}</span>
              </div>
              <div className="comparison-stat">
                <span className="stat-label">Sessions</span>
                <span className="stat-value">{report?.lastWeek?.sessions || 0}</span>
              </div>
              <div className="comparison-stat">
                <span className="stat-label">Goals</span>
                <span className="stat-value">{report?.lastWeek?.goals || 0}</span>
              </div>
              <div className="comparison-stat">
                <span className="stat-label">Focus Score</span>
                <span className="stat-value">{report?.lastWeek?.focusScore || 0}</span>
              </div>
            </div>
          </div>

          <div className="comparison-divider">VS</div>

          <div className="comparison-card highlight">
            <h3 className="comparison-title">This Week</h3>
            <div className="comparison-stats">
              <div className="comparison-stat">
                <span className="stat-label">Study Time</span>
                <span className="stat-value">{report?.thisWeek?.studyTime || '0h'}</span>
              </div>
              <div className="comparison-stat">
                <span className="stat-label">Sessions</span>
                <span className="stat-value">{report?.thisWeek?.sessions || 0}</span>
              </div>
              <div className="comparison-stat">
                <span className="stat-label">Goals</span>
                <span className="stat-value">{report?.thisWeek?.goals || 0}</span>
              </div>
              <div className="comparison-stat">
                <span className="stat-label">Focus Score</span>
                <span className="stat-value">{report?.thisWeek?.focusScore || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="changes-grid">
          <div className="change-card">
            <span className="change-label">Study Time</span>
            <span className={`change-value ${report?.changes?.studyTime >= 0 ? 'positive' : 'negative'}`}>
              {report?.changes?.studyTime >= 0 ? '↑' : '↓'} {Math.abs(report?.changes?.studyTime || 0)}%
            </span>
          </div>
          <div className="change-card">
            <span className="change-label">Sessions</span>
            <span className={`change-value ${report?.changes?.sessions >= 0 ? 'positive' : 'negative'}`}>
              {report?.changes?.sessions >= 0 ? '↑' : '↓'} {Math.abs(report?.changes?.sessions || 0)}%
            </span>
          </div>
          <div className="change-card">
            <span className="change-label">Goals</span>
            <span className={`change-value ${report?.changes?.goals >= 0 ? 'positive' : 'negative'}`}>
              {report?.changes?.goals >= 0 ? '↑' : '↓'} {Math.abs(report?.changes?.goals || 0)}%
            </span>
          </div>
          <div className="change-card">
            <span className="change-label">Focus Score</span>
            <span className={`change-value ${report?.changes?.focusScore >= 0 ? 'positive' : 'negative'}`}>
              {report?.changes?.focusScore >= 0 ? '↑' : '↓'} {Math.abs(report?.changes?.focusScore || 0)}%
            </span>
          </div>
        </div>

        <div className="ai-summary-card">
          <div className="ai-summary-header">
            <span className="ai-icon">🤖</span>
            <h3 className="ai-summary-title">AI-Generated Summary</h3>
          </div>
          <p className="ai-summary-text">{report?.summary || 'No summary available'}</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;
