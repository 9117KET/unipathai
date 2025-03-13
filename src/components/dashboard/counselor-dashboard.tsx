"use client";

import { User } from "next-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User as UserIcon,
  Users,
  FileText,
  MessageSquare,
  Clock,
} from "lucide-react";

interface CounselorDashboardProps {
  user: User;
}

export default function CounselorDashboard({ user }: CounselorDashboardProps) {
  return (
    <div className="container mx-auto py-12 px-4 max-w-screen-xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-teal-600">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-2">
          <div className="p-4 rounded-xl bg-teal-100">
            <UserIcon className="h-10 w-10 text-teal-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, Counselor {user?.name}!
            </h1>
            <p className="mt-1 text-gray-600">
              Manage your students, review applications, and provide guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-teal-100">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold">My Students</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Manage and view your student roster
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-teal-100 text-teal-600 rounded-full px-3 py-1">
              12 students
            </span>
            <Button variant="link" className="text-teal-600 p-0">
              View Students
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-cyan-100">
              <FileText className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold">Essay Reviews</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Review and provide feedback on student essays
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-cyan-100 text-cyan-600 rounded-full px-3 py-1">
              5 pending
            </span>
            <Button variant="link" className="text-cyan-600 p-0">
              View Essays
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
            Communicate with students and parents
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-blue-100 text-blue-600 rounded-full px-3 py-1">
              3 unread
            </span>
            <Button variant="link" className="text-blue-600 p-0">
              Open Inbox
            </Button>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Pending Reviews</h2>
        <div className="space-y-4">
          <StudentReviewItem
            name="Emma Johnson"
            taskType="Essay Review"
            requestDate="Nov 28, 2023"
            university="Harvard University"
          />
          <StudentReviewItem
            name="Michael Smith"
            taskType="Application Review"
            requestDate="Nov 27, 2023"
            university="Stanford University"
          />
          <StudentReviewItem
            name="Sophia Davis"
            taskType="Recommendation Letter"
            requestDate="Nov 25, 2023"
            university="MIT"
          />
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Pending Tasks
        </Button>
      </div>
    </div>
  );
}

interface StudentReviewItemProps {
  name: string;
  taskType: string;
  requestDate: string;
  university: string;
}

function StudentReviewItem({
  name,
  taskType,
  requestDate,
  university,
}: StudentReviewItemProps) {
  return (
    <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-teal-300 transition-all bg-white">
      <div className="mr-3 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
        <span className="font-semibold text-teal-600">{name.charAt(0)}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{name}</h4>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
            {taskType}
          </span>
          <span className="mx-2">•</span>
          <span>{university}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="px-2 py-1 bg-amber-100 text-amber-600 text-xs rounded-full flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Requested {requestDate}
        </span>
        <Button variant="link" size="sm" className="text-teal-600 mt-1">
          Review
        </Button>
      </div>
    </div>
  );
}
