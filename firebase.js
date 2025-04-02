// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbrkmeHxypBFUQFp4rsiRsmHL3a3FzMuo",
  authDomain: "trackkey-4a0c9.firebaseapp.com",
  projectId: "trackkey-4a0c9",
  storageBucket: "trackkey-4a0c9.firebasestorage.app",
  messagingSenderId: "697369253426",
  appId: "1:697369253426:web:9cfe7fd3458d2309e50e2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
