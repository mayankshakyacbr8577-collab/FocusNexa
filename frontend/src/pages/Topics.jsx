import { useState, useEffect } from 'react';
import TopicCard from '../components/TopicCard';
import EmptyState from '../components/EmptyState';
import { topicAPI } from '../services/api';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subtopics: '',
  });
  const [loading, setLoading] = useState(true);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const reloadTopics = () => setRefreshIndex((i) => i + 1);

  useEffect(() => {
    let isMounted = true;
    const fetchTopics = async () => {
      try {
        const data = await topicAPI.getAll();
        if (isMounted) {
          setTopics(data);
        }
      } catch (error) {
        console.error('Error loading topics:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTopics();

    return () => {
      isMounted = false;
    };
  }, [refreshIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subtopicsArray = formData.subtopics.split(',').map((s) => s.trim()).filter(Boolean);

    try {
      if (editingTopic) {
        await topicAPI.update(editingTopic._id, {
          ...formData,
          subtopics: subtopicsArray,
        });
      } else {
        await topicAPI.create({
          ...formData,
          subtopics: subtopicsArray,
        });
      }
      setShowForm(false);
      setEditingTopic(null);
      setFormData({ name: '', subtopics: '' });
      reloadTopics();
    } catch (error) {
      console.error('Error saving topic:', error);
    }
  };

  const handleEdit = (id) => {
    const topic = topics.find((t) => t._id === id);
    if (topic) {
      setEditingTopic(topic);
      setFormData({
        name: topic.name,
        subtopics: topic.subtopics.join(', '),
      });
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      try {
        await topicAPI.delete(id);
        reloadTopics();
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    }
  };

  const handleAddSubtopic = (id) => {
    const subtopic = prompt('Enter subtopic name:');
    if (subtopic) {
      const topic = topics.find((t) => t._id === id);
      if (topic) {
        const updatedSubtopics = [...topic.subtopics, subtopic];
        topicAPI.update(id, { subtopics: updatedSubtopics }).then(reloadTopics);
      }
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner" /><p>Loading topics...</p></div>;
  }

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Topics</h1>
          <p>Organize your learning by topics and subtopics</p>
        </div>

        <button className="btn btn-primary mb-lg" onClick={() => setShowForm(true)}>
          Add New Topic
        </button>

        {showForm && (
          <div className="card mb-lg">
            <div className="card-header">
              <h3 className="card-title">
                {editingTopic ? 'Edit Topic' : 'Add New Topic'}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Topic Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., React"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subtopics (comma-separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Components, Props, Hooks"
                    value={formData.subtopics}
                    onChange={(e) => setFormData({ ...formData, subtopics: e.target.value })}
                  />
                </div>
                <div className="flex gap-md">
                  <button type="submit" className="btn btn-primary">
                    {editingTopic ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTopic(null);
                      setFormData({ name: '', subtopics: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="topics-grid">
          {topics.length > 0 ? (
            topics.map((topic) => (
              <TopicCard
                key={topic._id}
                topic={topic}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddSubtopic={handleAddSubtopic}
              />
            ))
          ) : (
            <EmptyState
              icon="📚"
              title="No Topics Yet"
              description="Create your first topic to start organizing your learning"
              action={() => setShowForm(true)}
              actionText="Add Topic"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Topics;
