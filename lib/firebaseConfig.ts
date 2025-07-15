// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADGEu6_1DduDHdxadbA6B_kL1UVbmwlkw",
  authDomain: "roomnote-659ab.firebaseapp.com",
  projectId: "roomnote-659ab",
  storageBucket: "roomnote-659ab.appspot.com",
  messagingSenderId: "367281777012",
  appId: "1:367281777012:web:2ed74f367641aa51c36421",
  measurementId: "G-SLVCHHTBM8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
