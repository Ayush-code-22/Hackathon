import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-3104029738-3bf2e",
  "appId": "1:300182429064:web:8b31b50c5b2d3f92bcee3d",
  "storageBucket": "studio-3104029738-3bf2e.firebasestorage.app",
  "apiKey": "AIzaSyA23o2nVJoT6drwqGvZ5MGYXbkdQ2CkeII",
  "authDomain": "studio-3104029738-3bf2e.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "300182429064"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
