import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin SDK
let adminApp: App;

// Only initialize if no apps exist (prevent multiple initializations in development)
if (!getApps().length) {
  try {
    // Check if we have a service account key
    if (process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT) {
      // Parse the service account from environment variable
      const serviceAccount = JSON.parse(
        process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
      );

      adminApp = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    } else {
      // If no service account in env vars, try default GCP credentials (for production)
      adminApp = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  } catch (error) {
    console.error("Firebase admin initialization error", error);
    throw error;
  }
} else {
  adminApp = getApps()[0];
}

// Initialize Admin services
const adminAuth = getAuth(adminApp);
const adminStorage = getStorage(adminApp);
const adminFirestore = getFirestore(adminApp);
const adminMessaging = getMessaging(adminApp);

export { adminAuth, adminStorage, adminFirestore, adminMessaging };
