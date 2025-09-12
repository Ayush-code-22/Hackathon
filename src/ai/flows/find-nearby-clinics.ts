
'use server';
/**
 * @fileOverview A Genkit flow to find nearby clinics using the Google Maps Places API.
 *
 * - findNearbyClinicsFlow - A function that takes user coordinates and returns a list of nearby clinics.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Clinic } from '@/lib/types';

const FindNearbyClinicsInputSchema = z.object({
  latitude: z.number().describe('The latitude of the user.'),
  longitude: z.number().describe('The longitude of the user.'),
});

// We don't define an output schema here because the output from the Google Maps API
// is complex and we will be transforming it manually.
export const findNearbyClinicsFlow = ai.defineFlow(
  {
    name: 'findNearbyClinicsFlow',
    inputSchema: FindNearbyClinicsInputSchema,
    outputSchema: z.array(z.any()),
  },
  async ({ latitude, longitude }) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_MAPS_API_KEY is not set in the environment variables.');
    }

    // Search for both hospitals and clinics within a 5km radius.
    const radius = 5000; // 5 kilometers
    const types = 'hospital|doctor|clinic';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${types}&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Google Maps API Error:", errorBody);
      throw new Error(`Failed to fetch data from Google Maps API. Status: ${response.status}`);
    }
    
    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
       console.error("Google Maps API returned an error:", data.status, data.error_message);
       throw new Error(`Google Maps API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    if (!data.results) {
        return [];
    }

    // Haversine formula to calculate distance
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Radius of the Earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    };


    const clinics: Clinic[] = data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity,
      type: place.types.includes('hospital') ? 'Hospital' : 'Clinic',
      lat: place.geometry.location.lat,
      lon: place.geometry.location.lng,
      distance: getDistance(latitude, longitude, place.geometry.location.lat, place.geometry.location.lng),
    }));
    
    // Sort by distance
    clinics.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));

    return clinics.slice(0, 12); // Return up to 12 nearest locations
  }
);
