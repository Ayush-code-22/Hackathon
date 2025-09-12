
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
  id: string; // Changed to string for Google Places ID
  name: string;
  address: string;
  type: 'Hospital' | 'Clinic';
  lat: number;
  lon: number;
  distance?: number;
};

export type HealthAlert = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: 'High Priority' | 'Informational';
};
