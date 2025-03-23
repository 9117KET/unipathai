"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/types/user";
import { RoleGuard } from "@/components/auth/role-guard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  Clock,
  Building,
  User,
  Mail,
  Briefcase,
  MessageSquare,
  CalendarDays,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Type definitions for the professional request
type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

interface ProfessionalRequest {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  position: string;
  message: string;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export default function ProfessionalRequestsPage() {
  // We need to call useAuth to ensure the user is authenticated,
  // even though we don't directly use the user object
  // The RoleGuard component will handle the role-based access control
  useAuth({ required: true });

  const [requests, setRequests] = useState<ProfessionalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<RequestStatus>("PENDING");
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/admin/professional-requests");
        const data = await res.json();

        if (res.ok) {
          setRequests(data.requests);
        } else {
          toast.error(data.error || "Failed to load requests");
        }
      } catch (error) {
        console.error("Error fetching professional requests:", error);
        toast.error("An error occurred while fetching requests");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (
    requestId: string,
    newStatus: RequestStatus
  ) => {
    try {
      const res = await fetch(`/api/admin/professional-requests/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update the local state
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === requestId ? { ...req, status: newStatus } : req
          )
        );

        toast.success(
          newStatus === "APPROVED"
            ? "Request approved successfully"
            : "Request rejected successfully"
        );
      } else {
        toast.error(data.error || "Failed to update request status");
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error("An error occurred while updating the request");
    }
  };

  // Filter requests based on active tab
  const filteredRequests = requests.filter((req) => req.status === activeTab);

  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
      <div className="container mx-auto py-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Professional Registration Requests
            </h1>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/admin")}
            >
              Back to Admin Dashboard
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as RequestStatus)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="PENDING" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Pending</span>
                <span className="ml-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                  {requests.filter((req) => req.status === "PENDING").length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="APPROVED" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Approved</span>
                <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {requests.filter((req) => req.status === "APPROVED").length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="REJECTED" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                <span>Rejected</span>
                <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                  {requests.filter((req) => req.status === "REJECTED").length}
                </span>
              </TabsTrigger>
            </TabsList>

            {["PENDING", "APPROVED", "REJECTED"].map((status) => (
              <TabsContent key={status} value={status}>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">
                      No {status.toLowerCase()} requests
                    </h3>
                    <p className="text-gray-500 mt-2 max-w-md">
                      {status === "PENDING"
                        ? "There are no pending professional registration requests at this time."
                        : status === "APPROVED"
                        ? "You haven't approved any professional registration requests yet."
                        : "You haven't rejected any professional registration requests yet."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {filteredRequests.map((request) => (
                      <Card key={request.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">
                                {request.name}
                              </CardTitle>
                              <CardDescription className="text-sm">
                                Applied as{" "}
                                <span className="font-medium text-indigo-600">
                                  {request.role === UserRole.COUNSELOR
                                    ? "Counselor"
                                    : "University Representative"}
                                </span>
                              </CardDescription>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                request.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "APPROVED"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.status}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <Mail className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <div className="font-medium">Email</div>
                                <div>{request.email}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Building className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <div className="font-medium">Organization</div>
                                <div>{request.organization}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Briefcase className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <div className="font-medium">Position</div>
                                <div>{request.position}</div>
                              </div>
                            </div>
                            {request.message && (
                              <div className="flex items-start gap-2">
                                <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <div className="font-medium">
                                    Additional Information
                                  </div>
                                  <div className="whitespace-pre-wrap">
                                    {request.message}
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="flex items-start gap-2">
                              <CalendarDays className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <div className="font-medium">Submitted</div>
                                <div>
                                  {format(new Date(request.createdAt), "PPP")}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-3 flex flex-col sm:flex-row gap-3">
                          {request.status === "PENDING" && (
                            <>
                              <Button
                                className="w-full sm:w-auto"
                                onClick={() =>
                                  handleUpdateStatus(request.id, "APPROVED")
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={() =>
                                  handleUpdateStatus(request.id, "REJECTED")
                                }
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                          {request.status === "APPROVED" && (
                            <Button
                              variant="outline"
                              className="w-full sm:w-auto"
                              onClick={() =>
                                router.push(
                                  `/dashboard/admin/users?email=${request.email}`
                                )
                              }
                            >
                              <User className="h-4 w-4 mr-2" />
                              View User
                            </Button>
                          )}
                          {request.status === "REJECTED" && (
                            <Button
                              variant="outline"
                              className="w-full sm:w-auto"
                              onClick={() =>
                                handleUpdateStatus(request.id, "PENDING")
                              }
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Move to Pending
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  );
}
