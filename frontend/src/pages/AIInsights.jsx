import { useState, useEffect } from 'react';
import { aiAPI } from '../services/api';

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const data = await aiAPI.getInsights();
      setInsights(data);
    } catch (error) {
      console.error('Error loading AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner" /><p>Loading AI insights...</p></div>;
  }

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>AI Insights</h1>
          <p>Personalized recommendations based on your study patterns</p>
        </div>

        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-header">
              <span className="insight-icon">📊</span>
              <h3 className="insight-title">Weekly Summary</h3>
            </div>
            <p className="insight-text">{insights?.weeklySummary || 'No summary available'}</p>
          </div>

          <div className="insight-card success">
            <div className="insight-header">
              <span className="insight-icon">💪</span>
              <h3 className="insight-title">Strengths</h3>
            </div>
            <ul className="insight-list">
              {insights?.strengths?.map((strength, index) => (
                <li key={index}>{strength}</li>
              )) || <li>No strengths identified</li>}
            </ul>
          </div>

          <div className="insight-card warning">
            <div className="insight-header">
              <span className="insight-icon">⚠️</span>
              <h3 className="insight-title">Areas to Improve</h3>
            </div>
            <ul className="insight-list">
              {insights?.weakAreas?.map((area, index) => (
                <li key={index}>{area}</li>
              )) || <li>No areas identified</li>}
            </ul>
          </div>

          <div className="insight-card">
            <div className="insight-header">
              <span className="insight-icon">📈</span>
              <h3 className="insight-title">Productivity Pattern</h3>
            </div>
            <p className="insight-text">{insights?.productivityPattern || 'No pattern data available'}</p>
          </div>

          <div className="insight-card info full-width">
            <div className="insight-header">
              <span className="insight-icon">🎯</span>
              <h3 className="insight-title">Personalized Recommendations</h3>
            </div>
            <ul className="insight-list">
              {insights?.recommendations?.map((rec, index) => (
                <li key={index}>{rec}</li>
              )) || <li>No recommendations available</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
