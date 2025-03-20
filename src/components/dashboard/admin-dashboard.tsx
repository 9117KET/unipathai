"use client";

import { User } from "next-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserCog,
  Users,
  Settings,
  BarChart,
  Shield,
  Database,
  FileText,
} from "lucide-react";

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  return (
    <div className="container mx-auto py-12 px-4 max-w-screen-xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-rose-600">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-2">
          <div className="p-4 rounded-xl bg-rose-100">
            <UserCog className="h-10 w-10 text-rose-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, Admin {user?.name}!
            </h1>
            <p className="mt-1 text-gray-600">
              Manage users, content, and platform settings.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-rose-100">
              <Users className="h-6 w-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-semibold">Users</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Manage user accounts and roles
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-rose-100 text-rose-600 rounded-full px-3 py-1">
              1,245 total
            </span>
            <Button variant="link" className="text-rose-600 p-0">
              Manage Users
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Universities</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Manage university profiles
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-blue-100 text-blue-600 rounded-full px-3 py-1">
              328 total
            </span>
            <Button variant="link" className="text-blue-600 p-0">
              View Universities
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-indigo-100">
              <BarChart className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold">Analytics</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            View platform usage statistics
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-indigo-100 text-indigo-600 rounded-full px-3 py-1">
              Updated today
            </span>
            <Button variant="link" className="text-indigo-600 p-0">
              View Analytics
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-purple-100">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Settings</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Configure platform settings
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-purple-100 text-purple-600 rounded-full px-3 py-1">
              System settings
            </span>
            <Button variant="link" className="text-purple-600 p-0">
              Configure
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              type="user"
              action="New user registered"
              details="Emma Johnson (Student)"
              time="10 minutes ago"
            />
            <ActivityItem
              type="security"
              action="Login attempt failed"
              details="IP: 192.168.1.1 - 3 attempts"
              time="25 minutes ago"
            />
            <ActivityItem
              type="content"
              action="University profile updated"
              details="Stanford University"
              time="1 hour ago"
            />
            <ActivityItem
              type="system"
              action="System backup completed"
              details="Database backup successful"
              time="2 hours ago"
            />
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Activity
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">System Status</h2>
          <div className="space-y-4">
            <StatusItem
              name="API Server"
              status="operational"
              metric="99.9% uptime"
            />
            <StatusItem
              name="Database"
              status="operational"
              metric="432ms response time"
            />
            <StatusItem
              name="Storage"
              status="warning"
              metric="82% capacity used"
            />
            <StatusItem
              name="Authentication"
              status="operational"
              metric="0 issues reported"
            />
          </div>
          <Button variant="outline" className="w-full mt-4">
            View System Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  type: "user" | "security" | "content" | "system";
  action: string;
  details: string;
  time: string;
}

function ActivityItem({ type, action, details, time }: ActivityItemProps) {
  const iconMap = {
    user: <Users className="h-5 w-5 text-blue-500" />,
    security: <Shield className="h-5 w-5 text-rose-500" />,
    content: <FileText className="h-5 w-5 text-indigo-500" />,
    system: <Settings className="h-5 w-5 text-purple-500" />,
  };

  return (
    <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-rose-300 transition-all bg-white">
      <div className="mr-3">{iconMap[type]}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{action}</h4>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span>{details}</span>
        </div>
      </div>
      <div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
}

interface StatusItemProps {
  name: string;
  status: "operational" | "warning" | "critical";
  metric: string;
}

function StatusItem({ name, status, metric }: StatusItemProps) {
  const statusColors = {
    operational: "bg-green-100 text-green-600",
    warning: "bg-amber-100 text-amber-600",
    critical: "bg-red-100 text-red-600",
  };

  const statusText = {
    operational: "Operational",
    warning: "Warning",
    critical: "Critical",
  };

  return (
    <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all bg-white">
      <div className="flex-1">
        <h4 className="text-sm font-medium">{name}</h4>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span>{metric}</span>
        </div>
      </div>
      <div>
        <span
          className={`px-2 py-1 ${statusColors[status]} text-xs rounded-full`}
        >
          {statusText[status]}
        </span>
      </div>
    </div>
  );
}
