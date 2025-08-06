
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCD0kukBIuVlD6xBUd-gQMKDOnMfu8_Psw",
  authDomain: "gig-task-manager-94dae.firebaseapp.com",
  projectId: "gig-task-manager-94dae",
  storageBucket: "gig-task-manager-94dae.firebasestorage.app",
  messagingSenderId: "1038327663387",
  appId: "1:1038327663387:web:b656e244089c9927ed61be"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);