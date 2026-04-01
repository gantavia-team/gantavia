import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.log("NO API KEY LOADED FROM .ENV");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testChat() {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: "You are Gantavia AI." }]
      }
    });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 50,
      },
    });

    const result = await chat.sendMessage("Plan my trip");
    console.log("API SUCCESS:", result.response.text());
  } catch (error) {
    console.error("API Error Thrown:", error);
  }
}

testChat();
