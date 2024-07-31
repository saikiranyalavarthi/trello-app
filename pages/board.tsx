// pages/board.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Board = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {/* Render task columns and tasks here */}
    </div>
  );
};

export default Board;
