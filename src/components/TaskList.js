import React, { useState } from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks, onEdit, deleteTask, reorderTasks }) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // When dragging starts, store the task ID
  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDrop = (droppedTaskId) => {
    if (draggedTaskId !== droppedTaskId) {
      const draggedTaskIndex = tasks.findIndex((task) => task.id === draggedTaskId);
      const droppedTaskIndex = tasks.findIndex((task) => task.id === droppedTaskId);

      // Reorder the tasks
      const reorderedTasks = [...tasks];
      const [draggedTask] = reorderedTasks.splice(draggedTaskIndex, 1);
      reorderedTasks.splice(droppedTaskIndex, 0, draggedTask);

      // Update the task order
      reorderTasks(reorderedTasks);
    }
  };

  return (
    <div className="task-list" >
      {tasks.map((task) => (
        // <div onDrop={handleDrop} onDragOver={handleDragOver} >
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            deleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        // </div>
      ))}
    </div>
  );
}

export default TaskList;