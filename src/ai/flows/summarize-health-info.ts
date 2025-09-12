'use server';
/**
 * @fileOverview Summarizes a health document provided by the user.
 *
 * - summarizeHealthInfo - A function that summarizes the document.
 * - SummarizeHealthInfoInput - The input type for the summarizeHealthInfo function.
 * - SummarizeHealthInfoOutput - The return type for the summarizeHealthInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeHealthInfoInputSchema = z.object({
  document: z.string().describe('The document to summarize.'),
});
export type SummarizeHealthInfoInput = z.infer<typeof SummarizeHealthInfoInputSchema>;

const SummarizeHealthInfoOutputSchema = z.object({
  summary: z.string().describe('The summary of the document.'),
});
export type SummarizeHealthInfoOutput = z.infer<typeof SummarizeHealthInfoOutputSchema>;

export async function summarizeHealthInfo(input: SummarizeHealthInfoInput): Promise<SummarizeHealthInfoOutput> {
  return summarizeHealthInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeHealthInfoPrompt',
  input: {schema: SummarizeHealthInfoInputSchema},
  output: {schema: SummarizeHealthInfoOutputSchema},
  prompt: `Summarize the following document about a health condition:\n\n{{{document}}}`, 
});

const summarizeHealthInfoFlow = ai.defineFlow(
  {
    name: 'summarizeHealthInfoFlow',
    inputSchema: SummarizeHealthInfoInputSchema,
    outputSchema: SummarizeHealthInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
