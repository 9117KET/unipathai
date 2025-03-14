"use client";

import { useState, useEffect } from "react";
import { User } from "next-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  PlusCircle,
  Edit,
  Trash2,
  BookOpenCheck,
} from "lucide-react";
import { Essay } from "@/types/essay";
import { useRouter } from "next/navigation";
import EssayCreationDialog from "./essay-creation-dialog";
import { toast } from "sonner";

// Mock data - will be replaced with API calls
const MOCK_ESSAYS: Essay[] = [
  {
    id: "1",
    title: "Why I Want to Study Computer Science",
    content: "Computer science has always fascinated me...",
    version: 1,
    aiAssisted: true,
    createdAt: new Date("2023-11-20"),
    updatedAt: new Date("2023-11-21"),
  },
  {
    id: "2",
    title: "My Leadership Experience",
    content: "Throughout high school, I've had the opportunity...",
    feedback: "Great work! Consider adding more specific examples.",
    version: 2,
    aiAssisted: false,
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-11-18"),
  },
];

interface EssayWorkspaceProps {
  user: User;
}

export default function EssayWorkspace({ user: _user }: EssayWorkspaceProps) {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Mock API call
    const fetchEssays = async () => {
      // This will be replaced with actual API call
      try {
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEssays(MOCK_ESSAYS);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching essays:", error);
        toast.error("Failed to load your essays. Please try again.");
        setIsLoading(false);
      }
    };

    fetchEssays();
  }, []);

  const handleCreateEssay = async (title: string, _prompt: string) => {
    // Mock creating an essay
    const newEssay: Essay = {
      id: Math.random().toString(36).substring(7),
      title,
      content: "",
      version: 1,
      aiAssisted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setEssays([...essays, newEssay]);
    setIsCreationDialogOpen(false);

    // Navigate to the essay editor
    router.push(`/dashboard/essays/${newEssay.id}`);

    toast.success("Essay created successfully.");
  };

  const handleDeleteEssay = async (id: string) => {
    // Mock deleting an essay
    const updatedEssays = essays.filter((essay) => essay.id !== id);
    setEssays(updatedEssays);

    toast.success("Your essay has been removed.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Essay Workspace</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Write, edit, and get AI feedback on your college application essays.
          </p>
        </div>
        <Button onClick={() => setIsCreationDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Essay
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 h-48 animate-pulse">
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
      ) : essays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {essays.map((essay) => (
            <EssayCard
              key={essay.id}
              essay={essay}
              onDelete={handleDeleteEssay}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Essays Yet</h3>
          <p className="text-gray-500 mb-4 max-w-md">
            Start by creating your first essay. Get AI assistance with drafting,
            editing, and receiving feedback.
          </p>
          <Button onClick={() => setIsCreationDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Essay
          </Button>
        </Card>
      )}

      <EssayCreationDialog
        open={isCreationDialogOpen}
        onOpenChange={setIsCreationDialogOpen}
        onSubmit={handleCreateEssay}
      />
    </div>
  );
}

interface EssayCardProps {
  essay: Essay;
  onDelete: (id: string) => void;
}

function EssayCard({ essay, onDelete }: EssayCardProps) {
  const router = useRouter();

  return (
    <Card className="p-5 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {essay.aiAssisted ? (
            <BookOpenCheck className="h-5 w-5 text-purple-500" />
          ) : (
            <BookOpen className="h-5 w-5 text-blue-500" />
          )}
          <h3 className="text-lg font-semibold truncate" title={essay.title}>
            {essay.title}
          </h3>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-3 line-clamp-3">
        {essay.content
          ? essay.content.substring(0, 150) + "..."
          : "No content yet"}
      </p>

      <div className="mt-auto pt-3 border-t flex items-center justify-between text-xs text-gray-500">
        <span>
          Version {essay.version} • Updated{" "}
          {essay.updatedAt.toLocaleDateString()}
        </span>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => router.push(`/dashboard/essays/${essay.id}`)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-500"
            onClick={() => onDelete(essay.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
