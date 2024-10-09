import React from 'react';

function SearchBar({ onSearch, onFilterStatus, onSortBy }) {
  return (
    <div className="tools">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
        className='search-bar'
      />
      <div className='filters flex'>
        <select onChange={(e) => onFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select onChange={(e) => onSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;