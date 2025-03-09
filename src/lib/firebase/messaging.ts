import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase-config";

/**
 * Request permission for notifications and get FCM token
 * @param vapidKey - VAPID key for web push notifications
 * @returns FCM token or null if browser doesn't support notifications
 */
export async function requestNotificationPermission(
  vapidKey: string
): Promise<string | null> {
  // Only run on the client side and if messaging is initialized
  if (typeof window === "undefined" || !messaging) {
    return null;
  }

  try {
    // Check if permission is already granted
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission was not granted.");
      return null;
    }

    // Get FCM token
    const token = await getToken(messaging, { vapidKey });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return null;
  }
}

/**
 * Save FCM token to the server for this user
 * @param userId - User ID to associate with this token
 * @param token - FCM token from requestNotificationPermission
 */
export async function saveUserFCMToken(
  userId: string,
  token: string
): Promise<void> {
  try {
    // Save token to your server
    await fetch("/api/notifications/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, token }),
    });
  } catch (error) {
    console.error("Error saving FCM token:", error);
    throw error;
  }
}

/**
 * Set up a listener for foreground messages
 * @param callback - Callback function to handle received messages
 * @returns Unsubscribe function
 */
export function setupMessageListener(
  callback: (payload: any) => void
): () => void {
  if (typeof window === "undefined" || !messaging) {
    return () => {};
  }

  // Handle foreground messages
  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);
    callback(payload);
  });

  return unsubscribe;
}
