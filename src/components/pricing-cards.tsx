"use client";

import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-xl backdrop-blur-sm p-6 h-full flex flex-col ${
        plan.highlighted
          ? "border-2 border-indigo-500/40 bg-indigo-900/20"
          : "border border-slate-800/50"
      }`}
      style={{
        backgroundColor: plan.highlighted
          ? "rgba(67, 56, 202, 0.1)"
          : "var(--card-bg)",
        borderColor: plan.highlighted
          ? "var(--feature-indigo-text)"
          : "var(--card-border)",
      }}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 -right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          Popular
        </div>
      )}

      <div>
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-4xl font-bold tracking-tight">
            {plan.price}
          </span>
          {plan.price !== "Free" && (
            <span className="ml-1 text-base text-gray-400">/month</span>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-400">{plan.description}</p>
      </div>

      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={plan.buttonLink} className="mt-8 block w-full">
        <Button
          className={`w-full ${
            plan.highlighted
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          {plan.buttonText}
        </Button>
      </Link>
    </div>
  );
}

export function PricingCards() {
  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: "Free",
      description: "Essential tools to get started with your applications",
      features: [
        "Basic essay feedback",
        "College matching (limited)",
        "Up to 3 applications",
        "Standard application tracking",
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
    },
    {
      name: "Pro",
      price: "$15",
      description: "Everything you need for successful applications",
      features: [
        "Advanced AI essay assistance",
        "Unlimited college matching",
        "Unlimited applications",
        "Priority support",
        "Deadline reminders",
        "Extended application features",
      ],
      buttonText: "Upgrade Now",
      buttonLink: "/register?plan=pro",
      highlighted: true,
    },
    {
      name: "Family",
      price: "$30",
      description: "For families with multiple students applying",
      features: [
        "All Pro features",
        "Up to 3 student accounts",
        "Shared application calendar",
        "Parent/guardian access",
        "Group counseling session",
        "Application strategy report",
      ],
      buttonText: "Choose Family",
      buttonLink: "/register?plan=family",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <PricingCard key={index} plan={plan} />
      ))}
    </div>
  );
}
