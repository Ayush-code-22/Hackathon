
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
        title: "Seasonal Flu Vaccination Campaign",
        message: "The annual flu vaccination drive has begun. All citizens, especially the elderly and children, are encouraged to get vaccinated at their nearest public health center.",
        date: "2024-09-15T10:00:00Z",
        type: "Informational"
    },
    {
        id: 2,
        title: "Dengue Outbreak Warning in Coastal Areas",
        message: "A recent surge in Dengue cases has been reported in coastal districts. Residents are advised to eliminate mosquito breeding sites and use repellents. Seek medical help if you experience fever, headache, or joint pain.",
        date: "2024-09-12T11:30:00Z",
        type: "High Priority"
    },
    {
        id: 3,
        title: "Advisory on Contaminated Water Supply",
        message: "Water supply in the North Anytown district may be contaminated. Residents are advised to boil all drinking water or use certified water purifiers until further notice.",
        date: "2024-09-10T17:00:00Z",
        type: "High Priority"
    },
    {
        id: 4,
        title: "Free Health Check-up Camp",
        message: "A free health screening camp for diabetes and hypertension will be held at Anytown Community Hall on September 20th from 9 AM to 4 PM.",
        date: "2024-09-08T09:00:00Z",
        type: "Informational"
    }
];
