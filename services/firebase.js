import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBTe1YQjjuXlhGJgq2R7rSClpBHvVb5d7U",
    authDomain: "konnect-3a119.firebaseapp.com",
    projectId: "konnect-3a119",
    storageBucket: "konnect-3a119.firebasestorage.app",
    messagingSenderId: "1010584845283",
    appId: "1:1010584845283:web:10c26bc59c712ae8e6fed6"
  };

const app = initializeApp(firebaseConfig)

export const auth =getAuth(app);
export const db = getFirestore(app);