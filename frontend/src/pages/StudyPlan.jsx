import { useState } from 'react';
import { aiAPI } from '../services/api';

const StudyPlan = () => {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!goal.trim()) return;

    setLoading(true);
    try {
      const data = await aiAPI.generateStudyPlan(goal);
      setPlan(data);
      setGenerated(true);
    } catch (error) {
      console.error('Error generating study plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Smart Study Plan</h1>
          <p>Generate a personalized study plan with AI</p>
        </div>

        <div className="card mb-lg">
          <div className="card-header">
            <h3 className="card-title">Generate Your Study Plan</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">What do you want to learn?</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Learn MERN in 30 days"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={loading || !goal.trim()}
            >
              {loading ? 'Generating...' : 'Generate Plan'}
            </button>
          </div>
        </div>

        {generated && plan && (
          <div className="study-plan-container">
            <h2 className="plan-title">{plan.goal}</h2>

            {plan.weeks?.map((week, weekIndex) => (
              <div key={weekIndex} className="week-card">
                <div className="week-header">
                  <h3 className="week-title">Week {week.week}: {week.topic}</h3>
                </div>
                <div className="week-body">
                  {week.days?.map((day, dayIndex) => (
                    <div key={dayIndex} className="day-item">
                      <div className="day-header">
                        <span className="day-number">Day {day.day}</span>
                        <span className="day-time">{day.time} min</span>
                      </div>
                      <div className="day-content">
                        <span className="day-topic">{day.topic}</span>
                        <span className="day-subtopic">{day.subtopic}</span>
                        <span className="day-task">{day.task}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlan;
