import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import dayjs from 'dayjs';
import Legend from './Legend';

// Color function based on earthquake depth
const getDepthColor = (depth) => {
  if (depth < 10) return '#4CAF50';    // Green for shallow
  if (depth < 30) return '#FDD835';    // Yellow for medium
  if (depth < 70) return '#FB8C00';    // Orange for deep
  return '#E53935';                    // Red for very deep
};

const EarthquakeMap = ({ earthquakes }) => {
  const mapRef = useRef(null);
  const defaultCenter = [20, 0];
  
  // Fit map bounds to show all earthquakes
  useEffect(() => {
    if (mapRef.current && earthquakes.length > 0) {
      const bounds = L.latLngBounds(
        earthquakes.map(eq => [
          eq.geometry.coordinates[1],
          eq.geometry.coordinates[0]
        ])
      );
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [earthquakes]);

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={defaultCenter}
        zoom={2}
        scrollWheelZoom={true}
        className="map-container"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Street">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Satellite">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {earthquakes.map((earthquake) => {
          const {
            id,
            geometry: { coordinates },
            properties: { mag, place, time, url }
          } = earthquake;

          return (
            <CircleMarker
              key={id}
              center={[coordinates[1], coordinates[0]]}
              radius={Math.max(4, mag * 2.5)}
              pathOptions={{
                fillColor: getDepthColor(coordinates[2]),
                color: 'rgba(0,0,0,0.5)',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.7
              }}
            >
              <Popup>
                <div className="earthquake-popup">
                  <h3>Magnitude {mag}</h3>
                  <p><strong>Location:</strong> {place}</p>
                  <p><strong>Depth:</strong> {coordinates[2].toFixed(1)} km</p>
                  <p><strong>Time:</strong> {dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    More info
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <Legend />
    </>
  );
};

export default EarthquakeMap;