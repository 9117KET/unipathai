"use client";

import { PricingCards } from "@/components/pricing-cards";
import { GradientBackground } from "@/components/ui/gradient-background";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <GradientBackground
          accentPositions={{
            accent1: { top: "10%", right: "20%" },
            accent2: { bottom: "20%", left: "10%" },
            accent3: { top: "60%", right: "15%" },
          }}
        >
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mx-auto max-w-3xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Choose the Right Plan for Your
                  <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    College Journey
                  </span>
                </h1>
                <p className="mt-6 text-lg opacity-80">
                  Select a plan that works best for your college application
                  needs. All plans include access to our core features.
                </p>
              </div>

              <PricingCards />

              <div className="mt-16 text-center">
                <p className="text-sm opacity-60">
                  All plans include a 7-day free trial. No credit card required
                  to start.
                  <br />
                  Need something custom?{" "}
                  <a
                    href="/contact"
                    className="text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Contact us
                  </a>{" "}
                  for special educational institution pricing.
                </p>
              </div>
            </div>
          </section>
        </GradientBackground>
      </main>
    </div>
  );
}
