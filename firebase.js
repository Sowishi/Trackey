// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbrkmeHxypBFUQFp4rsiRsmHL3a3FzMuo",
  authDomain: "trackkey-4a0c9.firebaseapp.com",
  databaseURL:
    "https://trackkey-4a0c9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trackkey-4a0c9",
  storageBucket: "trackkey-4a0c9.firebasestorage.app",
  messagingSenderId: "697369253426",
  appId: "1:697369253426:web:9cfe7fd3458d2309e50e2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const database = getDatabase();

export { db, database };
