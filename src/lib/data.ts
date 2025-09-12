import type { Clinic, HealthAlert } from '@/lib/types';

export const nearbyClinics: Clinic[] = [
  {
    id: 1,
    name: 'Community General Hospital',
    address: '123 Main St, Springfield, USA',
    type: 'Hospital',
  },
  {
    id: 2,
    name: 'Oakwood Community Clinic',
    address: '456 Oak Ave, Springfield, USA',
    type: 'Clinic',
  },
  {
    id: 3,
    name: 'Springfield Children\'s Hospital',
    address: '789 Elm St, Springfield, USA',
    type: 'Hospital',
  },
  {
    id: 4,
    name: 'Downtown Urgent Care',
    address: '101 Center Rd, Springfield, USA',
    type: 'Clinic',
  },
  {
    id: 5,
    name: 'Riverbend Health Services',
    address: '212 River Rd, Springfield, USA',
    type: 'Clinic',
  },
  {
    id: 6,
    name: 'Mercy Heart Institute',
    address: '333 Wellness Ct, Springfield, USA',
    type: 'Hospital',
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
