const EmptyState = ({ icon, title, description, action, actionText }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      {action && (
        <button className="btn btn-primary" onClick={action}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
