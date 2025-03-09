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
import { FeatureCard } from "@/components/feature-card";
import Link from "next/link";
import Image from "next/image";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50 py-20 sm:py-32">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[40%] top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/20 blur-3xl"></div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Powerful Features for Your
                <span className="block text-indigo-600">College Journey</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Discover all the tools and features that make UniPathAI the
                ultimate platform for college applications.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              {/* AI Essay Assistant */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 p-3">
                    <Sparkles className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    AI Essay Assistant
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Our AI-powered essay assistant helps you craft compelling,
                  authentic essays that showcase your unique voice and
                  experiences.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Real-time Feedback
                      </h3>
                      <p className="text-gray-600">
                        Get instant feedback on grammar, style, and content as
                        you write.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Topic Suggestions
                      </h3>
                      <p className="text-gray-600">
                        Receive personalized essay topic ideas based on your
                        experiences and strengths.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Structure Analysis
                      </h3>
                      <p className="text-gray-600">
                        Our AI analyzes your essay structure and suggests
                        improvements for maximum impact.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-indigo-100">
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
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-emerald-100 lg:order-3">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
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
                  <div className="rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 p-3">
                    <Target className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    College Matching
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Find your perfect college match with our sophisticated AI
                  algorithm that considers your academic profile, interests, and
                  preferences.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Personalized Recommendations
                      </h3>
                      <p className="text-gray-600">
                        Get college suggestions tailored to your unique profile
                        and preferences.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Acceptance Probability
                      </h3>
                      <p className="text-gray-600">
                        See your estimated chances of acceptance at different
                        institutions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Financial Fit Analysis
                      </h3>
                      <p className="text-gray-600">
                        Understand the financial implications of each college
                        option.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Application Tracking */}
              <div className="lg:order-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 p-3">
                    <Clock className="h-8 w-8 text-rose-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Application Tracking
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Stay organized and never miss a deadline with our
                  comprehensive application tracking system.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Deadline Management
                      </h3>
                      <p className="text-gray-600">
                        Get reminders and notifications for upcoming deadlines.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Document Organization
                      </h3>
                      <p className="text-gray-600">
                        Store and manage all your application documents in one
                        secure place.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Progress Tracking
                      </h3>
                      <p className="text-gray-600">
                        Visualize your application progress for each college.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-rose-100 lg:order-6">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5"></div>
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
        </section>

        {/* Additional Features */}
        <section className="bg-gradient-to-b from-indigo-50/50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                More Powerful Features
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Discover all the tools that make UniPathAI the ultimate platform
                for your college application journey.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={BookOpen}
                title="College Research"
                description="Access comprehensive profiles of thousands of colleges and universities."
                gradient="purple"
              />

              <FeatureCard
                icon={LineChart}
                title="Application Analytics"
                description="Get insights into your application strategy with detailed analytics."
                gradient="amber"
              />

              <FeatureCard
                icon={MessageSquare}
                title="Expert Chat"
                description="Connect with college counselors and admissions experts for personalized advice."
                gradient="indigo"
              />

              <FeatureCard
                icon={Lightbulb}
                title="Scholarship Finder"
                description="Discover scholarships that match your profile and increase your chances of financial aid."
                gradient="emerald"
              />

              <FeatureCard
                icon={Award}
                title="Achievement Tracker"
                description="Document and showcase your extracurricular activities and achievements."
                gradient="rose"
              />

              <FeatureCard
                icon={Zap}
                title="Interview Prep"
                description="Practice with AI-powered mock interviews tailored to specific colleges."
                gradient="purple"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 md:p-12 shadow-xl">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Ready to Transform Your College Application Process?
                </h2>
                <p className="mt-4 text-lg text-indigo-100">
                  Join thousands of students who are using UniPathAI to get into
                  their dream colleges.
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
                  <Link href="/demo">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                    >
                      Schedule a Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
