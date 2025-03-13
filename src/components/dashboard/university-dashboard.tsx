"use client";

import { User } from "next-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, BarChart, Settings, Calendar } from "lucide-react";

interface UniversityDashboardProps {
  user: User;
}

export default function UniversityDashboard({
  user,
}: UniversityDashboardProps) {
  return (
    <div className="container mx-auto py-12 px-4 max-w-screen-xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-blue-600">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-2">
          <div className="p-4 rounded-xl bg-blue-100">
            <Building2 className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, {user?.name}!
            </h1>
            <p className="mt-1 text-gray-600">
              Manage your university profile and view applicant analytics.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Applicants</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            View and manage student applications
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-blue-100 text-blue-600 rounded-full px-3 py-1">
              128 total
            </span>
            <Button variant="link" className="text-blue-600 p-0">
              View Applicants
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
            View application statistics and trends
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
            <h3 className="text-lg font-semibold">Profile Settings</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Update your university information
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-purple-100 text-purple-600 rounded-full px-3 py-1">
              Last updated: 2 days ago
            </span>
            <Button variant="link" className="text-purple-600 p-0">
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>
          <div className="space-y-4">
            <ApplicantItem
              name="Emma Johnson"
              program="Computer Science"
              date="Nov 28, 2023"
              status="new"
            />
            <ApplicantItem
              name="Michael Smith"
              program="Business Administration"
              date="Nov 27, 2023"
              status="in-review"
            />
            <ApplicantItem
              name="Sophia Davis"
              program="Mechanical Engineering"
              date="Nov 25, 2023"
              status="new"
            />
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Applications
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            <EventItem
              title="Virtual Information Session"
              date="Dec 15, 2023"
              time="3:00 PM - 4:30 PM"
              attendees={42}
            />
            <EventItem
              title="Application Deadline (Early Decision)"
              date="Jan 1, 2024"
              time="11:59 PM"
              attendees={null}
            />
            <EventItem
              title="Campus Tour - Online"
              date="Dec 10, 2023"
              time="10:00 AM - 11:30 AM"
              attendees={18}
            />
          </div>
          <Button variant="outline" className="w-full mt-4">
            Manage Events
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ApplicantItemProps {
  name: string;
  program: string;
  date: string;
  status: "new" | "in-review" | "accepted" | "rejected" | "waitlisted";
}

function ApplicantItem({ name, program, date, status }: ApplicantItemProps) {
  const statusColors = {
    new: "bg-blue-100 text-blue-600",
    "in-review": "bg-amber-100 text-amber-600",
    accepted: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
    waitlisted: "bg-purple-100 text-purple-600",
  };

  const statusText = {
    new: "New",
    "in-review": "In Review",
    accepted: "Accepted",
    rejected: "Rejected",
    waitlisted: "Waitlisted",
  };

  return (
    <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all bg-white">
      <div className="mr-3 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
        <span className="font-semibold text-blue-600">{name.charAt(0)}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{name}</h4>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
            {program}
          </span>
          <span className="mx-2">•</span>
          <span>Applied: {date}</span>
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

interface EventItemProps {
  title: string;
  date: string;
  time: string;
  attendees: number | null;
}

function EventItem({ title, date, time, attendees }: EventItemProps) {
  return (
    <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all bg-white">
      <div className="mr-3">
        <Calendar className="h-5 w-5 text-indigo-500" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{time}</span>
        </div>
      </div>
      <div>
        {attendees !== null && (
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-medium">{attendees}</span>
          </div>
        )}
      </div>
    </div>
  );
}
