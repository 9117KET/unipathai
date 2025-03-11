// Firebase type declarations for global objects

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

declare global {
  interface Window {
    firebaseConfig?: FirebaseConfig;
  }

  interface ServiceWorkerGlobalScope {
    firebaseConfig?: FirebaseConfig;
  }
}
