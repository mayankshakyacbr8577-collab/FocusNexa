const TopicCard = ({ topic, onEdit, onDelete, onAddSubtopic }) => {
  const subtopics = topic.subtopics || [];

  return (
    <div className="topic-card">
      <div className="topic-header">
        <h4 className="topic-title">{topic.name}</h4>
        <div className="topic-actions">
          <button
            className="btn-icon"
            onClick={() => onAddSubtopic(topic._id)}
            title="Add subtopic"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button
            className="btn-icon"
            onClick={() => onEdit(topic._id)}
            title="Edit topic"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="btn-icon"
            onClick={() => onDelete(topic._id)}
            title="Delete topic"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {subtopics.length > 0 && (
        <div className="topic-body">
          <ul className="subtopic-list">
            {subtopics.map((subtopic, index) => (
              <li key={index} className="subtopic-item">
                <span className="subtopic-name">{subtopic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.totalTime && (
        <div className="topic-footer">
          <span className="topic-time">Total: {topic.totalTime}h</span>
        </div>
      )}
    </div>
  );
};

export default TopicCard;
