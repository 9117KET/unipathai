import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import EssayEditor from "@/components/essay/essay-editor";

export const metadata: Metadata = {
  title: "Essay Editor | UniPathAI",
  description:
    "Write and edit your college application essay with AI assistance",
};

interface EssayPageProps {
  params: {
    id: string;
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // In a real implementation, you would fetch the essay data from the API
  // For now we'll pass the ID and use client-side data fetching in the component

  return (
    <div className="container mx-auto py-6 px-4">
      <EssayEditor essayId={params.id} user={session.user} />
    </div>
  );
}
