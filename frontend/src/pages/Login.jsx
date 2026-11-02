import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);
      login(response, response.token);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-modern">
      <div className="auth-left">
        <div className="auth-brand-large">
          <span className="brand-icon-large">🎯</span>
          <span className="brand-text-large">FocusNexa</span>
        </div>
        <div className="auth-visual">
          <div className="auth-visual-card">
            <div className="auth-visual-stat">
              <span className="auth-visual-number">2.5h</span>
              <span className="auth-visual-label">Today's Study</span>
            </div>
            <div className="auth-visual-progress">
              <div className="auth-visual-bar" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="auth-visual-card">
            <div className="auth-visual-stat">
              <span className="auth-visual-number">85%</span>
              <span className="auth-visual-label">Goal Progress</span>
            </div>
            <div className="auth-visual-progress">
              <div className="auth-visual-bar" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
        <p className="auth-tagline">Track your progress, achieve your goals</p>
      </div>

      <div className="auth-right">
        <div className="auth-container-modern">
          <div className="auth-header-modern">
            <h1 className="auth-title-modern">Welcome Back</h1>
            <p className="auth-subtitle-modern">Sign in to continue your learning journey</p>
          </div>

          <form className="auth-form-modern" onSubmit={handleSubmit}>
            {error && <div className="alert alert-error-modern">{error}</div>}

            <div className="form-group-modern">
              <label className="form-label-modern" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control-modern"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control-modern"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-options-modern">
              <label className="form-checkbox-modern">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary-modern btn-block-modern" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="auth-divider-modern">
              <span>or</span>
            </div>

            <div className="auth-footer-modern">
              <p>
                Don't have an account? <Link to="/register" className="auth-link-modern">Sign up free</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
