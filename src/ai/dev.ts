
import { config } from 'dotenv';
config({ path: '.env.local' });

import '@/ai/flows/symptom-checker.ts';
import '@/ai/flows/summarize-health-info.ts';
import '@/ai/flows/find-nearby-clinics.ts';
