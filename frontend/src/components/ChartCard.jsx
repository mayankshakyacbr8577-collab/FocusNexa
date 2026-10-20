const ChartCard = ({ title, children, className = '' }) => {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
      </div>
      <div className="chart-body">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
