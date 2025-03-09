"use client";

import { useState } from "react";
import { AuthForm, type LoginFormValues } from "@/components/auth/auth-form";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  const { isAuthenticated } = useAuth({ redirectIfFound: true });

  const handleLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Sign in with NextAuth
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back!",
          variant: "default",
        });

        // Redirect to dashboard on successful login
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
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
        type="login"
        onSubmit={handleLoginSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
