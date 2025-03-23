"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { LightbulbIcon } from "lucide-react";

interface EssayAIFeedbackProps {
  feedback: string;
}

export default function EssayAIFeedback({ feedback }: EssayAIFeedbackProps) {
  // Simple Markdown parser for our feedback format
  // In a real implementation, you'd use a proper Markdown library
  const renderMarkdown = (text: string) => {
    // Process headings
    const processHeadings = text.replace(
      /^## (.*$)/gm,
      '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>'
    );

    // Process bullet points
    const processBullets = processHeadings.replace(
      /^\- (.*$)/gm,
      '<li class="ml-4 pl-2 py-1">$1</li>'
    );

    // Process numbered lists
    const processNumbers = processBullets.replace(
      /^(\d+)\. (.*$)/gm,
      '<li class="ml-4 pl-2 py-1"><span class="font-medium">$1.</span> $2</li>'
    );

    // Process paragraphs
    const processParagraphs = processNumbers.replace(
      /^(?!(#|<))(.*$)/gm,
      '<p class="my-2">$2</p>'
    );

    return processParagraphs;
  };

  return (
    <Card className="p-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
          <LightbulbIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold">AI Feedback</h3>
      </div>

      <div
        className="prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(feedback) }}
      />
    </Card>
  );
}
