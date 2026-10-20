const StatCard = ({ title, value, subtitle, icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'stat-primary',
    success: 'stat-success',
    warning: 'stat-warning',
    error: 'stat-error',
  };

  return (
    <div className={`stat-card ${colorClasses[color] || colorClasses.primary}`}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        {trend && (
          <span className={`stat-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="stat-body">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;
