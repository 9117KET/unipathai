"use client";

import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/types/user";
import {
  GraduationCap,
  User,
  Users,
  Building2,
  UserCog,
  BookOpen,
  FileText,
  Calendar,
} from "lucide-react";
import { GradientBackground } from "@/components/ui/gradient-background";
import { GradientCard } from "@/components/ui/gradient-card";

export default function DashboardPage() {
  // Require authentication for this page
  const { user, isLoading } = useAuth({ required: true });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Role-specific welcome messages and icons
  const roleInfo: Record<
    UserRole,
    { icon: JSX.Element; title: string; description: string; color: string }
  > = {
    [UserRole.STUDENT]: {
      icon: <GraduationCap className="h-10 w-10 text-indigo-400" />,
      title: "Student Dashboard",
      description:
        "Track your applications, work on essays, and find the perfect college match.",
      color: "from-indigo-500/20 to-purple-500/20",
    },
    [UserRole.COUNSELOR]: {
      icon: <User className="h-10 w-10 text-emerald-400" />,
      title: "Counselor Dashboard",
      description:
        "Manage your students, review applications, and provide guidance.",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    [UserRole.PARENT]: {
      icon: <Users className="h-10 w-10 text-amber-400" />,
      title: "Parent Dashboard",
      description:
        "Monitor application progress and support your student's journey.",
      color: "from-amber-500/20 to-orange-500/20",
    },
    [UserRole.UNIVERSITY]: {
      icon: <Building2 className="h-10 w-10 text-blue-400" />,
      title: "University Dashboard",
      description:
        "Manage your university profile and view applicant analytics.",
      color: "from-blue-500/20 to-sky-500/20",
    },
    [UserRole.ADMIN]: {
      icon: <UserCog className="h-10 w-10 text-rose-400" />,
      title: "Admin Dashboard",
      description: "Manage users, content, and platform settings.",
      color: "from-rose-500/20 to-pink-500/20",
    },
  };

  const currentRole = user?.role || UserRole.STUDENT;
  const { icon, title, description, color } = roleInfo[currentRole];

  const dashboardFeatures = [
    {
      title: "My Applications",
      description: "Track and manage your college applications",
      icon: <FileText className="h-6 w-6 text-indigo-400" />,
      variant: "primary" as const,
    },
    {
      title: "Essay Workspace",
      description: "Write and get feedback on your essays",
      icon: <BookOpen className="h-6 w-6 text-purple-400" />,
      variant: "secondary" as const,
    },
    {
      title: "Upcoming Deadlines",
      description: "Stay on top of important dates",
      icon: <Calendar className="h-6 w-6 text-pink-400" />,
      variant: "accent" as const,
    },
  ];

  return (
    <GradientBackground
      accentPositions={{
        accent1: { top: "10%", right: "20%" },
        accent2: { bottom: "20%", left: "15%" },
        accent3: { top: "60%", left: "30%" },
      }}
    >
      <div className="container mx-auto py-12 px-4">
        <GradientCard className="w-full p-6 mb-8">
          <div className="flex flex-row items-center gap-4 pb-2">
            <div className={`p-3 rounded-full bg-gradient-to-br ${color}`}>
              {icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="mt-1 opacity-80">Welcome back, {user?.name}!</p>
            </div>
          </div>
          <p className="mt-2 opacity-70">{description}</p>
        </GradientCard>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardFeatures.map((feature, index) => (
            <GradientCard
              key={index}
              variant={feature.variant}
              className="p-6 hover:scale-105 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-indigo-500/10">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm opacity-70">{feature.description}</p>
              <div className="mt-4">
                <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  Open →
                </button>
              </div>
            </GradientCard>
          ))}
        </div>
      </div>
    </GradientBackground>
  );
}
