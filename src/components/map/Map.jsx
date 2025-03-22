import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issues (optional but recommended)
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Custom Red Marker Icon for vulture-related locations
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const RajasthanMap = () => {
  const center = [27.0238, 74.2179]; // Rajasthan center coords
  const zoomLevel = 7;

  // State to hold markers
  const [markers, setMarkers] = useState([]);

  // Fetch markers from the server
  useEffect(() => {
    fetch("https://vul-kyrie-server.onrender.com/api/device")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMarkers(data); // If data is an array
        } else {
          setMarkers([data]); // If data is a single object, convert to array
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Runs only on mount

  // Safe Zones for Vultures (Example Coordinates)
  const safeZones = [
    {
      name: "Jaisamand Wildlife Sanctuary",
      coordinates: [
        [24.2486, 73.9043],
        [24.2686, 73.9343],
        [24.2886, 73.9043],
        [24.2686, 73.8743],
      ],
    },
    {
      name: "Kumbhalgarh Wildlife Sanctuary",
      coordinates: [
        [25.1200, 73.6000],
        [25.1400, 73.6300],
        [25.1600, 73.6000],
        [25.1400, 73.5700],
      ],
    },
  ];

  return (
    <div
      style={{
        height: "80vh",
        width: "80%",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <MapContainer
        center={center}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers for vulture-related spots */}
        {markers.length > 0 &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.lat, marker.lng]}
              icon={redIcon}
            >
              <Popup>{marker.label || "Vulture Spot"}</Popup>
            </Marker>
          ))}

        {/* Safe Zones for Vultures */}
        {safeZones.map((zone, index) => (
          <Polygon
            key={index}
            positions={zone.coordinates}
            color="green"
            fillColor="lightgreen"
            fillOpacity={0.5}
          >
            <Popup>{zone.name} (Safe Zone)</Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
};

export default RajasthanMap;
