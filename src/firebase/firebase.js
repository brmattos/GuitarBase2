import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0sgCqm0VCZoIE5YtLTOiQKlXR0M6kCjE',
  authDomain: 'guitarbase-c0be7.firebaseapp.com',
  projectId: 'guitarbase-c0be7',
  storageBucket: 'guitarbase-c0be7.firebasestorage.app',
  messagingSenderId: '759088434402',
  appId: '1:759088434402:web:e2e7eebae50ab3f050e2bb',
  measurementId: 'G-28YBLT0HYL',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);