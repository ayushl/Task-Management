import React, { useState } from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks, onEdit, deleteTask, reorderTasks }) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDrop = (droppedTaskId) => {
    if (draggedTaskId !== droppedTaskId) {
      const draggedTaskIndex = tasks.findIndex((task) => task.id === draggedTaskId);
      const droppedTaskIndex = tasks.findIndex((task) => task.id === droppedTaskId);
      const reorderedTasks = [...tasks];
      const [draggedTask] = reorderedTasks.splice(draggedTaskIndex, 1);
      reorderedTasks.splice(droppedTaskIndex, 0, draggedTask);
      reorderTasks(reorderedTasks);
    }
  };

  return (
    <div className="task-list" >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          deleteTask={deleteTask}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}

export default TaskList;