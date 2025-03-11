"use client";

import Link from "next/link";
import { GradientBackground } from "@/components/ui/gradient-background";

export default function BlogComingSoon() {
  return (
    <GradientBackground>
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-3xl z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog Coming Soon
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re working on creating valuable content to help you navigate your
            college journey. Check back when we go live!
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </GradientBackground>
  );
}
