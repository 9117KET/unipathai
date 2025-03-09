"use client";

import Link from "next/link";
import {
  GraduationCap,
  Brain,
  Target,
  Users,
  Globe,
  Shield,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { GradientCard } from "@/components/ui/gradient-card";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32">
          <GradientBackground
            accentPositions={{
              accent1: { top: "10%", left: "20%" },
              accent2: { bottom: "15%", right: "15%" },
              accent3: { top: "40%", left: "10%" },
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="block">About</span>
                  <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    UniPathAI
                  </span>
                </h1>
                <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 opacity-90">
                  Smart AI, Smarter Applications - Your intelligent companion
                  for the college application journey
                </p>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 mx-auto max-w-3xl text-lg opacity-90">
                Making college applications accessible, efficient, and
                successful for students worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <GradientCard className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold">AI-Powered Guidance</h3>
                </div>
                <p className="text-center">
                  At UniPathAI, we&apos;re committed to making the college
                  application process more accessible, efficient, and successful
                  for students around the world.
                </p>
              </GradientCard>

              <GradientCard className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Global Reach</h3>
                </div>
                <p className="text-center">
                  We combine cutting-edge AI technology with educational
                  expertise to provide personalized guidance for students from
                  diverse backgrounds worldwide.
                </p>
              </GradientCard>

              <GradientCard className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Smart Guidance</h3>
                </div>
                <p className="text-center">
                  Our platform delivers personalized recommendations based on
                  your unique profile, helping you find your perfect college
                  match and create compelling applications.
                </p>
              </GradientCard>

              <GradientCard className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Trusted Partner</h3>
                </div>
                <p className="text-center">
                  Our platform is designed to reduce stress, save time, and
                  increase confidence during one of the most important
                  transitions in a student&apos;s educational journey.
                </p>
              </GradientCard>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What We Offer
              </h2>
              <p className="mt-4 mx-auto max-w-3xl text-lg opacity-90">
                Comprehensive tools and features designed to transform your
                college application experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    College Matching
                  </h3>
                </div>
                <p className="text-center">
                  AI-driven college recommendations based on your academic
                  profile, interests, and preferences, helping you discover your
                  ideal schools.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Essay Assistance
                  </h3>
                </div>
                <p className="text-center">
                  Smart AI tools that help you craft compelling personal
                  statements and supplemental essays that stand out to
                  admissions committees.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Application Tracking
                  </h3>
                </div>
                <p className="text-center">
                  Comprehensive dashboard to track all your applications,
                  deadlines, and tasks in one place, ensuring nothing falls
                  through the cracks.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Mentorship & Community
                  </h3>
                </div>
                <p className="text-center">
                  Connect with counselors, mentors, and peers who can provide
                  guidance and support throughout your application journey.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Privacy & Security
                  </h3>
                </div>
                <p className="text-center">
                  Comprehensive data protection measures ensuring your personal
                  information and application materials remain secure and
                  private.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Global Accessibility
                  </h3>
                </div>
                <p className="text-center">
                  Support for international students with region-specific
                  guidance for applications to universities around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Approach
              </h2>
              <p className="mt-4 mx-auto max-w-3xl text-lg opacity-90">
                We believe in combining the power of AI with human expertise to
                provide the most effective assistance for college applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                <p>
                  Our platform leverages advanced AI models like GPT-4 to
                  provide intelligent, context-aware assistance for essays,
                  college matches, and application strategies.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Human-Centered</h3>
                <p>
                  We maintain a human element through counselor guidance,
                  mentorship, and community support, ensuring technology
                  enhances rather than replaces personal connections.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Results-Oriented</h3>
                <p>
                  Everything we build is focused on improving outcomes for
                  students, helping them gain admissions to programs that match
                  their goals and potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 md:p-12 shadow-lg text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Ready to Start Your College Journey?
                </h2>
                <p className="text-lg max-w-2xl mx-auto opacity-90">
                  Join UniPathAI today and take the first step toward finding
                  and getting into your dream college.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
