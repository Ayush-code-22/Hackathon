'use client';

import { createContext, useContext, ReactNode } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, User } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  "projectId": "studio-3104029738-3bf2e",
  "appId": "1:300182429064:web:8b31b50c5b2d3f92bcee3d",
  "storageBucket": "studio-3104029738-3bf2e.firebasestorage.app",
  "apiKey": "AIzaSyA23o2nVJoT6drwqGvZ5MGYXbkdQ2CkeII",
  "authDomain": "studio-3104029738-3bf2e.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "300182429064"
};

// Initialize Firebase services once at the module level
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);


interface FirebaseAuthContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
  user: User | null | undefined;
  loading: boolean;
  error: any;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType>({
  app: null,
  auth: null,
  firestore: null,
  user: undefined,
  loading: true,
  error: undefined,
});

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, loading, error] = useAuthState(auth);

  const value = { app, auth, firestore, user, loading, error };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseAuthProvider');
  }
  return context;
}
