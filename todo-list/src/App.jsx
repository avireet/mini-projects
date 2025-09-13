import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, done: false }]);
      setInput("");
    }
  };

  const handleRemoveTask = idx => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  const handleToggleDone = idx => {
    setTasks(tasks.map((task, i) =>
      i === idx ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <div className="todo-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a task"
          className="todo-input"
        />
        <button onClick={handleAddTask} className="todo-btn">Add Task</button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, idx) => (
          <li key={idx}>
            <span
              onClick={() => handleToggleDone(idx)}
              className={`todo-task${task.done ? ' done' : ''}`}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleRemoveTask(idx)}
              className="remove-btn"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
