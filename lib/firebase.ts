// firebase.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDrASv2LsI7YYYmoiPq7LEgm0Scajfd-VM",
    authDomain: "calmixo-a988b.firebaseapp.com",
    projectId: "calmixo-a988b",
    storageBucket: "calmixo-a988b.firebasestorage.app",
    messagingSenderId: "926222651369",
    appId: "1:926222651369:web:63e5fd3dabec2e03660578",
    measurementId: "G-C5WWSVSGHV"
  };

const app = initializeApp(firebaseConfig);

// ✅ Use AsyncStorage for persistent auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export { app, auth };
