import React, { useState, useEffect } from 'react';
import ItemTimer from './ItemTimer';
import TotalTimer from './TotalTimer';
import '../../todo.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [countOfTask, setCountOfTask] = useState(0)

  const writeTask = (e) => {
    setTaskName(e.target.value);
  };

  const addTask = () => {
    const newCounter = countOfTask + 1
    setCountOfTask(newCounter)
    const newTask = { id: Date.now(), name: taskName !== '' ? taskName : `Task ${newCounter}`, time: 0, isActive: false };
    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  const updateTaskTime = (taskId, time) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, time } : task));
  };

  const updateTaskActiveState = (taskId, isActive) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, isActive } : task));
  };

  const updateTotalTime = () => {
    setTotalTime(prevTotalTime => prevTotalTime + 1);
  };

  useEffect(() => {
    const anyTaskActive = tasks.some(task => task.isActive);
    
    if (anyTaskActive) {
      const intervalId = setInterval(updateTotalTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [tasks]);

  return (
    <div>
      <main>
      <h1>Todo List</h1>
      <TotalTimer totalTime={totalTime} />
      <input type="text" value={taskName} onChange={writeTask} />
      <button onClick={addTask}>Add Task</button>
      <div>
        {tasks.map(task => (
          <div key={task.id}>
            <h2>{task.name}</h2>
            <ItemTimer
              task={task}
              updateTaskTime={updateTaskTime}
              updateTaskActiveState={updateTaskActiveState}
            />
          </div>
        ))}
      </div> 
      </main>
    </div>
  );
};

export default TodoList;
