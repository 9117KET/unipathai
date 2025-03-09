"use client";

import { AuthForm, type RegisterFormValues } from "@/components/auth/auth-form";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const { toast } = useToast();

  const handleRegisterSubmit = async (values: RegisterFormValues) => {
    // This would be replaced with actual registration logic
    console.log("Register values:", values);

    // Show success toast
    toast({
      title: "Registration successful",
      description:
        "Account created. In a real app, you would be logged in now.",
      variant: "default",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-indigo-50/50">
      <AuthForm type="register" onSubmit={handleRegisterSubmit} />
    </div>
  );
}
