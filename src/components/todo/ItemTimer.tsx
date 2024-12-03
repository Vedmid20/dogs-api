import React, { useState, useEffect } from 'react';

const ItemTimer = ({ task, updateTaskTime, updateTaskActiveState }) => {
  const [time, setTime] = useState(task.time);
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    updateTaskActiveState(task.id, !isRunning);
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          updateTaskTime(task.id, newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, task.id, updateTaskTime]);

  return (
    <div>
      <p>Time: {time} seconds</p>
      <button onClick={toggleTimer}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default ItemTimer;
