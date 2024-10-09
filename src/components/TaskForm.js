import React, { useState } from 'react';

function TaskForm({ addTask, taskToEdit, updateTask }) {
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || '');
  const [status, setStatus] = useState(taskToEdit?.status || 'Pending');

  // Form submit handler for adding new task
  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      status
    };
    addTask(newTask);
    resetForm();  // Reset the form after adding a new task
  };

  // Form submit handler for editing task
  const handleEditTask = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: taskToEdit.id,
      title,
      description,
      dueDate,
      status
    };
    updateTask(updatedTask);
    resetForm();  // Reset the form after editing the task
  };

  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
  };

  const onChangeStatus = (e) =>{
    setStatus(e.target.value);
  }

  return (
    <form className="task-form">
      <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <fieldset className='radioFieldset'>
        <legend>Status</legend>

        <div className='flex'>
          <div>
            <input type="radio" id="Pending" name="status" value="Pending" checked={status === 'Pending'} onChange={onChangeStatus} />
            <label for="Pending">Pending</label>
          </div>
          <div>
            <input type="radio" id="InProgress" name="status" value="InProgress" checked={status === 'InProgress'} onChange={onChangeStatus} />
            <label for="InProgress">InProgress</label>
          </div>
          <div>
            <input type="radio" id="Completed" name="status" value="Completed" checked={status === 'Completed'} onChange={onChangeStatus} />
            <label for="Completed">Completed</label>
          </div>
        </div>
      </fieldset>

      {!taskToEdit ? (
        <button onClick={handleAddTask} className="add-btn">Add Task</button>
      ) : (
        <button onClick={handleEditTask} className="edit-btn">Save Task</button>
      )}
    </form>
  );
}

export default TaskForm;