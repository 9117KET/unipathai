"use client";

import { ReactNode } from "react";
import { Sparkles, Target, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  variant: "indigo" | "purple" | "pink";
}

function FeatureItem({ title, description, icon, variant }: FeatureItemProps) {
  const variantStyles = {
    indigo: "bg-indigo-900/30 text-indigo-300",
    purple: "bg-purple-900/30 text-purple-300",
    pink: "bg-pink-900/30 text-pink-300",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-5 hover:scale-[1.03] transition-transform duration-300",
        variantStyles[variant]
      )}
      style={
        variant === "indigo"
          ? {
              backgroundColor: "var(--feature-indigo-bg)",
              color: "var(--feature-indigo-text)",
            }
          : variant === "purple"
          ? {
              backgroundColor: "var(--feature-purple-bg)",
              color: "var(--feature-purple-text)",
            }
          : {
              backgroundColor: "var(--feature-pink-bg)",
              color: "var(--feature-pink-text)",
            }
      }
    >
      <div className="flex ite  ms-center gap-4">
        <div className="text-current">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-current">{title}</h3>
          <p className="text-current/80 text-sm mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function FeatureCards() {
  return (
    <div
      className="rounded-xl border border-slate-800/50 backdrop-blur-sm shadow-lg overflow-hidden"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="space-y-6 p-7">
        <FeatureItem
          title="AI Essay Assistant"
          description="Get real-time feedback on your essays"
          icon={<Sparkles className="h-8 w-8" />}
          variant="indigo"
        />

        <FeatureItem
          title="Smart College Matching"
          description="Find your perfect college fit"
          icon={<Target className="h-8 w-8" />}
          variant="purple"
        />

        <FeatureItem
          title="Application Tracking"
          description="Stay organized and never miss deadlines"
          icon={<Clock className="h-8 w-8" />}
          variant="pink"
        />
      </div>
    </div>
  );
}
