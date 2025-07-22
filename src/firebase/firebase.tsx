// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyhRcjRGp8CZs7ceenMLhFazlyEfxcJTM",
  authDomain: "portfolio-vs-eecf7.firebaseapp.com",
  projectId: "portfolio-vs-eecf7",
  storageBucket: "portfolio-vs-eecf7.firebasestorage.app",
  messagingSenderId: "804995397742",
  appId: "1:804995397742:web:7a0c7c26610e280bc74e7f",
  measurementId: "G-2WR7Y2JZNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export { db }