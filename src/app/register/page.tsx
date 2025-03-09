"use client";

import { useState } from "react";
import { AuthForm, type RegisterFormValues } from "@/components/auth/auth-form";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  const { isAuthenticated } = useAuth({ redirectIfFound: true });

  const handleRegisterSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Register the user by calling our API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Show success toast
      toast({
        title: "Registration successful",
        description: "Account created. Logging you in...",
        variant: "default",
      });

      // Auto sign-in after registration
      await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Please try again later.";
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated === undefined) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-indigo-50/50">
      <AuthForm
        type="register"
        onSubmit={handleRegisterSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
