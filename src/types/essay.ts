export interface Essay {
  id: string;
  title: string;
  content: string;
  feedback?: EssayFeedback;
  version: number;
  aiAssisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EssayPrompt {
  id: string;
  title: string;
  description: string;
  universityName?: string;
  wordLimit?: number;
}

export interface EssayFeedback {
  overallAssessment: string;
  strengths: string[];
  areasForImprovement: string[];
  suggestions: string[];
  score: number;
  plagiarismConcerns: string[];
}

export interface EssayOutline {
  hook: string;
  bodyParagraphs: {
    topic: string;
    keyPoints: string[];
  }[];
  conclusion: string;
}

export interface EssayImprovements {
  paragraphSuggestions: {
    paragraphNumber: number;
    suggestions: string[];
  }[];
  overallSuggestions: string[];
}
