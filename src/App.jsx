import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import EarthquakeMap from './components/EarthquakeMap';
import Search from './components/Search';
import { FiRefreshCw } from 'react-icons/fi';
import './components/responsive.css';

// USGS Earthquake API endpoint for all earthquakes in the past day
const USGS_API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredEarthquakes, setFilteredEarthquakes] = useState([]);
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEarthquakes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(USGS_API_URL);
      if (!response.ok) throw new Error('Failed to fetch earthquake data');
      const data = await response.json();
      setEarthquakes(data.features);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  useEffect(() => {
    setFilteredEarthquakes(
      earthquakes.filter((eq) => {
        const meetsMinMagnitude = eq.properties.mag >= minMagnitude;
        const meetsSearchQuery = searchQuery === '' || 
          eq.properties.place.toLowerCase().includes(searchQuery.toLowerCase());
        return meetsMinMagnitude && meetsSearchQuery;
      })
    );
  }, [earthquakes, minMagnitude, searchQuery]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchEarthquakes}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="app responsive-container">
      <header className="header responsive-header">
        <h1>Earthquake Visualizer</h1>
        <div className="controls">
          <div className="magnitude-filter">
            <label htmlFor="magnitude">
              Min. Magnitude: {minMagnitude.toFixed(1)}
            </label>
            <input
              type="range"
              id="magnitude"
              min="0"
              max="8"
              step="0.1"
              value={minMagnitude}
              onChange={(e) => setMinMagnitude(parseFloat(e.target.value))}
            />
          </div>
          <button onClick={fetchEarthquakes} className="refresh-button" disabled={loading}>
            <FiRefreshCw className={loading ? 'spin' : ''} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </header>

      <main className="main-content responsive-main">
        <aside className="sidebar responsive-sidebar">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <h2>Recent Earthquakes ({filteredEarthquakes.length})</h2>
          {loading && earthquakes.length === 0 ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="earthquake-list">
              {filteredEarthquakes.map((eq) => (
                <div key={eq.id} className="earthquake-item">
                  <div className="magnitude" style={{
                    backgroundColor: eq.properties.mag >= 6 ? '#E53935' :
                      eq.properties.mag >= 5 ? '#FB8C00' :
                      eq.properties.mag >= 4 ? '#FDD835' : '#4CAF50'
                  }}>
                    {eq.properties.mag.toFixed(1)}
                  </div>
                  <div className="details">
                    <p>{eq.properties.place}</p>
                    <time>{dayjs(eq.properties.time).format('HH:mm, DD MMM YYYY')}</time>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        <div className="map-wrapper responsive-content">
          {earthquakes.length === 0 ? (
            <div className="loading">Loading map...</div>
          ) : (
            <EarthquakeMap earthquakes={filteredEarthquakes} />
          )}
        </div>
      </main>
      <footer className="footer">
        © 2025 Harshal Khadatare
      </footer>
    </div>
  );
}

export default App;