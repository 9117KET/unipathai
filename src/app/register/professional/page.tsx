"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/user";
import Link from "next/link";

const professionalRegisterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  role: z.enum([UserRole.COUNSELOR, UserRole.UNIVERSITY], {
    required_error: "Please select your professional role",
  }),
  organization: z.string().min(2, { message: "Organization name is required" }),
  position: z.string().min(2, { message: "Position is required" }),
  message: z.string().optional(),
});

type ProfessionalRegisterFormValues = z.infer<
  typeof professionalRegisterSchema
>;

// Client component that uses useSearchParams
function ProfessionalRegisterForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get role from URL query parameter if available
  const roleParam = searchParams.get("role");
  const roleFromUrl =
    roleParam === UserRole.COUNSELOR || roleParam === UserRole.UNIVERSITY
      ? (roleParam as UserRole.COUNSELOR | UserRole.UNIVERSITY)
      : null;

  // Redirect if already authenticated
  const { isAuthenticated } = useAuth({ redirectIfFound: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfessionalRegisterFormValues>({
    resolver: zodResolver(professionalRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      position: "",
      message: "",
      role: roleFromUrl || undefined,
    },
  });

  // Set the role from URL when component mounts
  useEffect(() => {
    if (
      roleFromUrl &&
      (roleFromUrl === UserRole.COUNSELOR ||
        roleFromUrl === UserRole.UNIVERSITY)
    ) {
      setValue("role", roleFromUrl);
    }
  }, [roleFromUrl, setValue]);

  const selectedRole = watch("role");

  const handleRegisterSubmit = async (
    values: ProfessionalRegisterFormValues
  ) => {
    setIsLoading(true);

    try {
      // Submit the professional registration request
      const res = await fetch("/api/auth/professional-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request submission failed");
      }

      // Show success message
      setIsSubmitted(true);
      toast({
        title: "Request submitted successfully",
        description: "We'll review your application and get back to you soon.",
        variant: "default",
      });
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Please try again later.";
      toast({
        title: "Submission failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl border border-indigo-100/50">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Application Submitted!
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Thank you for your interest in becoming a professional on
              UniPathAI. Our team will review your application and get back to
              you soon.
            </p>
          </div>
          <div className="mt-6 flex flex-col space-y-3">
            <Link href="/" passHref>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200">
                Back to Homepage
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button
                variant="outline"
                className="w-full border-2 hover:bg-indigo-50 transition-colors duration-200"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated === undefined) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl border border-indigo-100/50">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Professional Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Register as a counselor or university representative
          </p>
        </div>

        <Link
          href="/register"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to regular registration
        </Link>

        <form
          onSubmit={handleSubmit(handleRegisterSubmit)}
          className="space-y-6 mt-8"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <div className="mt-1">
              <Input
                id="name"
                type="text"
                autoComplete="name"
                {...register("name")}
                className={`${
                  errors.name
                    ? "border-red-300 focus-visible:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                } shadow-sm transition-all duration-200`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={`${
                  errors.email
                    ? "border-red-300 focus-visible:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                } shadow-sm transition-all duration-200`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Professional Role
            </label>
            <div className="mt-1">
              <Select
                value={selectedRole}
                onValueChange={(value) =>
                  setValue(
                    "role",
                    value as UserRole.COUNSELOR | UserRole.UNIVERSITY
                  )
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm transition-all duration-200">
                  <SelectValue placeholder="Select your professional role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.COUNSELOR}>Counselor</SelectItem>
                  <SelectItem value={UserRole.UNIVERSITY}>
                    University Representative
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700"
            >
              Organization / Institution
            </label>
            <div className="mt-1">
              <Input
                id="organization"
                type="text"
                {...register("organization")}
                className={`${
                  errors.organization
                    ? "border-red-300 focus-visible:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                } shadow-sm transition-all duration-200`}
              />
              {errors.organization && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.organization.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position / Title
            </label>
            <div className="mt-1">
              <Input
                id="position"
                type="text"
                {...register("position")}
                className={`${
                  errors.position
                    ? "border-red-300 focus-visible:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                } shadow-sm transition-all duration-200`}
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Information (Optional)
            </label>
            <div className="mt-1">
              <Textarea
                id="message"
                {...register("message")}
                rows={4}
                placeholder="Tell us more about yourself and how you plan to use UniPathAI"
                className={`${
                  errors.message
                    ? "border-red-300 focus-visible:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                } shadow-sm transition-all duration-200`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ProfessionalRegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfessionalRegisterForm />
    </Suspense>
  );
}
