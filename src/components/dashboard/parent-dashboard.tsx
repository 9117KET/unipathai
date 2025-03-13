"use client";

import { User } from "next-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface ParentDashboardProps {
  user: User;
}

export default function ParentDashboard({ user }: ParentDashboardProps) {
  return (
    <div className="container mx-auto py-12 px-4 max-w-screen-xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-orange-600">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-2">
          <div className="p-4 rounded-xl bg-orange-100">
            <Users className="h-10 w-10 text-orange-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, {user?.name}!
            </h1>
            <p className="mt-1 text-gray-600">
              Monitor your student&apos;s application progress and support their
              college journey.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-orange-100">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold">Applications</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Track your student&apos;s college applications
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-orange-100 text-orange-600 rounded-full px-3 py-1">
              3 active
            </span>
            <Button variant="link" className="text-orange-600 p-0">
              View Applications
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-amber-100">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold">Deadlines</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Keep track of important application dates
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-amber-100 text-amber-600 rounded-full px-3 py-1">
              5 upcoming
            </span>
            <Button variant="link" className="text-amber-600 p-0">
              View Calendar
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Messages</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Communicate with counselors and your student
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-blue-100 text-blue-600 rounded-full px-3 py-1">
              2 unread
            </span>
            <Button variant="link" className="text-blue-600 p-0">
              Open Inbox
            </Button>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Student&apos;s Tasks</h2>
        <div className="space-y-4">
          <TaskItem
            title="Complete Harvard Personal Statement"
            dueDate="Dec 15, 2023"
            status="in-progress"
            university="Harvard University"
          />
          <TaskItem
            title="Submit SAT scores to MIT"
            dueDate="Dec 1, 2023"
            status="completed"
            university="MIT"
          />
          <TaskItem
            title="Request recommendation letter"
            dueDate="Nov 30, 2023"
            status="in-progress"
            university="Stanford University"
          />
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Tasks
        </Button>
      </div>
    </div>
  );
}

interface TaskItemProps {
  title: string;
  dueDate: string;
  status: "completed" | "in-progress" | "not-started";
  university: string;
}

function TaskItem({ title, dueDate, status, university }: TaskItemProps) {
  return (
    <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-orange-300 transition-all bg-white">
      <div className="mr-3">
        {status === "completed" ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Clock className="h-5 w-5 text-amber-500" />
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
            {university}
          </span>
          <span className="mx-2">•</span>
          <span>Due: {dueDate}</span>
        </div>
      </div>
      <div className="ml-2">
        {status === "completed" ? (
          <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
            Completed
          </span>
        ) : (
          <span className="px-2 py-1 bg-amber-100 text-amber-600 text-xs rounded-full">
            In Progress
          </span>
        )}
      </div>
    </div>
  );
}
