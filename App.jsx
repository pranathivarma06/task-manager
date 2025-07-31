import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() && dueDate) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          task,
          priority,
          dueDate,
          completed: false,
        },
      ]);
      setTask('');
      setPriority('Medium');
      setDueDate('');
    }
  };

  const deleteTask = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const isOverdue = (date) => {
    const today = new Date().toISOString().split('T')[0];
    return date < today;
  };

  return (
    <div className="container">
      <h1> TaskWise</h1>
      <p className="subtitle">Smart personal task manager</p>

      <div className="form">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>➕ Add</button>
      </div>

      <div className="grid">
        {tasks.map((t) => (
          <div className="card" key={t.id}>
            <div className="top">
              <h3>{t.task}</h3>
              <span className={`badge ${t.priority.toLowerCase()}`}>
                {t.priority}
              </span>
            </div>
            <p className="due">
               Due: {t.dueDate}{' '}
              {isOverdue(t.dueDate) && <span className="overdue">⚠️ Overdue</span>}
            </p>
            <button className="delete" onClick={() => deleteTask(t.id)}>
               Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
