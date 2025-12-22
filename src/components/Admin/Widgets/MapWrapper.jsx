import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src || icon, // Handle Vite import format
    shadowUrl: iconShadow.src || iconShadow,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// San Carlos de Bolívar Coordinates
const CENTER_POS = [-36.2333, -61.1167];

// Component to handle map resize and initial view
function MapController() {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
}

export default function MapWrapper({ children, center = CENTER_POS, zoom = 14, className = "h-full w-full" }) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            className={`${className} z-0 rounded-2xl`}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', minHeight: '400px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapController />
            {children}
        </MapContainer>
    );
}
