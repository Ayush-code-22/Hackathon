
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Icon } from 'leaflet';
import type { Clinic } from '@/lib/types';

type MapProps = {
  mapCenter: [number, number];
  mapZoom: number;
  userLocation: { latitude: number, longitude: number } | null;
  clinics: Clinic[];
  userIcon: Icon;
  clinicIcon: Icon;
};

export default function Map({ mapCenter, mapZoom, userLocation, clinics, userIcon, clinicIcon }: MapProps) {
  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
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
  );
}
