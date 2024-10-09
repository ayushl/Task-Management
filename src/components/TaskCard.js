import React from 'react';
import { PiPencilSimpleLight, PiTrash } from "react-icons/pi";

function TaskCard({ task, onEdit, deleteTask, onDragStart, onDrop }) {
  return (
    <div className="task-card" draggable onDragStart={() => onDragStart(task.id)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(task.id)} >
        <div className='right'>
            <PiPencilSimpleLight title="Edit" className="pointer" onClick={() => onEdit(task)} />
            <PiTrash title="Delete" className="pointer" onClick={() => deleteTask(task.id)} />
        </div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        {task.dueDate ? <p>Due: {task.dueDate}</p> : '' }
        <p className={task.status === 'Pending' ? 'pendingTask' : task.status === 'Completed' ? 'completedTask' : 'inProgressTask'} >{task.status}</p>
    </div>
  );
}

export default TaskCard;