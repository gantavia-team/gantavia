import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY is missing from environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const getGeminiChatSession = (history = []) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: {
      role: "system",
      parts: [
        { text: "You are Gantavia AI, a friendly, energetic, and highly knowledgeable travel planner specializing exclusively in Indian tourism. Your goal is to provide concise, budget-friendly, and exciting travel recommendations, itineraries, and tips for destinations across India. Always use some emojis to keep the conversation lively." }
      ]
    }
  });

  // Map our UI history to Gemini's expected 'user' / 'model' format
  const formattedHistory = history.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.text }],
  }));

  const chat = model.startChat({
    history: formattedHistory,
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.7,
    },
  });

  return chat;
};
