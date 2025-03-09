"use client";

import { useState } from "react";
import { GradientCard } from "@/components/ui/gradient-card";
import { BookOpen, Code, GraduationCap, Award, Clock } from "lucide-react";

export function DemoGradientCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: BookOpen,
      title: "Essay Assistance",
      description: "Get personalized feedback on your essays",
      variant: "primary",
    },
    {
      icon: GraduationCap,
      title: "College Matching",
      description: "Find your perfect college fit with AI",
      variant: "secondary",
    },
    {
      icon: Clock,
      title: "Deadline Tracking",
      description: "Never miss an important application deadline",
      variant: "accent",
    },
    {
      icon: Code,
      title: "Application Dashboard",
      description: "Manage all your applications in one place",
      variant: "primary",
    },
    {
      icon: Award,
      title: "Scholarship Finder",
      description: "Discover scholarships tailored to your profile",
      variant: "secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className={hoveredIndex === index ? "scale-105" : ""}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <GradientCard
            variant={feature.variant as "primary" | "secondary" | "accent"}
            className={`p-6 transition-all duration-300 ${
              hoveredIndex === index ? "ring-2 ring-indigo-400/50" : ""
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-indigo-500/10">
                <feature.icon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
            <p className="text-sm opacity-80">{feature.description}</p>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs bg-indigo-500/10 px-3 py-1 rounded-full text-indigo-300">
                In Development
              </div>
              <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                Learn More →
              </button>
            </div>
          </GradientCard>
        </div>
      ))}
    </div>
  );
}
