import { useState, useEffect } from 'react';
import StudyTimer from '../components/StudyTimer';
import SessionCard from '../components/SessionCard';
import EmptyState from '../components/EmptyState';
import { sessionAPI, topicAPI } from '../services/api';

const StudySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [showTimer, setShowTimer] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [editFormData, setEditFormData] = useState({
    topic: '',
    subtopic: '',
    duration: 60,
    goal: '',
  });
  const [newSession, setNewSession] = useState({
    topic: '',
    subtopic: '',
    duration: 60,
    goal: '',
  });
  const [loading, setLoading] = useState(true);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const reloadSessions = () => setRefreshIndex((i) => i + 1);

  useEffect(() => {
    let isMounted = true;
    const fetchSessionData = async () => {
      try {
        const [sessionsData, topicsData] = await Promise.all([
          sessionAPI.getAll(),
          topicAPI.getAll(),
        ]);
        if (isMounted) {
          setSessions(sessionsData);
          setTopics(topicsData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSessionData();

    return () => {
      isMounted = false;
    };
  }, [refreshIndex]);

  const handleStartSession = () => {
    setShowTimer(true);
  };

  const handleSessionComplete = async (elapsedSeconds) => {
    const duration = Math.floor(elapsedSeconds / 60);
    const sessionData = {
      topic: newSession.topic,
      subtopic: newSession.subtopic,
      duration,
      goal: newSession.goal,
    };

    try {
      await sessionAPI.create(sessionData);
      setShowTimer(false);
      setNewSession({ topic: '', subtopic: '', duration: 60, goal: '' });
      reloadSessions();
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const handleDeleteSession = async (id) => {
    if (window.confirm('Are you sure you want to delete this study session?')) {
      try {
        await sessionAPI.delete(id);
        reloadSessions();
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const handleEditSession = (id) => {
    const session = sessions.find((s) => s._id === id);
    if (session) {
      setEditingSession(session);
      setEditFormData({
        topic: session.topic || '',
        subtopic: session.subtopic || '',
        duration: session.duration || 60,
        goal: session.goal || '',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateSession = async (e) => {
    e.preventDefault();
    if (!editingSession) return;

    try {
      await sessionAPI.update(editingSession._id, editFormData);
      setEditingSession(null);
      reloadSessions();
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingSession(null);
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner" /><p>Loading sessions...</p></div>;
  }

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Study Sessions</h1>
          <p>Track and manage your focused study sessions</p>
        </div>

        {!showTimer ? (
          <>
            {editingSession ? (
              <div className="card mb-lg">
                <div className="card-header">
                  <h3 className="card-title">Edit Study Session</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleUpdateSession}>
                    <div className="form-group">
                      <label className="form-label">Topic</label>
                      <select
                        className="form-control form-select"
                        value={editFormData.topic}
                        onChange={(e) => setEditFormData({ ...editFormData, topic: e.target.value })}
                        required
                      >
                        <option value="">Select topic</option>
                        {topics.map((topic) => (
                          <option key={topic._id} value={topic.name}>
                            {topic.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subtopic</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., useEffect, useState"
                        value={editFormData.subtopic}
                        onChange={(e) => setEditFormData({ ...editFormData, subtopic: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration (minutes)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={editFormData.duration}
                        onChange={(e) => setEditFormData({ ...editFormData, duration: parseInt(e.target.value) || 0 })}
                        min="1"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Study Goal</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Complete useEffect concepts"
                        value={editFormData.goal}
                        onChange={(e) => setEditFormData({ ...editFormData, goal: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-md">
                      <button type="submit" className="btn btn-primary">
                        Update Session
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="card mb-lg">
                <div className="card-header">
                  <h3 className="card-title">Start New Session</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Topic</label>
                    <select
                      className="form-control form-select"
                      value={newSession.topic}
                      onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
                    >
                      <option value="">Select topic</option>
                      {topics.map((topic) => (
                        <option key={topic._id} value={topic.name}>
                          {topic.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subtopic</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., useEffect, useState"
                      value={newSession.subtopic}
                      onChange={(e) => setNewSession({ ...newSession, subtopic: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration (minutes)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) || 0 })}
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Study Goal</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Complete useEffect concepts"
                      value={newSession.goal}
                      onChange={(e) => setNewSession({ ...newSession, goal: e.target.value })}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleStartSession}>
                    Start Session
                  </button>
                </div>
              </div>
            )}

            <div className="session-grid">
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <SessionCard
                    key={session._id}
                    session={session}
                    onEdit={handleEditSession}
                    onDelete={handleDeleteSession}
                  />
                ))
              ) : (
                <EmptyState
                  icon="⏱️"
                  title="No Study Sessions Yet"
                  description="Start your first study session to track your progress"
                  action={handleStartSession}
                  actionText="Start Session"
                />
              )}
            </div>
          </>
        ) : (
          <div className="timer-container">
            <StudyTimer
              initialDuration={newSession.duration}
              onComplete={handleSessionComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySessions;
