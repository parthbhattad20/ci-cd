import { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:8000/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    await fetch('http://localhost:8000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    });
    setTask('');
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">📝 TODO App</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 flex-grow rounded"
          placeholder="Enter a task"
        />
        <button onClick={addTodo} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul className="text-left">
        {todos.map((todo) => (
          <li key={todo.id} className="mb-1 border-b pb-1">{todo.task}</li>
        ))}
      </ul>
    </div>
    //done
  );
}

export default App;
