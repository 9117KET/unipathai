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
  Clock,
  FileText,
  Target,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Essay {
  id: string;
  title: string;
  content: string;
  prompt?: string;
  version: number;
  aiAssisted: boolean;
  createdAt: Date;
  updatedAt: Date;
  feedback?: {
    overallAssessment: string;
    strengths: string[];
    areasForImprovement: string[];
    suggestions: string[];
    score: number;
    plagiarismConcerns: string[];
  };
}

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
    feedback: {
      overallAssessment: "A strong start with clear passion for the subject.",
      strengths: ["Clear enthusiasm", "Personal connection", "Good structure"],
      areasForImprovement: [
        "Add more specific examples",
        "Expand on technical interests",
      ],
      suggestions: ["Include a coding project example", "Discuss future goals"],
      score: 7,
      plagiarismConcerns: [],
    },
  },
  "2": {
    id: "2",
    title: "My Leadership Experience",
    content: "Throughout high school, I've had the opportunity...",
    version: 2,
    aiAssisted: false,
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-11-18"),
    feedback: {
      overallAssessment:
        "Strong leadership examples with room for more detail.",
      strengths: ["Clear examples", "Good progression", "Shows initiative"],
      areasForImprovement: ["Add more context", "Show personal growth"],
      suggestions: ["Expand on challenges faced", "Include outcomes"],
      score: 8,
      plagiarismConcerns: [],
    },
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
      const response = await fetch(`/api/essays/${essayId}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: essay?.prompt || "General college application essay",
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate feedback");
      }

      const data = await response.json();

      // Show plagiarism warning if concerns are found
      if (data.essay.feedback.plagiarismConcerns.length > 0) {
        toast.warning(
          "Potential plagiarism concerns detected. Please review the feedback.",
          { duration: 6000 }
        );
      }

      setEssay(data.essay);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard/essays")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Essays
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Badge variant={essay.aiAssisted ? "default" : "secondary"}>
                  {essay.aiAssisted ? "AI Enhanced" : "Original"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  v{essay.version}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="text-gray-600 dark:text-gray-300"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                size="sm"
                onClick={handleGetAIFeedback}
                disabled={isGeneratingFeedback || !content.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                <Zap className="h-4 w-4 mr-2" />
                {isGeneratingFeedback ? "Analyzing..." : "Get AI Feedback"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Essay Stats */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Essay Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Word Count
                    </span>
                    <span className="font-medium">{wordCount}</span>
                  </div>
                  <Progress value={(wordCount / 650) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 500-650 words
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      Last saved {essay.updatedAt.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Version {essay.version}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Target className="h-4 w-4 mr-2" />
                    <span>
                      AI Feedback{" "}
                      {essay.feedback ? "Available" : "Not Generated"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {essay.feedback && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Overall Score
                      </span>
                      <Badge
                        className={
                          essay.feedback.score >= 8
                            ? "bg-green-100 text-green-800"
                            : essay.feedback.score >= 6
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {essay.feedback.score}/10
                      </Badge>
                    </div>
                    <Progress
                      value={essay.feedback.score * 10}
                      className={
                        essay.feedback.score >= 8
                          ? "h-2 bg-green-100"
                          : essay.feedback.score >= 6
                          ? "h-2 bg-yellow-100"
                          : "h-2 bg-red-100"
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        Strengths
                      </span>
                      <span className="font-medium">
                        {essay.feedback.strengths.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        Areas to Improve
                      </span>
                      <span className="font-medium">
                        {essay.feedback.areasForImprovement.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        Suggestions
                      </span>
                      <span className="font-medium">
                        {essay.feedback.suggestions.length}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title Input */}
            <div className="relative">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-semibold py-6 px-4 bg-transparent border-none focus:ring-0 focus:border-none"
                placeholder="Essay Title"
              />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
            </div>

            {/* Editor/Feedback Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full p-0 bg-transparent border-b border-gray-200 dark:border-gray-700">
                <TabsTrigger
                  value="editor"
                  className="flex-1 py-3 border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger
                  value="feedback"
                  className="flex-1 py-3 border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                  disabled={!essay?.feedback}
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  AI Feedback
                  {(() => {
                    const concerns = essay?.feedback?.plagiarismConcerns;
                    if (concerns && concerns.length > 0) {
                      return (
                        <Badge variant="destructive" className="ml-2">
                          {concerns.length}
                        </Badge>
                      );
                    }
                    return null;
                  })()}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="mt-6">
                <Card className="relative overflow-hidden border border-gray-200 dark:border-gray-700">
                  <ScrollArea className="h-[calc(100vh-400px)] min-h-[500px]">
                    <Textarea
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Start writing your essay here..."
                      className="min-h-full resize-none p-6 text-lg leading-relaxed bg-transparent border-none focus:ring-0 focus:border-none"
                    />
                  </ScrollArea>
                  <div className="absolute bottom-0 right-0 p-4 bg-gradient-to-t from-white dark:from-gray-900 pt-8">
                    <Badge variant="secondary" className="text-sm">
                      {wordCount} words
                    </Badge>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="mt-6">
                <ScrollArea className="h-[calc(100vh-400px)]">
                  {essay?.feedback ? (
                    <div className="space-y-6 p-1">
                      {/* Overall Assessment */}
                      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-none">
                        <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          Overall Assessment
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {essay.feedback.overallAssessment}
                        </p>
                      </Card>

                      {/* Plagiarism Concerns */}
                      {essay.feedback.plagiarismConcerns.length > 0 && (
                        <Card className="p-6 border-red-200 bg-red-50/50 dark:bg-red-950/50 dark:border-red-800">
                          <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400 flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            Plagiarism Concerns
                          </h3>
                          <ul className="space-y-3">
                            {essay.feedback.plagiarismConcerns.map(
                              (concern, index) => (
                                <li
                                  key={index}
                                  className="flex items-start text-red-700 dark:text-red-300"
                                >
                                  <span className="mr-2">•</span>
                                  {concern}
                                </li>
                              )
                            )}
                          </ul>
                        </Card>
                      )}

                      {/* Strengths and Areas for Improvement */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6">
                          <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400 flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Strengths
                          </h3>
                          <ul className="space-y-3">
                            {essay.feedback.strengths.map((strength, index) => (
                              <li
                                key={index}
                                className="flex items-start text-gray-700 dark:text-gray-300"
                              >
                                <span className="mr-2 text-green-500">•</span>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </Card>

                        <Card className="p-6">
                          <h3 className="text-xl font-semibold mb-4 text-yellow-600 dark:text-yellow-400 flex items-center">
                            <Target className="h-5 w-5 mr-2" />
                            Areas for Improvement
                          </h3>
                          <ul className="space-y-3">
                            {essay.feedback.areasForImprovement.map(
                              (improvement, index) => (
                                <li
                                  key={index}
                                  className="flex items-start text-gray-700 dark:text-gray-300"
                                >
                                  <span className="mr-2 text-yellow-500">
                                    •
                                  </span>
                                  {improvement}
                                </li>
                              )
                            )}
                          </ul>
                        </Card>
                      </div>

                      {/* Specific Suggestions */}
                      <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center">
                          <Zap className="h-5 w-5 mr-2" />
                          Specific Suggestions
                        </h3>
                        <ul className="space-y-4">
                          {essay.feedback.suggestions.map(
                            (suggestion, index) => (
                              <li
                                key={index}
                                className="flex items-start p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/50"
                              >
                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-3">
                                  {index + 1}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {suggestion}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </Card>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
                        <Zap className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        No Feedback Yet
                      </h3>
                      <p className="text-gray-500 max-w-md">
                        Click &quot;Get AI Feedback&quot; to receive detailed
                        suggestions and improvements for your essay.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to count words
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
