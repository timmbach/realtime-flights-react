// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_KEY ||
    "AIzaSyAfeaWQzBoikeSU33_Vpy0BLjOqpROE8qY",
  authDomain:
    process.env.REACT_APP_FIREBASE_DOMAIN ||
    "realtime-flights-auth.firebaseapp.com",
  databaseURL:
    process.env.REACT_APP_FIREBASE_DATABASE ||
    "https://realtime-flights-auth-default-rtdb.firebaseio.com/",
  projectId:
    process.env.REACT_APP_FIREBASE_PROJECT_ID || "realtime-flights-auth",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "realtime-flights-auth.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID || "971164439107",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:971164439107:web:35580c8888342ae67cbaf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
