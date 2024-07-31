
// components/TaskBoard.tsx
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

const TaskBoard = ({ tasks, setTasks }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);

    // Update task status in the database
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:3000/tasks/${reorderedItem._id}`, {
      status: result.destination.droppableId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Render droppable columns and draggable tasks here */}
    </DragDropContext>
  );
};

export default TaskBoard;
