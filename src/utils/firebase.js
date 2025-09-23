// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgm0FxBlliUYbLNZRc_vgYbgkqKZqjiLo",
  authDomain: "netflix-gpt-28a92.firebaseapp.com",
  projectId: "netflix-gpt-28a92",
  storageBucket: "netflix-gpt-28a92.firebasestorage.app",
  messagingSenderId: "1085507586934",
  appId: "1:1085507586934:web:3ff139bab71e4d85364857",
  measurementId: "G-R7C9QNL6TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();