// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj_6qWo_lXyGizDqFRjL3mlojk2vSqihg",
  authDomain: "test-245d7.firebaseapp.com",
  projectId: "test-245d7",
  storageBucket: "test-245d7.firebasestorage.app",
  messagingSenderId: "735273654009",
  appId: "1:735273654009:web:1d6ac72e6ae03406aeb428",
  measurementId: "G-YNEF64NV10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);