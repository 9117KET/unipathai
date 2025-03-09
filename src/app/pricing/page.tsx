"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function PricingPage() {
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
                Simple, Transparent
                <span className="block text-indigo-600">Pricing Plans</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Choose the plan that works best for your college application
                journey. All plans include our core features.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Free Plan */}
              <Card className="relative overflow-hidden border-indigo-100 transition-all hover:shadow-lg">
                <div className="absolute inset-x-0 top-0 h-1 bg-indigo-100"></div>
                <CardHeader className="pb-0">
                  <h3 className="text-lg font-medium text-gray-900">Free</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      $0
                    </span>
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Perfect for exploring the platform and getting started.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Basic essay feedback
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Limited college matches
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Track up to 3 applications
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Community forum access
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Link href="/register" className="w-full">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="relative overflow-hidden border-indigo-200 shadow-lg scale-105 z-10">
                <div className="absolute inset-x-0 top-0 h-1 bg-indigo-600"></div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Popular
                </div>
                <CardHeader className="pb-0">
                  <h3 className="text-lg font-medium text-gray-900">Premium</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      $19
                    </span>
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Everything you need for a successful application process.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Advanced AI essay feedback
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Unlimited college matches
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Track up to 10 applications
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Personalized deadline reminders
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Document storage (5GB)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Priority support
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Link href="/register" className="w-full">
                    <Button className="w-full">Get Premium</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Ultimate Plan */}
              <Card className="relative overflow-hidden border-indigo-100 transition-all hover:shadow-lg">
                <div className="absolute inset-x-0 top-0 h-1 bg-indigo-300"></div>
                <CardHeader className="pb-0">
                  <h3 className="text-lg font-medium text-gray-900">
                    Ultimate
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      $39
                    </span>
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    The complete package with expert guidance and support.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Everything in Premium
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Unlimited applications
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        1-on-1 counselor sessions (2/month)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Document storage (20GB)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Interview preparation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-600">
                        Scholarship application assistance
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Link href="/register" className="w-full">
                    <Button variant="outline" className="w-full">
                      Get Ultimate
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gradient-to-b from-white to-indigo-50/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Have questions about our pricing? Find answers to common
                questions below.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="rounded-lg bg-white p-6 shadow-sm border border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Can I change plans later?
                </h3>
                <p className="mt-2 text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect at the start of your next billing cycle.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm border border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Is there a student discount?
                </h3>
                <p className="mt-2 text-gray-600">
                  We offer special discounts for students from low-income
                  backgrounds. Contact our support team to learn more.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm border border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Do you offer refunds?
                </h3>
                <p className="mt-2 text-gray-600">
                  We offer a 14-day money-back guarantee if you&apos;re not
                  satisfied with our service for any reason.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm border border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  What payment methods do you accept?
                </h3>
                <p className="mt-2 text-gray-600">
                  We accept all major credit cards, PayPal, and Apple Pay. For
                  annual plans, we also offer bank transfer options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 md:p-12 shadow-xl">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Ready to Start Your College Journey?
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
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                    >
                      Contact Sales
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
