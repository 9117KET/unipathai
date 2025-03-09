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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50 py-20 sm:py-32">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[40%] top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-20 h-[300px] w-[300px] rounded-full bg-rose-100/20 blur-3xl"></div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12 lg:items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Your AI-Powered
                  <span className="block text-indigo-600">College Journey</span>
                  Starts Here
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Navigate your college application process with confidence
                  using our AI-powered platform. Get personalized essay
                  feedback, smart college matches, and comprehensive application
                  tracking.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto shadow-lg shadow-indigo-100 group"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Explore Features
                    </Button>
                  </Link>
                </div>
                <div className="mt-4">
                  <Link
                    href="/pricing"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View pricing plans →
                  </Link>
                </div>
                <div className="mt-10 flex items-center gap-x-6">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        style={{
                          backgroundImage: `url(https://source.unsplash.com/random/100x100?face&${i})`,
                          backgroundSize: "cover",
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    <strong className="font-semibold text-gray-900">
                      5,000+
                    </strong>{" "}
                    students trust UniPathAI
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl"></div>
                </div>
                <div className="relative rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-indigo-100 p-7">
                  <div className="absolute -top-3 -right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    AI-Powered
                  </div>
                  <div className="space-y-7">
                    <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-5 transition-transform hover:scale-105">
                      <Sparkles className="h-9 w-9 text-indigo-600" />
                      <div>
                        <h3 className="font-semibold text-lg text-indigo-900">
                          AI Essay Assistant
                        </h3>
                        <p className="text-sm text-indigo-600/80">
                          Get real-time feedback on your essays
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 p-5 transition-transform hover:scale-105">
                      <Target className="h-9 w-9 text-emerald-600" />
                      <div>
                        <h3 className="font-semibold text-lg text-emerald-900">
                          Smart College Matching
                        </h3>
                        <p className="text-sm text-emerald-600/80">
                          Find your perfect college fit
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 p-5 transition-transform hover:scale-105">
                      <Clock className="h-9 w-9 text-rose-600" />
                      <div>
                        <h3 className="font-semibold text-lg text-rose-900">
                          Application Tracking
                        </h3>
                        <p className="text-sm text-rose-600/80">
                          Stay organized and never miss deadlines
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                <dd className="text-4xl font-semibold tracking-tight text-indigo-600">
                  5,000+
                </dd>
                <dt className="text-base leading-7 text-gray-600">
                  Happy Students
                </dt>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                <dd className="text-4xl font-semibold tracking-tight text-indigo-600">
                  95%
                </dd>
                <dt className="text-base leading-7 text-gray-600">
                  College Acceptance Rate
                </dt>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                <dd className="text-4xl font-semibold tracking-tight text-indigo-600">
                  500+
                </dd>
                <dt className="text-base leading-7 text-gray-600">
                  Universities Covered
                </dt>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                <dd className="text-4xl font-semibold tracking-tight text-indigo-600">
                  24/7
                </dd>
                <dt className="text-base leading-7 text-gray-600">
                  AI Support
                </dt>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-to-b from-indigo-50/50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything You Need for College Applications
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our AI-powered platform streamlines every aspect of your college
                application journey.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Sparkles}
                title="AI Essay Review"
                description="Get instant, intelligent feedback on your essays from our AI writing assistant."
                gradient="indigo"
              />

              <FeatureCard
                icon={Target}
                title="College Matching"
                description="Discover colleges that match your academic profile, interests, and preferences."
                gradient="emerald"
              />

              <FeatureCard
                icon={Clock}
                title="Application Tracking"
                description="Keep track of all your applications, deadlines, and requirements in one place."
                gradient="rose"
              />

              <FeatureCard
                icon={CheckCircle}
                title="Requirement Checklist"
                description="Ensure you meet all application requirements with our intelligent checklist system."
                gradient="amber"
              />

              <FeatureCard
                icon={Users}
                title="Community Support"
                description="Connect with other students and get advice from those who've been accepted."
                gradient="purple"
              />

              <FeatureCard
                icon={Settings}
                title="Personalized Dashboard"
                description="Your custom dashboard gives you a bird's-eye view of your entire application process."
                gradient="indigo"
              />
            </div>
            <div className="mt-10 text-center">
              <Link href="/features">
                <Button variant="outline" size="lg" className="group">
                  View All Features
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How UniPathAI Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform makes the college application process simple,
                organized, and stress-free.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="relative flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Create Your Profile
                </h3>
                <p className="mt-2 text-center text-gray-600">
                  Answer a few questions about your academic background,
                  interests, and college preferences.
                </p>
                <div className="hidden md:block absolute top-7 left-full w-full max-w-[80px] h-0.5 bg-indigo-200">
                  <div className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-indigo-600"></div>
                </div>
              </div>

              <div className="relative flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Get Matched
                </h3>
                <p className="mt-2 text-center text-gray-600">
                  Our AI analyzes your profile and recommends colleges that fit
                  your unique attributes and goals.
                </p>
                <div className="hidden md:block absolute top-7 left-full w-full max-w-[80px] h-0.5 bg-indigo-200">
                  <div className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-indigo-600"></div>
                </div>
              </div>

              <div className="relative flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Apply with Confidence
                </h3>
                <p className="mt-2 text-center text-gray-600">
                  Use our tools to craft perfect essays, track applications, and
                  meet every deadline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gradient-to-b from-white to-indigo-50/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What Our Students Say
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Thousands of students have used UniPathAI to get into their
                dream colleges.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="rounded-2xl bg-white p-8 shadow-lg shadow-indigo-100 border border-indigo-50">
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://source.unsplash.com/random/100x100?face&1)",
                    }}
                  ></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Emma Thompson
                    </h3>
                    <p className="text-sm text-gray-600">
                      Accepted to Stanford
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  &quot;UniPathAI&apos;s essay feedback was a game-changer. The
                  AI caught things my teachers missed, and I&apos;m convinced it
                  helped me get into my dream school.&quot;
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="rounded-2xl bg-white p-8 shadow-lg shadow-indigo-100 border border-indigo-50">
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://source.unsplash.com/random/100x100?face&2)",
                    }}
                  ></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Michael Chen
                    </h3>
                    <p className="text-sm text-gray-600">Accepted to MIT</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  &quot;The college matching feature suggested schools I
                  hadn&apos;t considered that ended up being perfect fits.
                  I&apos;m now at my dream engineering program!&quot;
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="rounded-2xl bg-white p-8 shadow-lg shadow-indigo-100 border border-indigo-50">
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://source.unsplash.com/random/100x100?face&3)",
                    }}
                  ></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Sophia Rodriguez
                    </h3>
                    <p className="text-sm text-gray-600">Accepted to Yale</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  &quot;With 10 applications to manage, I was overwhelmed until
                  I found UniPathAI. The tracking system kept me organized and
                  ahead of every deadline.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-700 py-16 sm:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),theme(colors.indigo.800))] opacity-20"></div>
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/10 shadow-xl shadow-indigo-600/10 ring-1 ring-white/10"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Start Your College Journey Today
                </h2>
                <p className="mt-4 text-lg leading-8 text-indigo-100">
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
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/10 p-2 ring-1 ring-white/20">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <dt className="mt-4 font-semibold text-white">
                    Secure & Private
                  </dt>
                  <dd className="mt-2 leading-7 text-indigo-100">
                    Your data is encrypted and protected. We follow FERPA
                    guidelines for student privacy.
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/10 p-2 ring-1 ring-white/20">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <dt className="mt-4 font-semibold text-white">
                    Expert Guidance
                  </dt>
                  <dd className="mt-2 leading-7 text-indigo-100">
                    AI-powered insights combined with expert counselor support
                    when you need it.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
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
