import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB6__wgNA2CC6yIoRTMf_TyQJdqMV5oOjI",
    authDomain: "turn2law-6b33a.firebaseapp.com",
    projectId: "turn2law-6b33a",
    storageBucket: "turn2law-6b33a.firebasestorage.app",
    messagingSenderId: "462051329793",
    appId: "1:462051329793:web:f2e73e5cf226439ec2fd00",
    measurementId: "G-7XT5G0NWJY"
  };

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };