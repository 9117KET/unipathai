"use client";

import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/types/user";
import Image from "next/image";
import {
  GraduationCap,
  User,
  Users,
  Building2,
  UserCog,
  BookOpen,
  FileText,
  Calendar,
  Bell,
  ChevronRight,
  CheckCircle2,
  Clock,
  ListTodo,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { GradientBackground } from "@/components/ui/gradient-background";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  // Require authentication for this page
  const { user, isLoading } = useAuth({ required: true });
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all"
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin bg-gradient-to-r from-uni-primary to-uni-accent"></div>
          <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-uni-primary to-uni-accent">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Role-specific welcome messages and icons
  const roleInfo: Record<
    UserRole,
    {
      icon: JSX.Element;
      greeting: string;
      description: string;
      color: string;
      bgColor: string;
      gradientFrom: string;
      gradientTo: string;
    }
  > = {
    [UserRole.STUDENT]: {
      icon: <GraduationCap className="h-10 w-10 text-uni-primary" />,
      greeting: "Student Dashboard",
      description:
        "Track your applications, work on essays, and find the perfect college match.",
      color: "uni-primary",
      bgColor: "from-uni-primary/10 to-uni-accent/10",
      gradientFrom: "from-uni-primary",
      gradientTo: "to-uni-accent",
    },
    [UserRole.COUNSELOR]: {
      icon: <User className="h-10 w-10 text-uni-success" />,
      greeting: "Counselor Dashboard",
      description:
        "Manage your students, review applications, and provide guidance.",
      color: "uni-success",
      bgColor: "from-uni-success/10 to-teal-500/10",
      gradientFrom: "from-uni-success",
      gradientTo: "to-teal-500",
    },
    [UserRole.PARENT]: {
      icon: <Users className="h-10 w-10 text-uni-warning" />,
      greeting: "Parent Dashboard",
      description:
        "Monitor application progress and support your student's journey.",
      color: "uni-warning",
      bgColor: "from-uni-warning/10 to-orange-500/10",
      gradientFrom: "from-uni-warning",
      gradientTo: "to-orange-500",
    },
    [UserRole.UNIVERSITY]: {
      icon: <Building2 className="h-10 w-10 text-uni-accent" />,
      greeting: "University Dashboard",
      description:
        "Manage your university profile and view applicant analytics.",
      color: "uni-accent",
      bgColor: "from-uni-accent/10 to-blue-500/10",
      gradientFrom: "from-uni-accent",
      gradientTo: "to-blue-500",
    },
    [UserRole.ADMIN]: {
      icon: <UserCog className="h-10 w-10 text-uni-error" />,
      greeting: "Admin Dashboard",
      description: "Manage users, content, and platform settings.",
      color: "uni-error",
      bgColor: "from-uni-error/10 to-rose-500/10",
      gradientFrom: "from-uni-error",
      gradientTo: "to-rose-500",
    },
  };

  const currentRole = user?.role || UserRole.STUDENT;
  const { icon, description, gradientFrom, gradientTo } = roleInfo[currentRole];

  // Sample tasks data - in a real app, this would come from an API
  const tasks = [
    {
      id: 1,
      title: "Complete Harvard Personal Statement",
      dueDate: "2023-12-15",
      status: "in-progress",
      priority: "high",
      university: "Harvard University",
    },
    {
      id: 2,
      title: "Submit SAT scores to MIT",
      dueDate: "2023-12-01",
      status: "completed",
      priority: "medium",
      university: "MIT",
    },
    {
      id: 3,
      title: "Request recommendation letter",
      dueDate: "2023-11-30",
      status: "in-progress",
      priority: "high",
      university: "Stanford University",
    },
    {
      id: 4,
      title: "Research scholarship opportunities",
      dueDate: "2023-12-20",
      status: "not-started",
      priority: "medium",
      university: "All",
    },
  ];

  const dashboardFeatures = [
    {
      title: "My Applications",
      description: "Track and manage your college applications",
      icon: <FileText className="h-6 w-6 text-uni-primary" />,
      stats: "3 active",
      variant: "primary" as const,
      gradientFrom: "from-uni-primary",
      gradientTo: "to-uni-accent",
    },
    {
      title: "Essay Workspace",
      description: "Write and get feedback on your essays",
      icon: <BookOpen className="h-6 w-6 text-uni-accent" />,
      stats: "2 drafts",
      variant: "secondary" as const,
      gradientFrom: "from-uni-accent",
      gradientTo: "to-blue-500",
    },
    {
      title: "Upcoming Deadlines",
      description: "Stay on top of important dates",
      icon: <Calendar className="h-6 w-6 text-uni-warning" />,
      stats: "5 upcoming",
      variant: "accent" as const,
      gradientFrom: "from-uni-warning",
      gradientTo: "to-uni-gold",
    },
  ];

  // Filter tasks based on activeTab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return task.status !== "completed";
    if (activeTab === "completed") return task.status === "completed";
    return true;
  });

  return (
    <GradientBackground
      accentPositions={{
        accent1: { top: "10%", right: "20%" },
        accent2: { bottom: "20%", left: "15%" },
        accent3: { top: "60%", left: "30%" },
      }}
    >
      <div className="container mx-auto py-12 px-4 max-w-screen-xl">
        {/* Welcome Card */}
        <Card
          variant="glass"
          className="w-full p-6 mb-8 border-t-2 border-l-2 border-r-0 border-b-0 border-gradient-to-r from-uni-primary/30 to-uni-accent/30"
          hoverEffect
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-2">
            <div
              className={`p-4 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} bg-opacity-10`}
            >
              {icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-uni-primary to-uni-accent">
                  Welcome back, {user?.name}!
                </span>
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center rounded-full bg-gradient-to-r from-uni-primary/10 to-uni-accent/10 p-2">
              <Bell className="h-5 w-5 text-uni-primary" />
              <span className="ml-2 text-sm font-medium">3 notifications</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Quick Stats */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-uni-primary to-uni-accent">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {dashboardFeatures.map((feature, index) => (
                <Card
                  key={index}
                  variant="glass"
                  className="p-6 cursor-pointer group hover:border-uni-primary/50"
                  hoverEffect
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} bg-opacity-10`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm opacity-70 mb-3">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium bg-gradient-to-r from-uni-primary/10 to-uni-accent/10 text-uni-primary rounded-full px-3 py-1">
                      {feature.stats}
                    </span>
                    <button className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-uni-primary to-uni-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                      Open <ArrowUpRight className="h-4 w-4 text-uni-primary" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Task List */}
            <Card
              variant="glass"
              className="p-6 mb-8 border-t-2 border-l-0 border-r-2 border-b-0 border-gradient-to-r from-uni-primary/20 to-uni-accent/20"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-uni-primary to-uni-accent">
                  My Tasks
                </h2>
                <div className="flex mt-2 md:mt-0 space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                      activeTab === "all"
                        ? "bg-gradient-to-r from-uni-primary to-uni-accent text-white"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                      activeTab === "pending"
                        ? "bg-gradient-to-r from-uni-primary to-uni-accent text-white"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                      activeTab === "completed"
                        ? "bg-gradient-to-r from-uni-primary to-uni-accent text-white"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-uni-primary/50 transition-all bg-white/50 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-white/60 hover:to-uni-primary/5 dark:hover:from-gray-800/60 dark:hover:to-uni-primary/10"
                  >
                    <div className="mr-3">
                      {task.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-uni-success" />
                      ) : task.status === "in-progress" ? (
                        <Clock className="h-5 w-5 text-uni-warning" />
                      ) : (
                        <ListTodo className="h-5 w-5 text-uni-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{task.title}</h4>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 px-2 py-0.5 rounded text-xs">
                          {task.university}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-2">
                      {task.priority === "high" ? (
                        <span className="px-2 py-1 bg-gradient-to-r from-uni-error/10 to-uni-error/20 text-uni-error text-xs rounded-full">
                          High
                        </span>
                      ) : task.priority === "medium" ? (
                        <span className="px-2 py-1 bg-gradient-to-r from-uni-warning/10 to-uni-warning/20 text-uni-warning text-xs rounded-full">
                          Medium
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gradient-to-r from-uni-success/10 to-uni-success/20 text-uni-success text-xs rounded-full">
                          Low
                        </span>
                      )}
                    </div>
                    <button className="ml-4 text-gray-400 hover:text-uni-primary">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full py-2 text-center text-sm font-medium bg-gradient-to-r from-uni-primary/5 to-uni-accent/5 hover:from-uni-primary/10 hover:to-uni-accent/10 text-uni-primary border border-uni-primary/30 rounded-lg transition-all">
                View All Tasks
              </button>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card variant="glass" className="p-6" hoverEffect>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-uni-primary to-uni-accent flex items-center justify-center text-white text-xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="absolute bottom-0 right-0 h-4 w-4 bg-uni-success rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user?.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Profile Completion</h4>
                  <span className="text-xs font-medium">70%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-uni-primary to-uni-accent h-full rounded-full animate-pulse-slow"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <button className="mt-4 w-full py-2 bg-gradient-to-r from-uni-primary to-uni-accent hover:from-uni-accent hover:to-uni-primary text-white rounded-lg transition-all duration-300 text-center text-sm font-medium">
                  Complete Profile
                </button>
              </div>
            </Card>

            {/* Upcoming Deadlines */}
            <Card variant="glass" className="p-6" hoverEffect>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-uni-warning" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-uni-warning to-uni-gold">
                  Upcoming Deadlines
                </span>
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-white/50 to-white/40 dark:from-gray-800/50 dark:to-gray-800/40 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium">
                      Harvard Early Action
                    </h4>
                    <span className="bg-gradient-to-r from-uni-error/10 to-uni-error/20 text-uni-error text-xs px-2 py-0.5 rounded-full">
                      3 days left
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    November 1, 2023
                  </p>
                </div>
                <div className="bg-gradient-to-r from-white/50 to-white/40 dark:from-gray-800/50 dark:to-gray-800/40 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium">MIT Application</h4>
                    <span className="bg-gradient-to-r from-uni-warning/10 to-uni-warning/20 text-uni-warning text-xs px-2 py-0.5 rounded-full">
                      2 weeks left
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    November 15, 2023
                  </p>
                </div>
                <div className="bg-gradient-to-r from-white/50 to-white/40 dark:from-gray-800/50 dark:to-gray-800/40 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium">
                      Stanford Regular Decision
                    </h4>
                    <span className="bg-gradient-to-r from-uni-success/10 to-uni-success/20 text-uni-success text-xs px-2 py-0.5 rounded-full">
                      45 days left
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    January 5, 2024
                  </p>
                </div>
              </div>
            </Card>

            {/* College Recommendations */}
            <Card
              variant="glass"
              className="p-6 border-b-2 border-r-2 border-l-0 border-t-0 border-gradient-to-br from-uni-gold/30 to-uni-warning/30"
              hoverEffect
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-uni-gold" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-uni-gold to-uni-warning">
                  College Recommendations
                </span>
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-white/50 to-white/40 dark:from-gray-800/50 dark:to-gray-800/40 rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex items-center">
                  <Image
                    src="https://via.placeholder.com/40"
                    alt="University Logo"
                    width={40}
                    height={40}
                    className="rounded-md mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">
                      Princeton University
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Match:{" "}
                      <span className="text-uni-success font-semibold">
                        95%
                      </span>
                    </p>
                  </div>
                  <button className="p-1.5 rounded-full bg-gradient-to-r from-uni-primary/10 to-uni-accent/10 hover:from-uni-primary/20 hover:to-uni-accent/20 text-uni-primary transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="bg-gradient-to-r from-white/50 to-white/40 dark:from-gray-800/50 dark:to-gray-800/40 rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex items-center">
                  <Image
                    src="https://via.placeholder.com/40"
                    alt="University Logo"
                    width={40}
                    height={40}
                    className="rounded-md mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Yale University</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Match:{" "}
                      <span className="text-uni-success font-semibold">
                        92%
                      </span>
                    </p>
                  </div>
                  <button className="p-1.5 rounded-full bg-gradient-to-r from-uni-primary/10 to-uni-accent/10 hover:from-uni-primary/20 hover:to-uni-accent/20 text-uni-primary transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="bg-gradient-to-r from-white/50 to-white/40 dark:from-gray-800/50 dark:to-gray-800/40 rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex items-center">
                  <Image
                    src="https://via.placeholder.com/40"
                    alt="University Logo"
                    width={40}
                    height={40}
                    className="rounded-md mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Brown University</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Match:{" "}
                      <span className="text-uni-success font-semibold">
                        88%
                      </span>
                    </p>
                  </div>
                  <button className="p-1.5 rounded-full bg-gradient-to-r from-uni-primary/10 to-uni-accent/10 hover:from-uni-primary/20 hover:to-uni-accent/20 text-uni-primary transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-uni-gold to-uni-warning hover:from-uni-warning hover:to-uni-gold text-white rounded-lg transition-all duration-300 text-center text-sm font-medium">
                Explore More Matches
              </button>
            </Card>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
