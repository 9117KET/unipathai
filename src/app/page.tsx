"use client";

import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  Target,
  Clock,
  Shield,
  CheckCircle,
  Users,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature-card";
import { DemoGradientCards } from "@/components/demo-gradient-cards";
import { GradientBackground } from "@/components/ui/gradient-background";
import { FeatureCards } from "@/components/feature-cards";
import { GradientCard } from "@/components/ui/gradient-card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with new gradient style */}
        <section className="relative py-20 sm:py-32">
          <GradientBackground
            accentPositions={{
              accent1: { top: "5%", left: "30%" },
              accent2: { bottom: "10%", right: "10%" },
              accent3: { top: "50%", left: "5%" },
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    <span className="block">Navigate Your</span>
                    <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      College Journey
                    </span>
                  </h1>
                  <p className="mt-6 max-w-lg text-lg leading-8 opacity-90">
                    AI-powered assistance for college applications, essays, and
                    finding your perfect college match.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link href="/register">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 w-full sm:w-auto"
                      >
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/features">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-indigo-400/30 text-indigo-400 hover:bg-indigo-950/30 w-full sm:w-auto"
                      >
                        Explore Features
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* New feature cards that match the image */}
                <div className="relative">
                  <FeatureCards />
                </div>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16">
          <GradientBackground
            accentPositions={{
              accent1: { top: "30%", right: "20%" },
              accent2: { bottom: "20%", left: "15%" },
              accent3: { top: "60%", right: "10%" },
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Explore Our Features
                </h2>
                <p className="mt-4 text-lg opacity-80">
                  Discover how UniPathAI makes your college application journey
                  smoother and more successful.
                </p>
              </div>

              <DemoGradientCards />
            </div>
          </GradientBackground>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16">
          <GradientBackground showAccents={false}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
                <div>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10">
                    <Users className="h-10 w-10 text-indigo-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">5,000+</h3>
                  <p className="mt-2 text-base opacity-70">Active students</p>
                </div>
                <div>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
                    <GraduationCap className="h-10 w-10 text-purple-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">500+</h3>
                  <p className="mt-2 text-base opacity-70">College partners</p>
                </div>
                <div>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/10">
                    <CheckCircle className="h-10 w-10 text-pink-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">92%</h3>
                  <p className="mt-2 text-base opacity-70">Acceptance rate</p>
                </div>
                <div>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10">
                    <Shield className="h-10 w-10 text-indigo-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">100%</h3>
                  <p className="mt-2 text-base opacity-70">Secure & private</p>
                </div>
              </div>
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

              <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-8">
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

        {/* Testimonials */}
        <section className="py-20">
          <GradientBackground showAccents={false}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  What Our Users Say
                </h2>
                <p className="mt-4 text-lg opacity-80">
                  Hear from students who transformed their college application
                  journey with UniPathAI.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-500/10">
                      {/* User avatar could go here */}
                    </div>
                    <div>
                      <h4 className="font-semibold">Alex Thompson</h4>
                      <p className="text-sm opacity-70">
                        Harvard University '25
                      </p>
                    </div>
                  </div>
                  <p className="italic opacity-80">
                    "The AI essay feedback was incredibly helpful. It helped me
                    refine my personal statement and got me accepted to my dream
                    school!"
                  </p>
                </GradientCard>

                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-purple-500/10">
                      {/* User avatar could go here */}
                    </div>
                    <div>
                      <h4 className="font-semibold">Maya Patel</h4>
                      <p className="text-sm opacity-70">
                        Stanford University '24
                      </p>
                    </div>
                  </div>
                  <p className="italic opacity-80">
                    "The college matching feature introduced me to schools I
                    hadn't considered that ended up being perfect fits for my
                    interests and goals."
                  </p>
                </GradientCard>

                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-pink-500/10">
                      {/* User avatar could go here */}
                    </div>
                    <div>
                      <h4 className="font-semibold">James Wilson</h4>
                      <p className="text-sm opacity-70">MIT '23</p>
                    </div>
                  </div>
                  <p className="italic opacity-80">
                    "The application tracker kept me organized through the
                    entire process. I never missed a deadline, and I could see
                    my progress at a glance."
                  </p>
                </GradientCard>
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
