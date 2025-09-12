
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
        title: "Dengue Prevention Drive in Kolkata",
        message: "With the monsoon season, KMC has initiated a city-wide dengue prevention drive. Residents are urged to prevent water stagnation and cooperate with health workers.",
        date: "2024-09-15T10:00:00Z",
        type: "High Priority"
    },
    {
        id: 2,
        title: "Increased Air Pollution Advisory",
        message: "Air quality in central Kolkata is expected to be poor. Individuals with respiratory issues are advised to stay indoors and use air purifiers.",
        date: "2024-09-14T11:30:00Z",
        type: "Informational"
    },
    {
        id: 3,
        title: "Free Cholera Vaccination Camp in Bidhannagar",
        message: "A free cholera vaccination camp is being organized by the Bidhannagar Municipal Corporation at the Salt Lake stadium premises on September 20th.",
        date: "2024-09-12T09:00:00Z",
        type: "Informational"
    },
    {
        id: 4,
        title: "Water Contamination Alert in Behala Area",
        message: "Reports of water contamination in parts of Behala. Residents are advised to boil drinking water and report any symptoms of waterborne diseases immediately.",
        date: "2024-09-10T17:00:00Z",
        type: "High Priority"
    }
];

