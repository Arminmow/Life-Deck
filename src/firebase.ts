// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDchOUwg2oz60lattxdsaeqEOREActKGic",
  authDomain: "life-deck.firebaseapp.com",
  projectId: "life-deck",
  storageBucket: "life-deck.firebasestorage.app",
  messagingSenderId: "838638065691",
  appId: "1:838638065691:web:607449cc8741719cdd40be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
