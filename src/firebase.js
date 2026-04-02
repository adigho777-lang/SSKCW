import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBi0ZDq1Oq8hDCKaER5Sa9gRgT84csMWcc",
  authDomain: "sskcw-a178c.firebaseapp.com",
  projectId: "sskcw-a178c",
  storageBucket: "sskcw-a178c.firebasestorage.app",
  messagingSenderId: "743644326832",
  appId: "1:743644326832:web:e3e719bffa47c09fd90475",
  measurementId: "G-5WRGT7PWFV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
