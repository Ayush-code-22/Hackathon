
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Clinic } from '@/lib/types';
import L from 'leaflet';

// Fix for default icon issue with Leaflet and React
const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'user-location-marker'
});

const clinicIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


type MapProps = {
  mapCenter: [number, number];
  mapZoom: number;
  userLocation: { latitude: number, longitude: number } | null;
  clinics: Clinic[];
};

export default function Map({ mapCenter, mapZoom, userLocation, clinics }: MapProps) {
  return (
    <>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }} key={mapCenter.toString()}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {clinics.map(clinic => (
          <Marker key={clinic.id} position={[clinic.lat, clinic.lon]} icon={clinicIcon}>
            <Popup>
              <b>{clinic.name}</b><br />
              {clinic.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style jsx global>{`
        .user-location-marker {
          filter: hue-rotate(120deg);
        }
      `}</style>
    </>
  );
}
