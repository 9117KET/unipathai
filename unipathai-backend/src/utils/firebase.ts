import * as admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase if not already initialized
let firebaseApp: admin.app.App;

if (!admin.apps.length) {
  // Parse the Firebase private key (it may contain escaped newlines)
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  // Initialize the Firebase Admin SDK
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
} else {
  firebaseApp = admin.app();
}

// Export Firebase services
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const messaging = firebaseApp.messaging();

// Helper functions for real-time notifications
export const sendNotification = async (
  userId: string,
  title: string,
  body: string,
  data: Record<string, string> = {}
) => {
  try {
    // Get user's FCM tokens from Firestore (this is just an example implementation)
    const userDoc = await firestore.collection("userTokens").doc(userId).get();

    if (!userDoc.exists) {
      console.log(`No FCM tokens found for user ${userId}`);
      return false;
    }

    const tokens = userDoc.data()?.tokens || [];

    if (tokens.length === 0) {
      return false;
    }

    // Send the notification
    const message = {
      notification: {
        title,
        body,
      },
      data,
      tokens,
    };

    const response = await messaging.sendMulticast(message);
    console.log(`${response.successCount} messages were sent successfully`);

    return true;
  } catch (error) {
    console.error("Error sending notification:", error);
    return false;
  }
};

export default firebaseApp;
