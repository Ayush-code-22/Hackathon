import type { SymptomCheckerOutput } from "@/ai/flows/symptom-checker";
import type { Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string | SymptomCheckerOutput;
  userId?: string;
  createdAt?: Timestamp | { seconds: number, nanoseconds: number };
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
