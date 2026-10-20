import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="container">
          <nav className="landing-nav">
            <Link to="/" className="landing-brand">
              <span className="brand-icon">🎯</span>
              <span className="brand-text">FocusNexa</span>
            </Link>
            <div className="landing-actions">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Get Started Free
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge badge-primary">🚀 New: AI-Powered Study Plans</span>
            </div>
            <h1 className="hero-title">
              Focus Better. <span className="gradient-text">Learn Smarter.</span> Grow Faster.
            </h1>
            <p className="hero-subtitle">
              The ultimate AI-powered study platform for students. Plan your learning, track your progress, and achieve your goals with intelligent analytics and personalized insights.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-lg">
                Start Learning Free
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                Watch Demo
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Students</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">500K+</span>
                <span className="stat-label">Study Hours</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">4.9</span>
                <span className="stat-label">User Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="mockup-body">
                <div className="mockup-stats">
                  <div className="mockup-stat">
                    <span className="mockup-value">3h 25m</span>
                    <span className="mockup-label">Today</span>
                    <span className="mockup-trend positive">+12%</span>
                  </div>
                  <div className="mockup-stat">
                    <span className="mockup-value">18h 40m</span>
                    <span className="mockup-label">This Week</span>
                    <span className="mockup-trend positive">+8%</span>
                  </div>
                  <div className="mockup-stat">
                    <span className="mockup-value">82</span>
                    <span className="mockup-label">Focus Score</span>
                    <span className="mockup-trend positive">+5%</span>
                  </div>
                </div>
                <div className="mockup-chart">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Features</span>
            <h2 className="section-title">Everything You Need to Study Better</h2>
            <p className="section-subtitle">Powerful tools designed to help you learn more effectively and achieve your goals faster.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Smart Analytics</h3>
              <p className="feature-description">
                Track your study time, sessions, and progress with detailed analytics and beautiful visual charts.
              </p>
              <ul className="feature-list">
                <li>Real-time tracking</li>
                <li>Visual insights</li>
                <li>Progress reports</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Goal Management</h3>
              <p className="feature-description">
                Set study goals, track progress, and stay motivated with clear targets and deadlines.
              </p>
              <ul className="feature-list">
                <li>Custom goals</li>
                <li>Progress tracking</li>
                <li>Deadline reminders</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3 className="feature-title">Study Timer</h3>
              <p className="feature-description">
                Focus with dedicated study sessions, track time, and maintain consistent study habits.
              </p>
              <ul className="feature-list">
                <li>Pomodoro support</li>
                <li>Session history</li>
                <li>Break reminders</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Topic Tracking</h3>
              <p className="feature-description">
                Organize your learning by topics and subtopics, track time spent on each area.
              </p>
              <ul className="feature-list">
                <li>Topic hierarchy</li>
                <li>Time tracking</li>
                <li>Progress visualization</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI Insights</h3>
              <p className="feature-description">
                Get personalized recommendations and insights powered by AI to optimize your learning.
              </p>
              <ul className="feature-list">
                <li>Smart suggestions</li>
                <li>Pattern analysis</li>
                <li>Study plans</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Weekly Reports</h3>
              <p className="feature-description">
                Compare your weekly performance, identify patterns, and improve consistently.
              </p>
              <ul className="feature-list">
                <li>Week-over-week comparison</li>
                <li>Trend analysis</li>
                <li>Performance metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">How It Works</span>
            <h2 className="section-title">Start Learning in 4 Simple Steps</h2>
            <p className="section-subtitle">Get started in minutes and transform your study habits.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Plan Your Study</h3>
              <p className="step-description">
                Create topics, set goals, and organize your learning path.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Start Focused Sessions</h3>
              <p className="step-description">
                Use the study timer to track your focused learning sessions.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">Track Progress</h3>
              <p className="step-description">
                Monitor your progress with analytics and weekly reports.
              </p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3 className="step-title">Get AI Insights</h3>
              <p className="step-description">
                Receive personalized recommendations to improve your study habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="study-mode">
        <div className="container">
          <div className="study-mode-content">
            <div className="study-mode-text">
              <span className="badge badge-warning">Coming Soon</span>
              <h2 className="section-title">Study Mode + Chrome Extension</h2>
              <p className="study-mode-description">
                Block distracting websites and stay focused during your study sessions with our Chrome Extension. Track your browser activity and get productivity insights.
              </p>
              <div className="study-mode-features">
                <div className="study-mode-feature">
                  <span className="feature-check">✓</span>
                  <span>Block distracting websites</span>
                </div>
                <div className="study-mode-feature">
                  <span className="feature-check">✓</span>
                  <span>Track browser activity</span>
                </div>
                <div className="study-mode-feature">
                  <span className="feature-check">✓</span>
                  <span>Productivity insights</span>
                </div>
                <div className="study-mode-feature">
                  <span className="feature-check">✓</span>
                  <span>Focus score calculation</span>
                </div>
              </div>
              <button className="btn btn-secondary" disabled>
                Join Waitlist
              </button>
            </div>
            <div className="study-mode-visual">
              <div className="extension-mockup">
                <div className="extension-header">
                  <span className="extension-icon">🚀</span>
                  <span className="extension-title">Study Mode Active</span>
                  <span className="extension-status">● Live</span>
                </div>
                <div className="extension-body">
                  <div className="extension-stats">
                    <div className="extension-stat">
                      <span className="ext-stat-value">45m</span>
                      <span className="ext-stat-label">Focus Time</span>
                    </div>
                    <div className="extension-stat">
                      <span className="ext-stat-value">0</span>
                      <span className="ext-stat-label">Distractions</span>
                    </div>
                  </div>
                  <div className="extension-blocked">
                    <span className="blocked-icon">🚫</span>
                    <span className="blocked-text">
                      YouTube Shorts blocked during Study Mode
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Testimonials</span>
            <h2 className="section-title">Loved by Students Worldwide</h2>
            <p className="section-subtitle">See what our users have to say about FocusNexa.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "FocusNexa completely transformed how I study. The AI insights helped me identify my weak areas and improve my focus score by 30%!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <span className="author-name">Sarah Chen</span>
                  <span className="author-role">Computer Science Student</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "The study timer and goal tracking features are amazing. I've completed my learning goals 2x faster than before. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">M</div>
                <div className="author-info">
                  <span className="author-name">Michael Rodriguez</span>
                  <span className="author-role">Data Science Student</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "The weekly reports helped me understand my study patterns. Now I study more efficiently and have better work-life balance."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">E</div>
                <div className="author-info">
                  <span className="author-name">Emily Watson</span>
                  <span className="author-role">MBA Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Study Habits?</h2>
            <p className="cta-subtitle">
              Join thousands of students who are already learning smarter with FocusNexa. Start your free trial today.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started for Free
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                View Demo
              </Link>
            </div>
            <p className="cta-note">No credit card required • Free forever plan available</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="brand-icon">🎯</span>
              <span className="brand-text">FocusNexa</span>
              <p className="footer-tagline">Focus Better. Learn Smarter. Grow Faster.</p>
              <div className="footer-social">
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4 className="footer-title">Product</h4>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#pricing">Pricing</a>
                <a href="#chrome-extension">Chrome Extension</a>
              </div>
              <div className="footer-section">
                <h4 className="footer-title">Company</h4>
                <a href="#about">About</a>
                <a href="#blog">Blog</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-section">
                <h4 className="footer-title">Resources</h4>
                <a href="#docs">Documentation</a>
                <a href="#help">Help Center</a>
                <a href="#community">Community</a>
                <a href="#api">API</a>
              </div>
              <div className="footer-section">
                <h4 className="footer-title">Legal</h4>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#cookies">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2026 FocusNexa. All rights reserved. Made with ❤️ for students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
