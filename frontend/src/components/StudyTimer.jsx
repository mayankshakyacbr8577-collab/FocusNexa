import { useState, useEffect, useRef } from 'react';

const StudyTimer = ({ onComplete, initialDuration = 60 }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialDuration * 60);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (onComplete) {
      onComplete(elapsed);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(initialDuration * 60);
    setElapsed(0);
  };

  return (
    <div className="study-timer">
      <div className="timer-display">
        <div className="timer-value">{formatTime(elapsed)}</div>
        {timeLeft > 0 && (
          <div className="timer-remaining">
            Remaining: {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button className="btn btn-primary btn-lg" onClick={handleStart}>
            Start Session
          </button>
        ) : (
          <>
            {!isPaused ? (
              <button className="btn btn-warning btn-lg" onClick={handlePause}>
                Pause
              </button>
            ) : (
              <button className="btn btn-success btn-lg" onClick={handleResume}>
                Resume
              </button>
            )}
            <button className="btn btn-danger btn-lg" onClick={handleStop}>
              Stop & Complete
            </button>
          </>
        )}
        <button className="btn btn-secondary btn-lg" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StudyTimer;
