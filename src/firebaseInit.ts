import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAu2fWviRwYnxY1aoq5QzMSRGJx5bE6wj0',
  authDomain: 'gitmoji-clone.firebaseapp.com',
  projectId: 'gitmoji-clone',
  storageBucket: 'gitmoji-clone.appspot.com',
  messagingSenderId: '828935022339',
  appId: '1:828935022339:web:eb52fea5b8e46fb3dbeb36',
  measurementId: 'G-FP0L6BPRLB'
};

const app = initializeApp(firebaseConfig);

export default app;