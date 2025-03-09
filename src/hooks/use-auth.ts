"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UserRole } from "@/types/user";

type UseAuthOptions = {
  required?: boolean;
  roles?: UserRole[];
  redirectTo?: string;
  redirectIfFound?: boolean;
};

export function useAuth(options: UseAuthOptions = {}) {
  const {
    required = false,
    roles = [],
    redirectTo = "/login",
    redirectIfFound = false,
  } = options;

  const {
    data: session,
    status,
    update,
  } = useSession({
    required: required,
    onUnauthenticated() {
      if (required) {
        redirect(redirectTo);
      }
    },
  });

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  // Handle role-based access
  if (isAuthenticated && roles.length > 0) {
    const userRole = session?.user?.role;
    const hasRequiredRole = userRole ? roles.includes(userRole) : false;

    if (!hasRequiredRole) {
      // Redirect to home if user doesn't have the required role
      redirect("/");
    }
  }

  // Handle redirect if found
  if (redirectIfFound && isAuthenticated) {
    redirect("/dashboard");
  }

  return {
    session,
    status,
    update,
    isAuthenticated,
    isLoading,
    user: session?.user,
  };
}
