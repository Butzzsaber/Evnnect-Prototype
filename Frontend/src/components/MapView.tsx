import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { io, Socket } from 'socket.io-client';

interface Markers {
  [key: string]: L.Marker;
}

type AppUser = {
  id: string;
  name: string;
  email: string;
  type: 'user' | 'host';
};

interface MapPageProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  setCurrentPage: React.Dispatch<
    React.SetStateAction<
      'home' | 'host-auth' | 'user-auth' | 'host-dashboard' | 'user-dashboard' | 'map'
    >
  >;
  currentUser: AppUser | null;
  selectedStation: any;
  setSelectedStation: React.Dispatch<React.SetStateAction<any>>;
}

const MapComponent: React.FC<MapPageProps> = ({
  setCurrentPage, selectedStation, setSelectedStation
}) => {

  useEffect(() => {
    const socket: Socket = io('http://localhost:5000');
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("geolocation : "+latitude+"    "+longitude);
          socket.emit('send-location', { latitude, longitude });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 15000,
        }
      );
    }
    

    const map: L.Map = L.map('map').setView([0, 0], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const markers: Markers = {};

    socket.on('receive-location', (data) => {
      console.log("Received location", data); // <-- Add this
      const { id, latitude, longitude } = data;
      map.setView([latitude, longitude]);
      console.log("setview : "+latitude+"    "+longitude);

      if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
      } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
      }


      if (selectedStation?.coords) {
        const { lat: destLat, lng: destLng } = selectedStation.coords;

        L.Routing.control({
          waypoints: [
            L.latLng(latitude, longitude), 
            L.latLng(destLat, destLng),    
          ],
          routeWhileDragging: true,
        }).addTo(map);
      }

    });

    socket.on('user-disconnected', (id) => {
      if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
      }
    });


    return () => {
      map.remove();
      socket.disconnect();
    };
  }, [selectedStation]);

  const handleBackClick = () => {
    setCurrentPage('user-dashboard'); // <-- This now updates the actual app-level page state
  };

  return (
    <div className="relative">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="fixed top-1 left-12 text-gray-500 hover:text-gray-700 bg-white py-2 px-4 rounded-md shadow-md z-50"
      >
        ← Back
      </button>

      {/* Map Container */}
      <div
        id="map"
        style={{
          height: '100vh',
          width: '100%',
          zIndex: 1,
        }}
      ></div>
    </div>
  );
};

export default MapComponent;
