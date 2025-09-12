
import type { Clinic, HealthAlert } from '@/lib/types';

// Coordinates are approximate for demonstration purposes.
// User's hypothetical location is around: 40.7128, -74.0060 (New York, NY)
export const nearbyClinics: Clinic[] = [
  {
    id: 1,
    name: 'Downtown Medical Center',
    address: '123 Main St, Anytown, USA',
    type: 'Hospital',
    lat: 40.7150,
    lon: -74.0080,
  },
  {
    id: 2,
    name: 'Oakwood Community Clinic',
    address: '456 Oak Ave, Anytown, USA',
    type: 'Clinic',
    lat: 40.7050,
    lon: -74.0120,
  },
  {
    id: 3,
    name: 'Anytown General Hospital',
    address: '789 Pine St, Anytown, USA',
    type: 'Hospital',
    lat: 40.7200,
    lon: -73.9980,
  },
  {
    id: 4,
    name: 'Central Urgent Care',
    address: '101 Center Rd, Anytown, USA',
    type: 'Clinic',
    lat: 40.7100,
    lon: -74.0010,
  },
  {
    id: 5,
    name: 'Riverbend Health Services',
    address: '212 River Rd, Anytown, USA',
    type: 'Clinic',
    lat: 40.7250,
    lon: -74.0150,
  },
  {
    id: 6,
    name: 'Mercy Heart Institute',
    address: '333 Wellness Ct, Anytown, USA',
    type: 'Hospital',
    lat: 40.6990,
    lon: -73.9900,
  },
];

export const healthAlerts: HealthAlert[] = [
    {
        id: 1,
        title: "High Flu Activity Reported",
        message: "Increased flu cases have been reported in the Metropolis area. Please take precautions, such as frequent hand washing and considering a flu shot.",
        date: "2024-07-28T10:00:00Z",
        type: "High Priority"
    },
    {
        id: 2,
        title: "Vaccination Drive for Children",
        message: "A special vaccination drive for measles and rubella is scheduled for August 5th at the Wellness Community Clinic.",
        date: "2024-07-27T14:30:00Z",
        type: "Informational"
    },
    {
        id: 3,
        title: "Heatwave Advisory",
        message: "A heatwave is expected over the next 48 hours. Stay hydrated, avoid direct sun exposure between 11 AM and 4 PM, and check on elderly neighbors.",
        date: "2024-07-26T09:00:00Z",
        type: "High Priority"
    }
];
