"use client";

import {
  Sparkles,
  Target,
  Clock,
  CheckCircle,
  BookOpen,
  LineChart,
  MessageSquare,
  Lightbulb,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { GradientBackground } from "@/components/ui/gradient-background";
import { GradientCard } from "@/components/ui/gradient-card";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with new gradient style */}
        <section className="relative py-20 sm:py-32">
          <GradientBackground
            accentPositions={{
              accent1: { top: "5%", left: "40%" },
              accent2: { bottom: "10%", right: "15%" },
              accent3: { top: "40%", left: "10%" },
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Powerful Features for Your
                  <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent pb-2 leading-[1.3] mb-1">
                    College Journey
                  </span>
                </h1>
                <p className="mt-6 text-lg opacity-80">
                  Discover all the tools and features that make UniPathAI the
                  ultimate platform for college applications.
                </p>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* Main Features Section */}
        <section className="py-20">
          <GradientBackground showAccents={false}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                {/* AI Essay Assistant */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-lg bg-indigo-500/10 p-3 text-indigo-400">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">AI Essay Assistant</h2>
                  </div>
                  <p className="mb-8 opacity-80">
                    Get personalized feedback on your essays in real-time with
                    our AI-powered essay assistant.
                  </p>

                  <GradientCard variant="primary" className="p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Real-time feedback on grammar, style, and structure
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Content suggestions tailored to college applications
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Guidance on addressing application prompts effectively
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Plagiarism detection to ensure originality</span>
                      </li>
                    </ul>
                  </GradientCard>

                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      Try AI Essay Assistant
                    </Button>
                  </Link>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-indigo-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
                  <Image
                    src="https://source.unsplash.com/random/800x600?writing"
                    alt="AI Essay Assistant"
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                  />
                </div>

                {/* College Matching */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-purple-500/20 lg:order-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5"></div>
                  <Image
                    src="https://source.unsplash.com/random/800x600?university"
                    alt="College Matching"
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                  />
                </div>

                <div className="lg:order-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-lg bg-purple-500/10 p-3 text-purple-400">
                      <Target className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      Smart College Matching
                    </h2>
                  </div>
                  <p className="mb-8 opacity-80">
                    Find the perfect colleges that match your academic profile,
                    interests, and preferences.
                  </p>

                  <GradientCard variant="secondary" className="p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Personalized college recommendations based on your
                          profile
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Detailed comparisons of program strengths and campus
                          culture
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Insights on admission chances and scholarship
                          opportunities
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Discover best-fit colleges you might have overlooked
                        </span>
                      </li>
                    </ul>
                  </GradientCard>

                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      Find Your Match
                    </Button>
                  </Link>
                </div>

                {/* Application Tracking */}
                <div className="lg:order-5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-lg bg-pink-500/10 p-3 text-pink-400">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Application Tracking</h2>
                  </div>
                  <p className="mb-8 opacity-80">
                    Stay organized and never miss important deadlines with our
                    comprehensive tracking system.
                  </p>

                  <GradientCard variant="accent" className="p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Centralized dashboard for all your applications
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Automated deadline reminders and notifications
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Progress tracking for each college application
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Document management for transcripts and
                          recommendations
                        </span>
                      </li>
                    </ul>
                  </GradientCard>

                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                      Start Tracking
                    </Button>
                  </Link>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-pink-500/20 lg:order-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5"></div>
                  <Image
                    src="https://source.unsplash.com/random/800x600?calendar"
                    alt="Application Tracking"
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* Additional Features */}
        <section className="py-20">
          <GradientBackground
            accentPositions={{
              accent1: { top: "70%", right: "30%" },
              accent2: { bottom: "30%", left: "20%" },
              accent3: { top: "20%", right: "10%" },
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight">
                  More Powerful Features
                </h2>
                <p className="mt-4 text-lg opacity-80">
                  Discover all the tools that make UniPathAI the ultimate
                  platform for your college application journey.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-indigo-500/10">
                      <BookOpen className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      College Research Database
                    </h3>
                  </div>
                  <p className="opacity-80">
                    Access comprehensive information on thousands of colleges
                    and universities, including admission rates, programs, and
                    campus life.
                  </p>
                </GradientCard>

                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <LineChart className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Admission Chance Calculator
                    </h3>
                  </div>
                  <p className="opacity-80">
                    Get an accurate assessment of your chances of admission to
                    different colleges based on your academic profile.
                  </p>
                </GradientCard>

                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-pink-500/10">
                      <MessageSquare className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Community Forum</h3>
                  </div>
                  <p className="opacity-80">
                    Connect with other students, share experiences, and get
                    advice from those who&apos;ve been through the process.
                  </p>
                </GradientCard>

                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-indigo-500/10">
                      <Lightbulb className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Essay Topic Generator
                    </h3>
                  </div>
                  <p className="opacity-80">
                    Get personalized essay topic suggestions based on your
                    experiences, interests, and the specific college&apos;s
                    requirements.
                  </p>
                </GradientCard>

                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <Award className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Scholarship Finder
                    </h3>
                  </div>
                  <p className="opacity-80">
                    Discover scholarships you qualify for and get help with
                    applications to maximize your financial aid.
                  </p>
                </GradientCard>

                <GradientCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-pink-500/10">
                      <Zap className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Interview Preparation
                    </h3>
                  </div>
                  <p className="opacity-80">
                    Practice with AI-powered mock interviews tailored to
                    specific colleges and get feedback to improve your
                    performance.
                  </p>
                </GradientCard>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <GradientBackground showAccents={false}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-800/30 via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Ready to Transform Your College Application Journey?
                  </h2>
                  <p className="mt-4 text-lg text-white/80">
                    Join thousands of students who are using UniPathAI to get
                    into their dream colleges.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
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
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </GradientBackground>
        </section>
      </main>
    </div>
  );
}
