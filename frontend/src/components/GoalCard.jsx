const GoalCard = ({ goal, onEdit, onDelete, onComplete }) => {
  const progress = (goal.progress / goal.target) * 100;

  return (
    <div className="goal-card">
      <div className="goal-header">
        <h4 className="goal-title">{goal.title}</h4>
        <span className={`badge ${goal.completed ? 'badge-success' : 'badge-primary'}`}>
          {goal.completed ? 'Completed' : 'In Progress'}
        </span>
      </div>

      <div className="goal-body">
        <div className="goal-progress">
          <div className="progress">
            <div
              className="progress-bar progress-bar-success"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="goal-stats">
            <span className="goal-progress-text">
              {goal.progress} / {goal.target} hours
            </span>
            <span className="goal-percentage">{Math.round(progress)}%</span>
          </div>
        </div>

        {goal.deadline && (
          <p className="goal-deadline">
            Deadline: {new Date(goal.deadline).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="goal-footer">
        {!goal.completed && (
          <button
            className="btn btn-sm btn-success"
            onClick={() => onComplete(goal._id)}
          >
            Complete
          </button>
        )}
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => onEdit(goal._id)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(goal._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
