'use server';

import { symptomChecker } from '@/ai/flows/symptom-checker';
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
