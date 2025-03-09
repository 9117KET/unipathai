"use client";

import React, { useEffect } from "react";
import { registerServiceWorker } from "@/lib/firebase/register-sw";

type FirebaseProviderProps = {
  children: React.ReactNode;
};

export default function FirebaseProvider({ children }: FirebaseProviderProps) {
  useEffect(() => {
    // Register the service worker when the component mounts
    registerServiceWorker();
  }, []);

  return <>{children}</>;
}
