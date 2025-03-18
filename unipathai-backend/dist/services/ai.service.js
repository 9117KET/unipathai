"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEssayOutline = exports.generateEssayImprovements = exports.generateCollegeRecommendations = exports.generateEssayFeedback = void 0;
const openai_1 = __importDefault(require("openai"));
const prompts_1 = require("@langchain/core/prompts");
const openai_2 = require("@langchain/openai");
const output_parsers_1 = require("@langchain/core/output_parsers");
const limiter_1 = require("limiter");
const prompts_2 = require("@langchain/core/prompts");
const output_parsers_2 = require("langchain/output_parsers");
const zod_1 = require("zod");
// TODO: Install langchain package and update imports
// Install with: npm install langchain @langchain/openai
/*
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
*/
// Initialize OpenAI client for direct API calls
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
// Initialize LangChain model
const model = new openai_2.ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4",
    temperature: 0.7,
});
// Rate limiter: 10 requests per minute
const limiter = new limiter_1.RateLimiter(10, "minute", false);
// Output parser for structured essay feedback
const essayFeedbackParser = output_parsers_2.StructuredOutputParser.fromZodSchema(zod_1.z.object({
    overallAssessment: zod_1.z.string(),
    strengths: zod_1.z.array(zod_1.z.string()),
    areasForImprovement: zod_1.z.array(zod_1.z.string()),
    suggestions: zod_1.z.array(zod_1.z.string()),
    score: zod_1.z.number().min(1).max(10),
    plagiarismIndicators: zod_1.z.array(zod_1.z.string()),
}));
// Essay feedback prompt template
const essayFeedbackPrompt = prompts_1.ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are an expert college admissions counselor with years of experience helping students craft compelling college application essays. 
    Your task is to provide constructive feedback on a student's essay.
    
    Analyze the essay for:
    1. Structure and flow
    2. Clarity and coherence
    3. Personal voice and authenticity
    4. Relevance to the prompt
    5. Grammar and style
    6. Potential plagiarism indicators (generic language, inconsistent voice, advanced vocabulary inconsistent with student level)
    
    Provide specific suggestions for improvement, highlighting both strengths and areas that need work.
    Be encouraging but honest. Your goal is to help the student improve their essay while maintaining their authentic voice.
    
    Format your response according to the specified schema, including:
    - Overall assessment
    - List of strengths
    - Areas for improvement
    - Specific suggestions
    - Score (1-10)
    - Potential plagiarism indicators`,
    ],
    [
        "user",
        `Essay Prompt: {prompt}

Essay Content: {content}

Please provide detailed feedback following the specified format.`,
    ],
]);
// Essay improvement prompt template
const essayImprovementPrompt = prompts_2.PromptTemplate.fromTemplate(`
Analyze the following essay paragraph by paragraph and provide specific improvements:

{content}

Focus on:
1. Clarity and impact
2. Personal voice
3. Specific examples and details
4. Transitions between paragraphs
5. Emotional resonance

For each paragraph, suggest 1-2 specific improvements that maintain the author's authentic voice.
`);
// Essay outline prompt template
const essayOutlinePrompt = prompts_2.PromptTemplate.fromTemplate(`
Create a detailed outline for a college application essay based on the following:

Prompt: {prompt}
Student Interests: {interests}

The outline should include:
1. A compelling hook that draws from personal experience
2. 3-4 main body paragraphs that showcase growth and reflection
3. A conclusion that ties everything together and looks forward

Make the outline specific to the student's interests and experiences.
Focus on creating a structure that will help the student tell their unique story.
`);
// Plagiarism check function
const checkForPlagiarism = async (content) => {
    var _a;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are an expert at detecting potential plagiarism in college application essays.
          Analyze the given text for signs of potential plagiarism or AI-generated content, such as:
          1. Generic or cliched language
          2. Inconsistent voice or tone
          3. Advanced vocabulary inconsistent with student level
          4. Perfect grammar and structure (unusual for student writing)
          5. Lack of personal details or specific examples
          
          Return an array of specific concerns, if any are found.`,
                },
                {
                    role: "user",
                    content: content,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });
        const concerns = ((_a = response.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.split("\n").filter((line) => line.trim().length > 0)) || [];
        return concerns;
    }
    catch (error) {
        console.error("Error checking for plagiarism:", error);
        return ["Error performing plagiarism check"];
    }
};
// Essay feedback service
const generateEssayFeedback = async (essayContent, prompt) => {
    try {
        // Check rate limit
        const hasTokens = await limiter.tryRemoveTokens(1);
        if (!hasTokens) {
            throw new Error("Rate limit exceeded. Please try again in a minute.");
        }
        // Run plagiarism check
        const plagiarismConcerns = await checkForPlagiarism(essayContent);
        // Generate feedback using LangChain
        const chain = essayFeedbackPrompt
            .pipe(model)
            .pipe(new output_parsers_1.StringOutputParser())
            .pipe(essayFeedbackParser);
        const feedback = await chain.invoke({
            prompt,
            content: essayContent,
        });
        // Combine feedback with plagiarism check
        return {
            ...feedback,
            plagiarismConcerns,
        };
    }
    catch (error) {
        console.error("Error generating essay feedback:", error);
        throw new Error("Failed to generate essay feedback");
    }
};
exports.generateEssayFeedback = generateEssayFeedback;
// College recommendation service
const generateCollegeRecommendations = async (studentProfile) => {
    try {
        const { interests, location, testScores, educationLevel } = studentProfile;
        const interestsString = interests.join(", ");
        const testScoresString = testScores
            ? JSON.stringify(testScores)
            : "Not provided";
        // TODO: Implement with LangChain after installing required packages
        // For now, use direct OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are an expert college admissions counselor with extensive knowledge of universities worldwide.
      Your task is to recommend 5 universities that would be a good fit for a student based on their profile.
      For each university, provide:
      1. Name and location
      2. Why it's a good fit (based on the student's interests and profile)
      3. Notable programs related to the student's interests
      4. Approximate acceptance rate or competitiveness
      
      Be specific and provide actionable recommendations. Focus on academic fit rather than just rankings.`,
                },
                {
                    role: "user",
                    content: `Student Profile:
      - Interests: ${interestsString}
      - Preferred Location: ${location || "No preference"}
      - Test Scores: ${testScoresString}
      - Education Level: ${educationLevel || "Not specified"}
      
      Please recommend 5 universities that would be a good fit for this student.`,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });
        return response.choices[0].message.content;
    }
    catch (error) {
        console.error("Error generating college recommendations:", error);
        throw new Error("Failed to generate college recommendations");
    }
};
exports.generateCollegeRecommendations = generateCollegeRecommendations;
// Essay improvement suggestions
const generateEssayImprovements = async (essayContent) => {
    try {
        // Check rate limit
        const hasTokens = await limiter.tryRemoveTokens(1);
        if (!hasTokens) {
            throw new Error("Rate limit exceeded. Please try again in a minute.");
        }
        const chain = essayImprovementPrompt
            .pipe(model)
            .pipe(new output_parsers_1.StringOutputParser());
        const improvements = await chain.invoke({
            content: essayContent,
        });
        return improvements;
    }
    catch (error) {
        console.error("Error generating essay improvements:", error);
        throw new Error("Failed to generate essay improvements");
    }
};
exports.generateEssayImprovements = generateEssayImprovements;
// Generate essay outline
const generateEssayOutline = async (prompt, interests) => {
    try {
        // Check rate limit
        const hasTokens = await limiter.tryRemoveTokens(1);
        if (!hasTokens) {
            throw new Error("Rate limit exceeded. Please try again in a minute.");
        }
        const chain = essayOutlinePrompt.pipe(model).pipe(new output_parsers_1.StringOutputParser());
        const outline = await chain.invoke({
            prompt,
            interests: interests.join(", "),
        });
        return outline;
    }
    catch (error) {
        console.error("Error generating essay outline:", error);
        throw new Error("Failed to generate essay outline");
    }
};
exports.generateEssayOutline = generateEssayOutline;
