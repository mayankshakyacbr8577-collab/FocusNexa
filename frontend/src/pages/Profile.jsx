import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    learningGoals: '',
    preferredDuration: 60,
    preferredTopics: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        learningGoals: user.learningGoals || '',
        preferredDuration: user.preferredDuration || 60,
        preferredTopics: user.preferredTopics?.join(', ') || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const updatedData = {
        ...formData,
        preferredTopics: formData.preferredTopics.split(',').map((t) => t.trim()).filter(Boolean),
      };

      await userAPI.updateProfile(updatedData);
      updateProfile(updatedData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-large">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h2 className="profile-name">{user?.name || 'User'}</h2>
              <p className="profile-email">{user?.email || ''}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Edit Profile</h3>
            </div>
            <div className="card-body">
              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Learning Goals</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Master MERN Stack"
                    value={formData.learningGoals}
                    onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Study Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.preferredDuration}
                    onChange={(e) => setFormData({ ...formData, preferredDuration: parseInt(e.target.value) })}
                    min="15"
                    max="180"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Topics (comma-separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., React, Node.js, MongoDB"
                    value={formData.preferredTopics}
                    onChange={(e) => setFormData({ ...formData, preferredTopics: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
