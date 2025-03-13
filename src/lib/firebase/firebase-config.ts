import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported, Messaging } from "firebase/messaging";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase if it hasn't been initialized already
let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Initialize messaging conditionally (only in browser environments that support it)
let messaging: Messaging | null = null;

// This code will run only on the client side
if (typeof window !== "undefined") {
  // Check if the browser supports Firebase messaging
  isSupported()
    .then((isSupported) => {
      if (isSupported) {
        messaging = getMessaging(firebaseApp);
      }
    })
    .catch((error) => {
      console.error("Error checking messaging support:", error);
    });
}

export { auth, storage, firestore, messaging };
