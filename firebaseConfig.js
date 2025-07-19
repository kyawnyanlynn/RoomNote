// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyADGEu6_1DduDHdxadbA6B_kL1UVbmwlkw",
  authDomain: "roomnote-659ab.firebaseapp.com",
  projectId: "roomnote-659ab",
  storageBucket: "roomnote-659ab.firebasestorage.app",
  messagingSenderId: "367281777012",
  appId: "1:367281777012:web:2ed74f367641aa51c36421",
  measurementId: "G-SLVCHHTBM8",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
//const analytics = getAnalytics(app);
