
import type { Clinic, HealthAlert } from '@/lib/types';

// Coordinates are approximate for demonstration purposes for the Kolkata region.
export const nearbyClinics: Clinic[] = [
  {
    id: 'ChIJb-Iq-K5-AjoRQ7T2IDc_lEM',
    name: 'Apollo Gleneagles Hospitals',
    address: '58, Canal Circular Rd, Kadapara, Kolkata',
    type: 'Hospital',
    lat: 22.5750,
    lon: 88.3900,
  },
  {
    id: 'ChIJz-qg_tp-AjoRGf_oD14xL2o',
    name: 'AMRI Hospital, Salt Lake',
    address: 'JC 16 & 17, Salt Lake Bypass, Salt Lake City, Kolkata',
    type: 'Hospital',
    lat: 22.5790,
    lon: 88.4090,
  },
  {
    id: 'ChIJ1-dYBtB-AjoR_o9qI2T_v7I',
    name: 'Fortis Hospital, Anandapur',
    address: '730, Anandapur, E M Bypass Road, Kolkata',
    type: 'Hospital',
    lat: 22.5200,
    lon: 88.4000,
  },
  {
    id: 'ChIJP5X5-sZ-AjoRFg5gW_Jc-1o',
    name: 'Peerless Hospital',
    address: '360, Panchasayar Rd, Sahid Smirity Colony, Pancha Sayar, Kolkata',
    type: 'Hospital',
    lat: 22.4840,
    lon: 88.3990,
  },
  {
    id: 'ChIJjW-v_sV-AjoR-z4e_j4f-9o',
    name: 'Ruby General Hospital',
    address: 'Kasba Golpark, E M Bypass, Kolkata',
    type: 'Hospital',
    lat: 22.5110,
    lon: 88.3950,
  },
  {
    id: 'ChIJ_x5f_rJ-AjoRJ_j_k_j_k_k',
    name: 'ILS Hospitals, Salt Lake',
    address: 'DD-6, Salt Lake, Sector-1, Kolkata',
    type: 'Clinic',
    lat: 22.5830,
    lon: 88.4080,
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
