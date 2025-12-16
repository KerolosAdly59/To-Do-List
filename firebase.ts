// Import Firebase core
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import Firestore
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCU5YdGiIVaLOc3ELg3Qsfv5mY69ydQfbo",
  authDomain: "to-do-list-e0786.firebaseapp.com",
  projectId: "to-do-list-e0786",
  storageBucket: "to-do-list-e0786.firebasestorage.app",
  messagingSenderId: "390027137818",
  appId: "1:390027137818:web:e8549ed233ad14ab4692a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

// ✅ Initialize Firestore
export const db = getFirestore(app);
