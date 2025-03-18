"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.messaging = exports.auth = exports.firestore = void 0;
const admin = __importStar(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Firebase if not already initialized
let firebaseApp;
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
}
else {
    firebaseApp = admin.app();
}
// Export Firebase services
exports.firestore = firebaseApp.firestore();
exports.auth = firebaseApp.auth();
exports.messaging = firebaseApp.messaging();
// Helper functions for real-time notifications
const sendNotification = async (userId, title, body, data = {}) => {
    var _a;
    try {
        // Get user's FCM tokens from Firestore (this is just an example implementation)
        const userDoc = await exports.firestore.collection("userTokens").doc(userId).get();
        if (!userDoc.exists) {
            console.log(`No FCM tokens found for user ${userId}`);
            return false;
        }
        const tokens = ((_a = userDoc.data()) === null || _a === void 0 ? void 0 : _a.tokens) || [];
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
        // TODO: The TypeScript definitions for firebase-admin may be out of date.
        // The sendMulticast method exists in the Firebase Admin SDK but isn't properly typed.
        // Consider updating the firebase-admin package or adding custom type definitions.
        const response = await exports.messaging.sendMulticast(message);
        console.log(`${response.successCount} messages were sent successfully`);
        return true;
    }
    catch (error) {
        console.error("Error sending notification:", error);
        return false;
    }
};
exports.sendNotification = sendNotification;
exports.default = firebaseApp;
