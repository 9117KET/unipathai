// Firebase configuration for public access
// This file will use the environment variables set in the app
// If window.FIREBASE_CONFIG is set by the main app, use that instead of placeholders
const firebaseConfig =
  typeof window !== "undefined" && window.FIREBASE_CONFIG
    ? window.FIREBASE_CONFIG
    : {
        apiKey: "AIzaSyCIezGHSO-5FuzzYpvjV9skVDPyjZeRLtE",
        authDomain: "unipathai-3751a.firebaseapp.com",
        projectId: "unipathai-3751a",
        storageBucket: "unipathai-3751a.firebasestorage.app",
        messagingSenderId: "972581188197",
        appId: "1:972581188197:web:ed00b9c3016475796d8c8c",
        measurementId: "G-Y8HDKFBK2N",
      };

// Make the config available in the global scope for the service worker
if (typeof self !== "undefined") {
  self.firebaseConfig = firebaseConfig;
}

// Make the config available in the window object for the main app
if (typeof window !== "undefined" && !window.firebaseConfig) {
  window.firebaseConfig = firebaseConfig;
}
