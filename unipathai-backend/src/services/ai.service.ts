import OpenAI from "openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { StringOutputParser } from "langchain/schema/output_parser";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize LangChain model
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4",
  temperature: 0.7,
});

// Essay feedback service
export const generateEssayFeedback = async (
  essayContent: string,
  prompt: string
) => {
  try {
    const essayFeedbackPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert college admissions counselor with years of experience helping students craft compelling college application essays. 
      Your task is to provide constructive feedback on a student's essay. 
      Focus on the following aspects:
      1. Structure and flow
      2. Clarity and coherence
      3. Personal voice and authenticity
      4. Relevance to the prompt
      5. Grammar and style
      
      Provide specific suggestions for improvement, highlighting both strengths and areas that need work.
      Be encouraging but honest. Your goal is to help the student improve their essay while maintaining their authentic voice.`,
      ],
      ["user", `Essay Prompt: ${prompt}\n\nEssay Content: ${essayContent}`],
    ]);

    const chain = essayFeedbackPrompt
      .pipe(model)
      .pipe(new StringOutputParser());

    const feedback = await chain.invoke({});

    return feedback;
  } catch (error) {
    console.error("Error generating essay feedback:", error);
    throw new Error("Failed to generate essay feedback");
  }
};

// College recommendation service
export const generateCollegeRecommendations = async (studentProfile: {
  interests: string[];
  location?: string;
  testScores?: any;
  educationLevel?: string;
}) => {
  try {
    const { interests, location, testScores, educationLevel } = studentProfile;

    const interestsString = interests.join(", ");
    const testScoresString = testScores
      ? JSON.stringify(testScores)
      : "Not provided";

    const recommendationPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert college admissions counselor with extensive knowledge of universities worldwide.
      Your task is to recommend 5 universities that would be a good fit for a student based on their profile.
      For each university, provide:
      1. Name and location
      2. Why it's a good fit (based on the student's interests and profile)
      3. Notable programs related to the student's interests
      4. Approximate acceptance rate or competitiveness
      
      Be specific and provide actionable recommendations. Focus on academic fit rather than just rankings.`,
      ],
      [
        "user",
        `Student Profile:
      - Interests: ${interestsString}
      - Preferred Location: ${location || "No preference"}
      - Test Scores: ${testScoresString}
      - Education Level: ${educationLevel || "Not specified"}
      
      Please recommend 5 universities that would be a good fit for this student.`,
      ],
    ]);

    const chain = recommendationPrompt
      .pipe(model)
      .pipe(new StringOutputParser());

    const recommendations = await chain.invoke({});

    return recommendations;
  } catch (error) {
    console.error("Error generating college recommendations:", error);
    throw new Error("Failed to generate college recommendations");
  }
};

// Essay improvement suggestions
export const generateEssayImprovements = async (essayContent: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert writing coach specializing in college application essays. 
          Your task is to provide specific suggestions to improve the given essay paragraph by paragraph.
          Focus on enhancing clarity, impact, and personal voice while maintaining the student's authentic message.
          For each paragraph, suggest 1-2 specific improvements.`,
        },
        {
          role: "user",
          content: `Please analyze this essay and provide specific improvement suggestions paragraph by paragraph:\n\n${essayContent}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating essay improvements:", error);
    throw new Error("Failed to generate essay improvements");
  }
};

// Generate essay outline
export const generateEssayOutline = async (
  prompt: string,
  interests: string[]
) => {
  try {
    const interestsString = interests.join(", ");

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert college admissions counselor. Your task is to create a detailed outline for a college application essay.
          The outline should include:
          1. Introduction with a compelling hook
          2. 3-4 main body paragraphs with key points
          3. Conclusion that ties everything together
          
          Make the outline specific to the student's interests and the essay prompt. Focus on creating a structure that will showcase the student's unique qualities and experiences.`,
        },
        {
          role: "user",
          content: `Essay Prompt: ${prompt}\n\nStudent Interests: ${interestsString}\n\nPlease create a detailed outline for this essay.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating essay outline:", error);
    throw new Error("Failed to generate essay outline");
  }
};
