"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-indigo-50/50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Check your email
          </h2>
          <div className="mt-6 text-center text-lg text-gray-600">
            <p>A sign in link has been sent to your email address.</p>
            <p className="mt-4">
              Please check your email (including spam folder) to sign in.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/login" passHref>
            <Button variant="outline" className="w-full">
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
