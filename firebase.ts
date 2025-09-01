import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWahWGpTHMuqeWM0jQ1ZX57KIzc17ULYA",
  authDomain: "task-manager-6ac4a.firebaseapp.com",
  projectId: "task-manager-6ac4a",
  storageBucket: "task-manager-6ac4a.firebasestorage.app",
  messagingSenderId: "1059446031996",
  appId: "1:1059446031996:web:d769e5b34406022ed96bf9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)