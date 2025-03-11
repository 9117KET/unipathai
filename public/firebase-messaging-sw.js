// Firebase Cloud Messaging Service Worker

// Import Firebase configuration
importScripts("/firebase-config.js");

// Import and configure the Firebase SDK
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);

// Initialize Firebase with the imported configuration
try {
  firebase.initializeApp(
    self.firebaseConfig || {
      // Fallback configuration in case self.firebaseConfig is not available
      apiKey: "YOUR_API_KEY", // Replace with your actual Firebase values
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
    }
  );
} catch (e) {
  console.error("Firebase initialization error:", e);
}

// Get an instance of Firebase Messaging
const messaging = firebase.messaging();

// Set up service worker notification styling
self.addEventListener("install", (event) => {
  console.log("Service Worker installed");

  // Apply custom styling for notifications
  self.registration.navigationPreload.enable().catch((error) => {
    console.log("Navigation preload failed:", error);
  });
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

// Custom notification styling
const notificationStyles = {
  // Brand colors
  primaryColor: "#002A5E",
  accentColor: "#4361EE",
  goldColor: "#F9A826",

  // Notification badge with gradient
  badgeWithGradient: "/badge-gradient.png", // Create this gradient badge icon

  // Other styling elements
  customIcon: "/logo-gradient.png", // Create this gradient logo
};

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Extract notification data
  const notificationData = payload.data || {};
  const notificationType = notificationData.type || "default";

  // Customize notification appearance based on notification type
  let notificationIcon, notificationBadge;

  switch (notificationType) {
    case "deadline":
      notificationIcon = "/notification-deadline.png"; // Custom icon for deadlines
      notificationBadge = notificationStyles.badgeWithGradient;
      break;
    case "message":
      notificationIcon = "/notification-message.png"; // Custom icon for messages
      notificationBadge = notificationStyles.badgeWithGradient;
      break;
    case "application":
      notificationIcon = "/notification-application.png"; // Custom icon for application updates
      notificationBadge = notificationStyles.badgeWithGradient;
      break;
    default:
      notificationIcon = notificationStyles.customIcon;
      notificationBadge = notificationStyles.badgeWithGradient;
  }

  // Customize notification here
  const notificationTitle =
    payload.notification.title || "UniPathAI Notification";
  const notificationOptions = {
    body:
      payload.notification.body || "You have a new notification from UniPathAI",
    icon: notificationIcon,
    badge: notificationBadge,
    data: {
      ...payload.data,
      timestamp: Date.now(),
      url: payload.data?.url || "/dashboard",
    },
    // Enhanced notification options with modern styling
    vibrate: [100, 50, 100, 50, 100], // Improved vibration pattern
    tag: payload.data?.tag || "general",
    renotify: true,
    requireInteraction: payload.data?.requireInteraction === "true" || false,
    silent: payload.data?.silent === "true" || false,

    // Add image for rich notifications if provided
    image: payload.data?.image || null,

    // Add actions
    actions: [
      {
        action: "open_app",
        title: "View Details",
        icon: "/action-view.png",
      },
      {
        action: "dismiss",
        title: "Dismiss",
        icon: "/action-dismiss.png",
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

  // Handle action clicks
  if (event.action === "open_app") {
    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(
      clients
        .matchAll({
          type: "window",
          includeUncontrolled: true,
        })
        .then((clientList) => {
          // If there is already a window/tab open with the target URL,
          // then focus that window/tab instead of opening a new one
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            // We'll add a specific path based on notification data if applicable
            const url = event.notification.data?.url || "/dashboard";
            if (
              client.url.includes(self.location.origin) &&
              "focus" in client
            ) {
              client.focus();
              client.postMessage({
                type: "NOTIFICATION_CLICKED",
                url: url,
                data: event.notification.data,
              });
              return;
            }
          }

          // If no open windows, open a new one
          if (clients.openWindow) {
            const url = event.notification.data?.url || "/dashboard";
            return clients.openWindow(url);
          }
        })
    );
  }
});

// Handle notification close
self.addEventListener("notificationclose", function (event) {
  console.log("[firebase-messaging-sw.js] Notification closed", event);
  // You could log this event to analytics
});
