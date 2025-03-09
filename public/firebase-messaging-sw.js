// Firebase Cloud Messaging Service Worker

// Import and configure the Firebase SDK
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);

// Your web app's Firebase configuration
// This should match the config in your firebase-config.ts file
firebase.initializeApp({
  apiKey: self.FIREBASE_CONFIG.apiKey,
  authDomain: self.FIREBASE_CONFIG.authDomain,
  projectId: self.FIREBASE_CONFIG.projectId,
  storageBucket: self.FIREBASE_CONFIG.storageBucket,
  messagingSenderId: self.FIREBASE_CONFIG.messagingSenderId,
  appId: self.FIREBASE_CONFIG.appId,
  measurementId: self.FIREBASE_CONFIG.measurementId,
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.notification.title || "Notification";
  const notificationOptions = {
    body: payload.notification.body || "",
    icon: "/logo.png", // Replace with your logo
    badge: "/badge.png", // Replace with your badge
    data: payload.data,
    // Add more notification options if needed
    vibrate: [100, 50, 100], // Vibration pattern
    actions: [
      {
        action: "open_app",
        title: "Open App",
      },
    ],
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[firebase-messaging-sw.js] Notification click ", event);

  // Close the notification
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          // Deep link to a specific page if needed based on notification data
          const url = event.notification.data?.url || "/";
          return clients.openWindow(url);
        }
      })
  );
});
