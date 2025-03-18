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
    indigo:
      "from-indigo-500/20 to-indigo-600/20 hover:from-indigo-500/30 hover:to-indigo-600/30 text-indigo-200",
    purple:
      "from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 text-purple-200",
    pink: "from-pink-500/20 to-pink-600/20 hover:from-pink-500/30 hover:to-pink-600/30 text-pink-200",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-300",
        "bg-gradient-to-br backdrop-blur-lg",
        "border border-white/10",
        "hover:scale-[1.02] hover:shadow-lg",
        variantStyles[variant]
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="text-current">{icon}</div>
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              "bg-blue-500/20 text-blue-200"
            )}
          >
            AI Powered
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function FeatureCards() {
  return (
    <div className="rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden bg-slate-900/50">
      <div className="space-y-4 p-6">
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
