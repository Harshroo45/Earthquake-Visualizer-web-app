import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './Search.css';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search earthquakes by location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default Search;