import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Modal from './Modal';
import SearchBar from './SearchBar';

function DashBoard() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);               // List of tasks
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const [taskToEdit, setTaskToEdit] = useState(null);    // Task to be edited
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
      setIsModalOpen(false);
      setTaskToEdit(null);
  };
  const addTask = (task) => {
      setTasks([...tasks, task]);
      closeModal();
  };

  const updateTask = (updatedTask) => {
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      closeModal();
  };

  const deleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
    };

  const handleEdit = (task) => {
      setTaskToEdit(task);
      openModal();
  };

  const handleSearch = (query) => setSearchQuery(query.toLowerCase());

  const handleFilterStatus = (status) => setFilterStatus(status);

  const reorderTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const handleSortBy = (sortOption) => setSortBy(sortOption);

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery) || task.description.toLowerCase().includes(searchQuery);
      const matchesStatus = filterStatus ? task.status === filterStatus : true;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

    return (
        <div className='dashboard'>
            <h1>Task Dashboard Management</h1>
            <div className='flex flex-wrap'>
              <SearchBar onSearch={handleSearch} onFilterStatus={handleFilterStatus} onSortBy={handleSortBy} />
              <button onClick={openModal} style={{height: "fit-content"}}>Create Task</button>
            </div>
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEdit}
              deleteTask={deleteTask}
              reorderTasks={reorderTasks}
            />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TaskForm
                    addTask={addTask}
                    taskToEdit={taskToEdit}
                    updateTask={updateTask}
                />
            </Modal>
        </div>
    );
}

export default DashBoard;