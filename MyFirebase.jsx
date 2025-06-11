"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const firebaseAuth = typeof window !== "undefined" ? getAuth(app) : null;
export default app;

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ2KC9K8_YoryPS2YRoWU0rawJAwv6ik4",
  authDomain: "bikiran-app.firebaseapp.com",
  databaseURL: "https://bikiran-app-default-rtdb.firebaseio.com",
  projectId: "bikiran-app",
  storageBucket: "bikiran-app.appspot.com",
  messagingSenderId: "1033935677392",
  appId: "1:1033935677392:web:d72516ee66ca1f7010fbd5",
  measurementId: "G-Y87K5R4V9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


*/
