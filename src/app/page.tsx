"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoGradientCards } from "@/components/demo-gradient-cards";
import { GradientBackground } from "@/components/ui/gradient-background";
import { FeatureCards } from "@/components/feature-cards";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with new gradient style */}
        <section className="relative py-24 sm:py-32 lg:py-36">
          <GradientBackground
            accentPositions={{
              accent1: { top: "5%", left: "20%" },
              accent2: { bottom: "5%", right: "15%" },
              accent3: { top: "40%", left: "5%" },
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
                <div className="max-w-xl">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    <span className="block text-gray-900 dark:text-white">
                      Your AI-Powered
                    </span>
                    <span className="block text-indigo-600 dark:text-indigo-400 leading-[1.3] mb-3">
                      College Journey
                    </span>
                    <span className="block text-gray-900 dark:text-white">
                      Starts Here
                    </span>
                  </h1>
                  <p className="mt-6 text-lg leading-7 text-gray-700 dark:text-gray-300 max-w-lg">
                    Navigate your college application process with confidence
                    using our AI-powered platform. Get personalized essay
                    feedback, smart college matches, and comprehensive
                    application tracking.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-5">
                    <Link href="/register">
                      <Button
                        size="lg"
                        className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto shadow-md"
                      >
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/features">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-indigo-400/30 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/30 w-full sm:w-auto"
                      >
                        Explore Features
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-8">
                    <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex mr-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1 -ml-3"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1 -ml-3"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1 -ml-3"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="-ml-3"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold">5,000+</span> students
                      trust UniPathAI
                    </p>
                  </div>
                </div>

                {/* Feature cards that match the image */}
                <div className="relative lg:ml-auto">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                    <div className="px-5 py-4">
                      <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-4">
                        AI-Powered
                      </div>

                      <div className="space-y-5">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start">
                          <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-800/30 p-2 rounded-md mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600 dark:text-blue-400"
                            >
                              <path d="M12 3c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59C10.21 6.04 10 5.53 10 5c0-.53.21-1.04.59-1.41C10.96 3.21 11.47 3 12 3z"></path>
                              <path d="M7.59 8.59C7.21 8.21 7 7.7 7 7.17c0-.53.21-1.04.59-1.42.37-.38.88-.58 1.41-.58.53 0 1.04.2 1.41.58.38.38.59.89.59 1.42 0 .53-.21 1.04-.59 1.42-.37.38-.88.58-1.41.58-.53 0-1.04-.2-1.41-.58z"></path>
                              <path d="M16.41 8.59c-.38.38-.89.58-1.42.58-.53 0-1.04-.2-1.41-.58a1.993 1.993 0 0 1 0-2.83c.37-.38.88-.58 1.41-.58.53 0 1.04.2 1.42.58.37.38.58.89.58 1.42 0 .52-.21 1.03-.58 1.41z"></path>
                              <path d="M12 19c-.53 0-1.04-.21-1.41-.59-.38-.37-.59-.88-.59-1.41 0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59z"></path>
                              <path d="M7.59 15.41c.38-.38.58-.89.58-1.42 0-.53-.2-1.04-.58-1.41a1.993 1.993 0 0 0-2.83 0c-.38.37-.58.88-.58 1.41 0 .53.2 1.04.58 1.42.37.38.88.58 1.41.58.53 0 1.04-.2 1.42-.58z"></path>
                              <path d="M19.83 12.58c0-.53-.2-1.04-.58-1.41-.38-.38-.89-.58-1.42-.58-.53 0-1.04.2-1.41.58-.38.37-.59.88-.59 1.41 0 .53.21 1.04.59 1.42.37.38.88.58 1.41.58.53 0 1.04-.2 1.42-.58.38-.38.58-.89.58-1.42z"></path>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-blue-700 dark:text-blue-400">
                              AI Essay Assistant
                            </h3>
                            <p className="text-sm text-blue-600/80 dark:text-blue-300/80">
                              Get real-time feedback on your essays
                            </p>
                          </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-start">
                          <div className="flex-shrink-0 bg-green-100 dark:bg-green-800/30 p-2 rounded-md mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-600 dark:text-green-400"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <circle cx="12" cy="12" r="6"></circle>
                              <circle cx="12" cy="12" r="2"></circle>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-green-700 dark:text-green-400">
                              Smart College Matching
                            </h3>
                            <p className="text-sm text-green-600/80 dark:text-green-300/80">
                              Find your perfect college fit
                            </p>
                          </div>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-start">
                          <div className="flex-shrink-0 bg-red-100 dark:bg-red-800/30 p-2 rounded-md mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-red-600 dark:text-red-400"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-red-700 dark:text-red-400">
                              Application Tracking
                            </h3>
                            <p className="text-sm text-red-600/80 dark:text-red-300/80">
                              Stay organized and never miss deadlines
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* Feature Cards Section */}
        <section className="py-20 sm:py-28">
          <GradientBackground
            accentPositions={{
              accent1: { top: "30%", right: "20%" },
              accent2: { bottom: "20%", left: "15%" },
              accent3: { top: "60%", right: "10%" },
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Explore Our Features
                </h2>
                <p className="mt-5 text-lg opacity-80 max-w-2xl mx-auto">
                  Discover how UniPathAI makes your college application journey
                  smoother and more successful.
                </p>
              </div>

              <DemoGradientCards />
            </div>
          </GradientBackground>
        </section>

        {/* Process Section */}
        <section className="py-16 sm:py-24">
          <GradientBackground
            accentPositions={{
              accent1: { top: "20%", right: "30%" },
              accent2: { bottom: "30%", left: "25%" },
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  How It Works
                </h2>
                <p className="mt-4 text-lg opacity-80">
                  Our simple process helps you navigate every step of your
                  college application journey.
                </p>
              </div>

              <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-8 items-center">
                <div className="relative flex flex-col items-center md:flex-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    Create Your Profile
                  </h3>
                  <p className="mt-2 text-center opacity-70">
                    Sign up and build your academic profile with your interests,
                    achievements, and goals.
                  </p>
                </div>

                {/* Arrow for desktop */}
                <div className="hidden md:flex items-center justify-center md:flex-none">
                  <ArrowRight className="h-8 w-8 text-indigo-400 animate-pulse" />
                </div>

                {/* Arrow for mobile */}
                <div className="flex md:hidden items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                    <ArrowRight className="h-5 w-5 text-indigo-400 rotate-90" />
                  </div>
                </div>

                <div className="relative flex flex-col items-center md:flex-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">Get Matched</h3>
                  <p className="mt-2 text-center opacity-70">
                    Our AI matches you with colleges that align with your
                    academic profile and preferences.
                  </p>
                </div>

                {/* Arrow for desktop */}
                <div className="hidden md:flex items-center justify-center md:flex-none">
                  <ArrowRight className="h-8 w-8 text-purple-400 animate-pulse" />
                </div>

                {/* Arrow for mobile */}
                <div className="flex md:hidden items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <ArrowRight className="h-5 w-5 text-purple-400 rotate-90" />
                  </div>
                </div>

                <div className="relative flex flex-col items-center md:flex-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-500/10 text-pink-400">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    Apply with Confidence
                  </h3>
                  <p className="mt-2 text-center opacity-70">
                    Use our tools to craft perfect essays, track applications,
                    and meet every deadline.
                  </p>
                </div>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* CTA Section */}
        <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
          <GradientBackground showAccents={false}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-800/30 via-transparent to-transparent"></div>
                <div className="mx-auto relative z-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2 items-center">
                  <div className="max-w-xl lg:max-w-lg">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Start Your College Journey Today
                    </h2>
                    <p className="mt-4 text-lg text-white/80">
                      Join thousands of students who are using UniPathAI to
                      streamline their college application process.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                      <Link href="/register">
                        <Button
                          size="lg"
                          className="bg-white text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 w-full sm:w-auto"
                        >
                          Get Started Free
                        </Button>
                      </Link>
                      <Link href="/pricing">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                        >
                          See Pricing
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <FeatureCards />
                  </div>
                </div>
              </div>
            </div>
          </GradientBackground>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} UniPathAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
