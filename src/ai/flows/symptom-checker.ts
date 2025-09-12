'use server';

/**
 * @fileOverview This file defines a Genkit flow for a symptom checker AI agent.
 *
 * - symptomChecker - A function that processes user-provided symptoms and suggests possible causes and actions.
 * - SymptomCheckerInput - The input type for the symptomChecker function.
 * - SymptomCheckerOutput - The return type for the symptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the symptoms experienced by the user.'),
  age: z.number().optional().describe('The age of the user in years.'),
  gender: z
    .enum(['male', 'female', 'other'])
    .optional()
    .describe('The gender of the user.'),
  language: z
    .string()
    .optional()
    .describe('The language in which to provide the response.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  likelyCauses: z
    .string()
    .describe('Potential causes of the described symptoms.'),
  recommendedActions: z
    .string()
    .describe('Recommended actions based on the symptoms, such as seeking medical advice or home care.'),
  disclaimer: z
    .string()
    .describe(
      'A disclaimer stating that this is not a substitute for professional medical advice and critical situations should be directed to emergency services.'
    ),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function symptomChecker(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const symptomCheckerPrompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are an AI-powered symptom checker designed to provide potential causes and recommended actions based on user-described symptoms.

  Consider the user's age, gender, and preferred language when formulating your response.

  Symptoms: {{{symptoms}}}
  {{#if age}}Age: {{{age}}}{{/if}}
  {{#if gender}}Gender: {{{gender}}}{{/if}}

  Provide potential causes of the symptoms and recommended actions. Include a disclaimer that this is not a substitute for professional medical advice and that critical situations should be directed to emergency services.
  Language: {{{language}}}
  `,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await symptomCheckerPrompt(input);
    return output!;
  }
);

