// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyhRcjRGp8CZs7ceenMLhFazlyEfxcJTM",
  authDomain: "portfolio-vs-eecf7.firebaseapp.com",
  projectId: "portfolio-vs-eecf7",
  storageBucket: "portfolio-vs-eecf7.firebasestorage.app",
  messagingSenderId: "804995397742",
  appId: "1:804995397742:web:7a0c7c26610e280bc74e7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);

export { db };
