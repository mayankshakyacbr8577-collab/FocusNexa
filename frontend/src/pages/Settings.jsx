import { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    emailNotifications: true,
    studyReminders: true,
    weeklyReports: true,
    autoStartTimer: false,
    soundEnabled: true,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('focusnexa_settings', JSON.stringify(settings));
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-header">
          <h1>Settings</h1>
          <p>Customize your FocusNexa experience</p>
        </div>

        {message && (
          <div className="alert alert-success mb-lg">{message}</div>
        )}

        <div className="settings-grid">
          <div className="settings-section">
            <h3 className="settings-title">Appearance</h3>
            <div className="settings-item">
              <label className="form-label">Theme</label>
              <select
                name="theme"
                className="form-control form-select"
                value={settings.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-title">Notifications</h3>
            <div className="settings-item">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />
                <span>Enable Notifications</span>
              </label>
            </div>
            <div className="settings-item">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                />
                <span>Email Notifications</span>
              </label>
            </div>
            <div className="settings-item">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="studyReminders"
                  checked={settings.studyReminders}
                  onChange={handleChange}
                />
                <span>Study Reminders</span>
              </label>
            </div>
            <div className="settings-item">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="weeklyReports"
                  checked={settings.weeklyReports}
                  onChange={handleChange}
                />
                <span>Weekly Reports</span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-title">Study Session</h3>
            <div className="settings-item">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="autoStartTimer"
                  checked={settings.autoStartTimer}
                  onChange={handleChange}
                />
                <span>Auto-start Timer</span>
              </label>
            </div>
            <div className="settings-item">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="soundEnabled"
                  checked={settings.soundEnabled}
                  onChange={handleChange}
                />
                <span>Sound Effects</span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-title">Account</h3>
            <div className="settings-item">
              <button className="btn btn-secondary">Change Password</button>
            </div>
            <div className="settings-item">
              <button className="btn btn-danger">Delete Account</button>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
