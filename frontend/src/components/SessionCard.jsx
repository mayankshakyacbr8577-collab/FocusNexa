const SessionCard = ({ session, onEdit, onDelete }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="session-card">
      <div className="session-header">
        <div className="session-topic">
          <span className="session-main-topic">{session.topic}</span>
          {session.subtopic && (
            <span className="session-subtopic">→ {session.subtopic}</span>
          )}
        </div>
        <span className={`badge ${session.completed ? 'badge-success' : 'badge-warning'}`}>
          {session.completed ? 'Completed' : 'In Progress'}
        </span>
      </div>

      <div className="session-body">
        <div className="session-details">
          <div className="session-detail">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{formatDuration(session.duration)}</span>
          </div>
          <div className="session-detail">
            <span className="detail-label">Date:</span>
            <span className="detail-value">
              {new Date(session.date).toLocaleDateString()}
            </span>
          </div>
          {session.goal && (
            <div className="session-detail">
              <span className="detail-label">Goal:</span>
              <span className="detail-value">{session.goal}</span>
            </div>
          )}
        </div>
      </div>

      <div className="session-footer">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => onEdit(session._id)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(session._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
