// Firebase configuration for public access
// This file should be updated with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual Firebase API key
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Make the config available in the global scope for the service worker
if (typeof self !== "undefined") {
  self.firebaseConfig = firebaseConfig;
}

// Make the config available in the window object for the main app
if (typeof window !== "undefined") {
  window.firebaseConfig = firebaseConfig;
}
