const ExtensionCTA = ({ variant = 'card' }) => {
  if (variant === 'sidebar') {
    return (
      <div className="extension-cta-sidebar">
        <div className="extension-cta-icon">🚀</div>
        <div className="extension-cta-content">
          <div className="extension-cta-title">Chrome Extension</div>
          <div className="extension-cta-badge">Coming Soon</div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="extension-cta-inline">
        <div className="extension-cta-inline-icon">🌐</div>
        <div className="extension-cta-inline-content">
          <h4 className="extension-cta-inline-title">FocusNexa Chrome Extension</h4>
          <p className="extension-cta-inline-text">
            Block distractions and stay focused while browsing
          </p>
          <span className="extension-cta-inline-badge">Coming Soon</span>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <div className="extension-cta-card">
      <div className="extension-cta-header">
        <div className="extension-cta-icon">🌐</div>
        <div className="extension-cta-badge">Coming Soon</div>
      </div>
      <h3 className="extension-cta-title">FocusNexa Chrome Extension</h3>
      <p className="extension-cta-description">
        Block distracting websites and stay focused while browsing. Track your browser activity and get productivity insights.
      </p>
      <div className="extension-cta-features">
        <div className="extension-cta-feature">
          <span className="extension-cta-feature-icon">🚫</span>
          <span>Block distractions</span>
        </div>
        <div className="extension-cta-feature">
          <span className="extension-cta-feature-icon">📊</span>
          <span>Track activity</span>
        </div>
        <div className="extension-cta-feature">
          <span className="extension-cta-feature-icon">🎯</span>
          <span>Boost focus</span>
        </div>
      </div>
      <button className="btn btn-secondary btn-sm extension-cta-button" disabled>
        <span>Get Notified</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ExtensionCTA;
