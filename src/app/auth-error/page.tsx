"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link may have been used or expired.",
    OAuthSignin: "Error in the OAuth sign-in process.",
    OAuthCallback: "Error in the OAuth callback process.",
    OAuthCreateAccount: "Could not create an OAuth provider account.",
    EmailCreateAccount: "Could not create an email account.",
    Callback: "Error in the OAuth callback handler.",
    OAuthAccountNotLinked: "Email already exists with a different provider.",
    EmailSignin: "Error sending the email verification link.",
    CredentialsSignin: "The credentials you provided are invalid.",
    SessionRequired: "You must be signed in to access this page.",
    Default: "An unexpected authentication error occurred.",
  };

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-indigo-50/50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Authentication Error
          </h2>
          <div className="mt-6 text-center text-lg text-gray-600">
            <p>{errorMessage}</p>
            {error && (
              <p className="mt-2 text-sm text-gray-500">Error code: {error}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          <Link href="/login" passHref>
            <Button className="w-full">Back to login</Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="outline" className="w-full">
              Go to home page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Loading...
              </h2>
            </div>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
