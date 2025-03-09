"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./use-auth";
import {
  requestNotificationPermission,
  saveUserFCMToken,
  setupMessageListener,
} from "@/lib/firebase/messaging";
import { useToast } from "./use-toast";

interface NotificationHookResult {
  requestPermission: () => Promise<boolean>;
  hasPermission: boolean | null;
  isLoading: boolean;
}

export function useNotifications(): NotificationHookResult {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if notifications are supported
  const notificationsSupported =
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator;

  // Set up notification message listener
  useEffect(() => {
    if (!notificationsSupported || !hasPermission) return;

    const unsubscribe = setupMessageListener((payload) => {
      // Show notification using toast
      toast({
        title: payload.notification?.title || "New notification",
        description: payload.notification?.body || "",
        variant: "default",
      });
    });

    return () => {
      unsubscribe();
    };
  }, [hasPermission, notificationsSupported, toast]);

  // Request permission and register for notifications
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!notificationsSupported || !isAuthenticated || !user?.id) {
      return false;
    }

    setIsLoading(true);
    try {
      // Get Firebase messaging token
      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      if (!vapidKey) {
        console.error("VAPID key is not configured");
        return false;
      }

      const token = await requestNotificationPermission(vapidKey);
      if (!token) {
        setHasPermission(false);
        return false;
      }

      // Save the token to the server
      await saveUserFCMToken(user.id, token);

      setHasPermission(true);
      return true;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      setHasPermission(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user?.id, notificationsSupported]);

  // Check existing permission on mount
  useEffect(() => {
    if (!notificationsSupported) {
      setHasPermission(false);
      return;
    }

    const checkPermission = () => {
      if (Notification.permission === "granted") {
        setHasPermission(true);
      } else if (Notification.permission === "denied") {
        setHasPermission(false);
      } else {
        setHasPermission(null);
      }
    };

    checkPermission();
  }, [notificationsSupported]);

  return {
    requestPermission,
    hasPermission,
    isLoading,
  };
}
