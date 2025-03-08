import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  Target,
  Clock,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                UniPath<span className="text-rose-500">AI</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8 lg:items-center">
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
                <div className="mt-8 flex gap-x-6">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-indigo-200 hover:bg-indigo-700 transition-all"
                  >
                    Start Free Trial <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-indigo-200 px-6 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                  >
                    Watch Demo
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-64 w-64 rounded-full bg-indigo-200/50 blur-3xl"></div>
                </div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4 transition-transform hover:scale-105">
                      <Sparkles className="h-8 w-8 text-indigo-600" />
                      <div>
                        <h3 className="font-semibold text-indigo-900">
                          AI Essay Assistant
                        </h3>
                        <p className="text-sm text-indigo-600/80">
                          Get real-time feedback on your essays
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 p-4 transition-transform hover:scale-105">
                      <Target className="h-8 w-8 text-emerald-600" />
                      <div>
                        <h3 className="font-semibold text-emerald-900">
                          Smart College Matching
                        </h3>
                        <p className="text-sm text-emerald-600/80">
                          Find your perfect college fit
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 p-4 transition-transform hover:scale-105">
                      <Clock className="h-8 w-8 text-rose-600" />
                      <div>
                        <h3 className="font-semibold text-rose-900">
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

        {/* Features Section */}
        <section className="bg-gradient-to-b from-indigo-50/50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything You Need for College Applications
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our AI-powered platform streamlines every aspect of your college
                application journey.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature Cards */}
              <div className="relative rounded-2xl bg-white p-6 shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 transition-all border border-indigo-100">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 p-3">
                    <Sparkles className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    AI Essay Review
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">
                  Get instant, intelligent feedback on your essays from our AI
                  writing assistant.
                </p>
              </div>

              <div className="relative rounded-2xl bg-white p-6 shadow-lg shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-200 transition-all border border-emerald-100">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 p-3">
                    <Target className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    College Matching
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">
                  Discover colleges that match your academic profile, interests,
                  and preferences.
                </p>
              </div>

              <div className="relative rounded-2xl bg-white p-6 shadow-lg shadow-rose-100 hover:shadow-xl hover:shadow-rose-200 transition-all border border-rose-100">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 p-3">
                    <Clock className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Application Tracking
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">
                  Keep track of all your applications, deadlines, and
                  requirements in one place.
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
                <div className="mt-6 flex max-w-md gap-x-4">
                  <Link
                    href="/register"
                    className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                  >
                    Get Started Free
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
                    guidelines.
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
                    AI-powered insights combined with expert counselor support.
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
