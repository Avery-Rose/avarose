import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';
import { getAnalytics } from 'firebase/analytics';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCHjOaa9LukOk1SDZmsY-6MvRgw6Fv7DDE',
  authDomain: 'ava-rose-dev.firebaseapp.com',
  projectId: 'ava-rose-dev',
  storageBucket: 'ava-rose-dev.appspot.com',
  messagingSenderId: '357468416934',
  appId: '1:357468416934:web:caba1ce5604817f9463d67',
  measurementId: 'G-145KR80W1Q',
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const performance = getPerformance(app);
export const analytics = getAnalytics(app);
