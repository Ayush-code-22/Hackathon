import type { SymptomCheckerOutput } from "@/ai/flows/symptom-checker";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string | SymptomCheckerOutput;
};

export type Clinic = {
  id: number;
  name: string;
  address: string;
  type: 'Hospital' | 'Clinic';
};

export type HealthAlert = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: 'High Priority' | 'Informational';
};
