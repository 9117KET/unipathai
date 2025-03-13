"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/types/user";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode; // Optional fallback UI instead of redirect
  redirectTo?: string; // Where to redirect if not allowed
}

/**
 * A component that restricts access based on user roles
 * If the user's role is not in the allowedRoles array, they are redirected
 * or shown a fallback UI
 */
export function RoleGuard({
  allowedRoles,
  children,
  fallback,
  redirectTo = "/login",
}: RoleGuardProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // If auth is loaded and the user is either not authenticated or doesn't have the required role
    if (
      !isLoading &&
      (!isAuthenticated || (user && !allowedRoles.includes(user.role)))
    ) {
      if (!fallback) {
        router.push(redirectTo);
      }
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    allowedRoles,
    fallback,
    redirectTo,
    router,
  ]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // If authenticated and has the correct role, show the children
  if (isAuthenticated && user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // If not authenticated or doesn't have the right role, show the fallback or nothing
  // (if no fallback, the useEffect should handle the redirect)
  return fallback ? <>{fallback}</> : null;
}
