"use client";

import { useAuth } from "@/hooks/use-auth";
import { RoleGuard } from "@/components/auth/role-guard";
import { UserRole } from "@/types/user";
import { Loader2 } from "lucide-react";

// Dashboard components for different user roles
import StudentDashboard from "@/components/dashboard/student-dashboard";
import CounselorDashboard from "@/components/dashboard/counselor-dashboard";
import ParentDashboard from "@/components/dashboard/parent-dashboard";
import UniversityDashboard from "@/components/dashboard/university-dashboard";
import AdminDashboard from "@/components/dashboard/admin-dashboard";

export default function DashboardPage() {
  const { user, isLoading } = useAuth({ required: true });

  if (isLoading || !user) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Render the appropriate dashboard based on user role
  return (
    <>
      {user.role === UserRole.STUDENT && (
        <RoleGuard allowedRoles={[UserRole.STUDENT]}>
          <StudentDashboard user={user} />
        </RoleGuard>
      )}

      {user.role === UserRole.COUNSELOR && (
        <RoleGuard allowedRoles={[UserRole.COUNSELOR]}>
          <CounselorDashboard user={user} />
        </RoleGuard>
      )}

      {user.role === UserRole.PARENT && (
        <RoleGuard allowedRoles={[UserRole.PARENT]}>
          <ParentDashboard user={user} />
        </RoleGuard>
      )}

      {user.role === UserRole.UNIVERSITY && (
        <RoleGuard allowedRoles={[UserRole.UNIVERSITY]}>
          <UniversityDashboard user={user} />
        </RoleGuard>
      )}

      {user.role === UserRole.ADMIN && (
        <RoleGuard allowedRoles={[UserRole.ADMIN]}>
          <AdminDashboard user={user} />
        </RoleGuard>
      )}
    </>
  );
}
