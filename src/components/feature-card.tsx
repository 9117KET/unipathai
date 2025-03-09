"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  gradient?: "indigo" | "emerald" | "rose" | "amber" | "purple";
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
  gradient = "indigo",
}: FeatureCardProps) {
  const gradientStyles = {
    indigo: {
      card: "hover:shadow-indigo-200 border-indigo-100",
      icon: "from-indigo-100 to-purple-100 text-indigo-600",
    },
    emerald: {
      card: "hover:shadow-emerald-200 border-emerald-100",
      icon: "from-emerald-100 to-teal-100 text-emerald-600",
    },
    rose: {
      card: "hover:shadow-rose-200 border-rose-100",
      icon: "from-rose-100 to-pink-100 text-rose-600",
    },
    amber: {
      card: "hover:shadow-amber-200 border-amber-100",
      icon: "from-amber-100 to-yellow-100 text-amber-600",
    },
    purple: {
      card: "hover:shadow-purple-200 border-purple-100",
      icon: "from-purple-100 to-violet-100 text-purple-600",
    },
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white p-6 shadow-lg shadow-gray-100 hover:shadow-xl transition-all border",
        gradientStyles[gradient].card,
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "rounded-lg bg-gradient-to-br p-3",
            gradientStyles[gradient].icon,
            iconClassName
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
    </div>
  );
}
