import { useState, useEffect } from 'react';
import GoalCard from '../components/GoalCard';
import EmptyState from '../components/EmptyState';
import { goalAPI } from '../services/api';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    target: 10,
    progress: 0,
    deadline: '',
  });
  const [loading, setLoading] = useState(true);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const reloadGoals = () => setRefreshIndex((i) => i + 1);

  useEffect(() => {
    let isMounted = true;
    const fetchGoals = async () => {
      try {
        const data = await goalAPI.getAll();
        if (isMounted) {
          setGoals(data);
        }
      } catch (error) {
        console.error('Error loading goals:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGoals();

    return () => {
      isMounted = false;
    };
  }, [refreshIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingGoal) {
        await goalAPI.update(editingGoal._id, formData);
      } else {
        await goalAPI.create(formData);
      }
      setShowForm(false);
      setEditingGoal(null);
      setFormData({ title: '', target: 10, progress: 0, deadline: '' });
      reloadGoals();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const handleEdit = (id) => {
    const goal = goals.find((g) => g._id === id);
    if (goal) {
      setEditingGoal(goal);
      setFormData({
        title: goal.title,
        target: goal.target,
        progress: goal.progress,
        deadline: goal.deadline || '',
      });
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await goalAPI.delete(id);
        reloadGoals();
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      await goalAPI.update(id, { completed: true });
      reloadGoals();
    } catch (error) {
      console.error('Error completing goal:', error);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner" /><p>Loading goals...</p></div>;
  }

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Goals</h1>
          <p>Set and track your study goals</p>
        </div>

        <button className="btn btn-primary mb-lg" onClick={() => setShowForm(true)}>
          Add New Goal
        </button>

        {showForm && (
          <div className="card mb-lg">
            <div className="card-header">
              <h3 className="card-title">
                {editingGoal ? 'Edit Goal' : 'Add New Goal'}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Goal Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Complete React Hooks"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Hours</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g., 10"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) || 0 })}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Current Progress (hours)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g., 5"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
                <div className="flex gap-md">
                  <button type="submit" className="btn btn-primary">
                    {editingGoal ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setEditingGoal(null);
                      setFormData({ title: '', target: 10, progress: 0, deadline: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="goals-grid">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <GoalCard
                key={goal._id}
                goal={goal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            ))
          ) : (
            <EmptyState
              icon="🎯"
              title="No Goals Yet"
              description="Create your first goal to start tracking your progress"
              action={() => setShowForm(true)}
              actionText="Add Goal"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;
