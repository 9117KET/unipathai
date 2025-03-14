"use client";

import { useState, useEffect } from "react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ArrowLeft,
  Save,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Essay } from "@/types/essay";
import { toast } from "sonner";
import EssayAIFeedback from "./essay-ai-feedback";

// Mock essay data - will be replaced with API calls
const MOCK_ESSAYS: Record<string, Essay> = {
  "1": {
    id: "1",
    title: "Why I Want to Study Computer Science",
    content: "Computer science has always fascinated me...",
    version: 1,
    aiAssisted: true,
    createdAt: new Date("2023-11-20"),
    updatedAt: new Date("2023-11-21"),
  },
  "2": {
    id: "2",
    title: "My Leadership Experience",
    content: "Throughout high school, I've had the opportunity...",
    feedback: "Great work! Consider adding more specific examples.",
    version: 2,
    aiAssisted: false,
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-11-18"),
  },
};

interface EssayEditorProps {
  essayId: string;
  // TODO: Will use the user object for permissions and personalization in the future
  user: User;
}

export default function EssayEditor({
  essayId,
}: // TODO: Will use the user object for permissions and personalization in the future
// user param is intentionally not destructured to avoid linter errors
EssayEditorProps) {
  const [essay, setEssay] = useState<Essay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [activeTab, setActiveTab] = useState("editor");
  const router = useRouter();

  useEffect(() => {
    const fetchEssay = async () => {
      try {
        // In a real implementation, this would be an API call
        // For now, we'll use our mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

        const foundEssay = MOCK_ESSAYS[essayId];
        if (foundEssay) {
          setEssay(foundEssay);
          setTitle(foundEssay.title);
          setContent(foundEssay.content);
          setWordCount(countWords(foundEssay.content));
        } else {
          // Create a new placeholder if not found in our mock data
          const newEssay: Essay = {
            id: essayId,
            title: "Untitled Essay",
            content: "",
            version: 1,
            aiAssisted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setEssay(newEssay);
          setTitle(newEssay.title);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching essay:", error);
        toast.error("Failed to load essay. Please try again.");
        setIsLoading(false);
      }
    };

    fetchEssay();
  }, [essayId]);

  const handleSave = async () => {
    if (!essay) return;

    setIsSaving(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll just update our local state
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay

      const updatedEssay: Essay = {
        ...essay,
        title,
        content,
        version: essay.version + 1,
        updatedAt: new Date(),
      };

      setEssay(updatedEssay);

      toast.success("Your essay has been saved successfully.");
    } catch (error) {
      console.error("Error saving essay:", error);
      toast.error("Failed to save essay. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setWordCount(countWords(value));
  };

  const handleGetAIFeedback = async () => {
    if (!content.trim()) {
      toast.error(
        "Please write something in your essay before requesting feedback."
      );
      return;
    }

    setIsGeneratingFeedback(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate an AI response
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate AI processing

      const updatedEssay: Essay = {
        ...essay!,
        feedback: `
## Overall Assessment
This is a well-structured essay that effectively communicates your passion for the subject matter. Your personal voice comes through strongly.

## Strengths
- Strong opening paragraph that captures attention
- Clear reasoning for your interest in the field
- Personal anecdotes that support your narrative

## Areas for Improvement
- Consider adding more specific examples of projects or experiences
- The third paragraph could be more concise
- Add more detail about your future goals

## Suggestions
1. Expand on your programming project experience in paragraph two
2. Connect your past experiences more clearly to your future aspirations
3. Consider ending with a stronger concluding statement that ties everything together
        `,
        aiAssisted: true,
        updatedAt: new Date(),
      };

      setEssay(updatedEssay);
      setActiveTab("feedback");

      toast.success("AI feedback has been generated for your essay.");
    } catch (error) {
      console.error("Error generating AI feedback:", error);
      toast.error("Failed to generate AI feedback. Please try again.");
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-500">Loading your essay...</p>
      </div>
    );
  }

  if (!essay) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-xl font-bold">Essay Not Found</h3>
        <p className="mt-2 text-gray-500">
          We couldn&apos;t find the essay you&apos;re looking for.
        </p>
        <Button
          className="mt-4"
          onClick={() => router.push("/dashboard/essays")}
        >
          Back to Essays
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button
          variant="ghost"
          className="w-fit"
          onClick={() => router.push("/dashboard/essays")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Essays
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <Button
            onClick={handleGetAIFeedback}
            disabled={isGeneratingFeedback || !content.trim()}
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            {isGeneratingFeedback ? "Generating..." : "Get AI Feedback"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold py-6"
              placeholder="Essay Title"
            />
          </div>

          <Card className="p-4 flex flex-col justify-center items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">Word Count</span>
            </div>
            <p className="text-2xl font-bold mt-1">{wordCount}</p>
            <p className="text-xs text-gray-500 mt-1">
              Version: {essay.version}
            </p>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="feedback" disabled={!essay.feedback}>
              AI Feedback
              {essay.feedback && (
                <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-4">
            <Textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Start writing your essay here..."
              className="min-h-[60vh] resize-none text-base leading-relaxed p-4"
            />
          </TabsContent>

          <TabsContent value="feedback" className="mt-4">
            {essay.feedback ? (
              <EssayAIFeedback feedback={essay.feedback} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border rounded-md">
                <AlertCircle className="h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No Feedback Yet</h3>
                <p className="mt-2 text-gray-500 text-center max-w-md">
                  Save your essay and use the &quot;Get AI Feedback&quot; button
                  to receive detailed suggestions from our AI assistant.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper function to count words
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
