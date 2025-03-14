export interface Essay {
  id: string;
  title: string;
  content: string;
  feedback?: string;
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
  strengths: string[];
  improvements: string[];
  suggestions: string;
  overallRating: number; // 1-10 scale
}
