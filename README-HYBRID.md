# Hybrid Backend Approach for UniPathAI

This document outlines the implementation of a hybrid backend approach for UniPathAI, combining Prisma with PostgreSQL for the primary data storage and Firebase for specific features that benefit from real-time capabilities.

## Architecture Overview

### 1. Primary Database: PostgreSQL with Prisma

- User authentication and profile management
- Application data and business logic
- Relational data that requires structured schemas
- Secure storage of sensitive information

### 2. Firebase Integration:

- **Firebase Storage**: For file uploads (essays, recommendation letters, etc.)
- **Firestore**: For real-time features like chat and notifications
- **Firebase Cloud Messaging (FCM)**: For push notifications

## Implementation Components

### Prisma Setup

- Models for users, roles, and application data
- Authentication with NextAuth.js
- Database migrations and queries

### Firebase Setup

- Client-side initialization (`firebase-config.ts`)
- Server-side admin initialization (`firebase-admin.ts`)
- Service worker for background notifications

### Feature-Specific Implementations

#### 1. File Storage

- File upload component with progress tracking
- Secure file storage and retrieval
- Integration with Prisma models (storing file references)

#### 2. Real-time Notifications

- Push notification subscription management
- Server-side notification sending
- Client-side notification display

#### 3. Firestore for Real-time Data

- Utility functions for CRUD operations
- Real-time subscriptions to data changes
- Integration with React components

## Configuration

### Environment Variables

The application requires several environment variables to be set in `.env`:

```
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/unipathai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""

# Firebase Admin (Service Account)
FIREBASE_ADMIN_SERVICE_ACCOUNT=""

# Firebase Web Push
NEXT_PUBLIC_FIREBASE_VAPID_KEY=""
```

## Setup Instructions

### 1. Firebase Project Setup

1. Create a new Firebase project at https://console.firebase.google.com/
2. Enable Authentication, Firestore, Storage, and Cloud Messaging
3. Generate a Web App configuration and add it to your environment variables
4. Generate a service account key for admin access
5. Generate a VAPID key for web push notifications

### 2. Database Setup

1. Set up a PostgreSQL database (locally or in the cloud)
2. Update the `DATABASE_URL` in your `.env` file
3. Run the Prisma migrations:
   ```
   npx prisma migrate dev
   ```

### 3. Service Worker Registration

The application includes a service worker for handling background notifications:

- The service worker is located at `public/firebase-messaging-sw.js`
- It is automatically registered when the app starts

## Usage Examples

### Uploading Files

```jsx
import { FileUpload } from "@/components/firebase/file-upload";

function MyForm() {
  const handleUploadComplete = (url, filename) => {
    console.log("File uploaded:", url, filename);
    // Store the URL in your database
  };

  return (
    <FileUpload
      folder="essays"
      onUploadComplete={handleUploadComplete}
      acceptedFileTypes="application/pdf,text/plain"
      maxFileSizeMB={10}
    />
  );
}
```

### Subscribing to Notifications

```jsx
import { useNotifications } from "@/hooks/use-notifications";

function NotificationButton() {
  const { requestPermission, hasPermission, isLoading } = useNotifications();

  return (
    <button onClick={requestPermission} disabled={hasPermission || isLoading}>
      {hasPermission ? "Notifications enabled" : "Enable notifications"}
    </button>
  );
}
```

### Working with Firestore

```jsx
import { useEffect, useState } from "react";
import { subscribeToQuery } from "@/lib/firebase/firestore";

function RealtimeMessages({ chatId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToQuery(
      "messages",
      [["chatId", "==", chatId]],
      (data) => {
        setMessages(data);
      },
      "createdAt",
      "asc"
    );

    return () => unsubscribe();
  }, [chatId]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
}
```

## Best Practices

1. **Data Consistency**: When using both Prisma and Firestore, ensure data consistency by implementing proper syncing mechanisms.

2. **Security Rules**: Set up proper security rules in Firebase to protect your data and storage.

3. **Error Handling**: Implement robust error handling for all Firebase operations.

4. **Performance Optimization**: Be mindful of the number of Firestore listeners and real-time subscriptions.

5. **Cost Management**: Monitor your Firebase usage to control costs, especially for storage and database operations.

## Next Steps

1. Implement Firebase Authentication integration with NextAuth.js
2. Set up Firestore security rules
3. Create a real-time chat feature using Firestore
4. Implement more advanced notification features
5. Add file preview and management features
