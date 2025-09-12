import type { Clinic, HealthAlert } from '@/lib/types';

export const nearbyClinics: Clinic[] = [
  {
    id: 1,
    name: 'City General Hospital',
    address: '123 Health St, Metropolis, USA',
    type: 'Hospital',
  },
  {
    id: 2,
    name: 'Wellness Community Clinic',
    address: '456 Cure Ave, Metropolis, USA',
    type: 'Clinic',
  },
  {
    id: 3,
    name: 'St. Jude Children\'s Research Hospital',
    address: '789 Hope Ln, Metropolis, USA',
    type: 'Hospital',
  },
  {
    id: 4,
    name: 'Metropolis Urgent Care',
    address: '101 Speedy Rd, Metropolis, USA',
    type: 'Clinic',
  },
  {
    id: 5,
    name: 'County Health Services',
    address: '212 Wellness Blvd, Metropolis, USA',
    type: 'Clinic',
  },
  {
    id: 6,
    name: 'Memorial Heart Institute',
    address: '333 Cardio Ct, Metropolis, USA',
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
