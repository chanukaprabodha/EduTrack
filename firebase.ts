import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0AYolUWHBiRvQmVB7qr7aiU88Ei1Yiko",
  authDomain: "edutrack-cc94f.firebaseapp.com",
  projectId: "edutrack-cc94f",
  storageBucket: "edutrack-cc94f.firebasestorage.app",
  messagingSenderId: "677908331517",
  appId: "1:677908331517:web:6264f9c1e3f7f390cbb794"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)