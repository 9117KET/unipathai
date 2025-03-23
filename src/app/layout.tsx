import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth/auth-provider";
import FirebaseProvider from "@/components/firebase/firebase-provider";
import { GradientBackground } from "@/components/ui/gradient-background";
import { ClientBodyFix } from "@/components/client-body-fix";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniPathAI - AI-Powered College Application Platform",
  description:
    "Navigate your college application journey with AI-powered assistance for essays, college matching, and application tracking.",
  keywords: [
    "college applications",
    "AI essay help",
    "university admissions",
    "college matching",
  ],
  authors: [{ name: "UniPathAI Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unipathai.com",
    title: "UniPathAI - AI-Powered College Application Platform",
    description:
      "Navigate your college application journey with AI-powered assistance.",
    siteName: "UniPathAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniPathAI - AI-Powered College Application Platform",
    description:
      "Navigate your college application journey with AI-powered assistance.",
    creator: "@unipathai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>{/* Firebase config is loaded by FirebaseProvider */}</head>
      <body className={`${inter.className} h-full`} suppressHydrationWarning>
        <ClientBodyFix />
        <AuthProvider>
          <FirebaseProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
            >
              <GradientBackground className="min-h-screen">
                <Navbar />
                <main className="min-h-screen pt-16">{children}</main>
                <Footer />
                <Toaster />
              </GradientBackground>
            </ThemeProvider>
          </FirebaseProvider>
        </AuthProvider>
        <SonnerToaster />
      </body>
    </html>
  );
}
