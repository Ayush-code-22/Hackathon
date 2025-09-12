
'use server';

import { symptomChecker } from '@/ai/flows/symptom-checker';
import { findNearbyClinicsFlow } from '@/ai/flows/find-nearby-clinics';
import { z } from 'zod';

const SymptomCheckerActionSchema = z.object({
  symptoms: z.string(),
  language: z.string(),
});

export async function getSymptomAnalysis(formData: FormData) {
  try {
    const validatedData = SymptomCheckerActionSchema.parse({
      symptoms: formData.get('symptoms'),
      language: formData.get('language'),
    });

    const result = await symptomChecker({
      symptoms: validatedData.symptoms,
      language: validatedData.language,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getSymptomAnalysis:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input.', details: error.errors };
    }
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}


const FindClinicsActionSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export async function findNearbyClinics(location: { latitude: number, longitude: number }) {
  try {
    const validatedData = FindClinicsActionSchema.parse(location);
    const result = await findNearbyClinicsFlow(validatedData);
    return { success: true, data: result };
  } catch (error) {
     console.error('Error in findNearbyClinics:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid location data.', details: error.errors };
    }
    return { success: false, error: 'An unexpected error occurred while finding clinics.' };
  }
}
