"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  User,
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  Calendar,
  Settings,
  MessageSquare,
  BarChart,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const userRole = session?.user?.role as UserRole;
  const userName = session?.user?.name || "User";

  // Define navigation items based on user role
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: [
        UserRole.STUDENT,
        UserRole.PARENT,
        UserRole.COUNSELOR,
        UserRole.UNIVERSITY,
        UserRole.ADMIN,
      ],
    },
    {
      name: "Essays",
      href: "/dashboard/essays",
      icon: FileText,
      roles: [UserRole.STUDENT, UserRole.COUNSELOR],
    },
    {
      name: "Applications",
      href: "/dashboard/applications",
      icon: Calendar,
      roles: [UserRole.STUDENT, UserRole.PARENT, UserRole.COUNSELOR],
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart,
      roles: [UserRole.COUNSELOR, UserRole.UNIVERSITY, UserRole.ADMIN],
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      roles: [
        UserRole.STUDENT,
        UserRole.PARENT,
        UserRole.COUNSELOR,
        UserRole.UNIVERSITY,
      ],
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      roles: [
        UserRole.STUDENT,
        UserRole.PARENT,
        UserRole.COUNSELOR,
        UserRole.UNIVERSITY,
        UserRole.ADMIN,
      ],
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    (item) => userRole && item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-gray-500 lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <Link
                href="/"
                className="text-xl font-bold text-indigo-600 ml-2 md:ml-0"
              >
                UniPath<span className="text-rose-500">AI</span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-1 text-sm text-gray-600 mr-4">
                <User className="h-4 w-4 mr-1" />
                <span className="font-medium">{userName}</span>
                {userRole && (
                  <span className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                    {userRole.charAt(0).toUpperCase() +
                      userRole.slice(1).toLowerCase()}
                  </span>
                )}
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="px-2 space-y-1">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
