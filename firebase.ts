import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADGEu6_1DduDHdxadbA6B_kL1UVbmwlkw",
  authDomain: "roomnote-659ab.firebaseapp.com",
  projectId: "roomnote-659ab",
  storageBucket: "roomnote-659ab.firebasestorage.app",
  messagingSenderId: "367281777012",
  appId: "1:367281777012:web:2ed74f367641aa51c36421",
  measurementId: "G-SLVCHHTBM8",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth =
  getApps().length === 0
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      })
    : getAuth(app);
export const db = getFirestore(app);
