"use client";

import { useEffect } from "react";

export function ClientBodyFix() {
  useEffect(() => {
    // Remove any unexpected classes that might be causing hydration issues
    document.body.classList.remove("chakra-ui-light");
    document.body.classList.remove("chakra-ui-dark");
  }, []);

  return null;
}
