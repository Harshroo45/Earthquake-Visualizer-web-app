import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onSearch([lat, lon]);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="map-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a location..."
        className="search-input"
      />
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? '...' : <FiSearch />}
      </button>
    </form>
  );
};

export default SearchBar;