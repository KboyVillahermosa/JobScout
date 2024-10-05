// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAz8A4Tw5roOZylL6f2_jW8Svx8wOSX038",
  authDomain: "jobfinderapp-93da0.firebaseapp.com",
  projectId: "jobfinderapp-93da0",
  storageBucket: "jobfinderapp-93da0.appspot.com",
  messagingSenderId: "489769798345",
  appId: "1:489769798345:android:0c38adacee935f5d639b18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, app, db };
