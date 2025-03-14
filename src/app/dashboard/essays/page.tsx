import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import EssayWorkspace from "@/components/essay/essay-workspace";

export const metadata: Metadata = {
  title: "Essay Workspace | UniPathAI",
  description: "Write and get AI feedback on your college application essays",
};

export default async function EssaysPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <EssayWorkspace user={session.user} />
    </div>
  );
}
