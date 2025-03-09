"use client";

import { AuthForm, type LoginFormValues } from "@/components/auth/auth-form";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { toast } = useToast();

  const handleLoginSubmit = async (values: LoginFormValues) => {
    // This would be replaced with actual authentication logic
    console.log("Login values:", values);

    // Show success toast
    toast({
      title: "Login attempted",
      description: "This is a demo. In a real app, you would be logged in now.",
      variant: "default",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-indigo-50/50">
      <AuthForm type="login" onSubmit={handleLoginSubmit} />
    </div>
  );
}
