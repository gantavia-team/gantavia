import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Use correct env variable
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I’m Gantavia AI! Ask me about trips, destinations, hotels ✈️",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // ✅ Initialize Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // ✅ Create prompt with history
      const prompt = `
You are a smart travel assistant for a website called Gantavia.
Help users with destinations, trip planning, hotels, budgets, and travel tips.

Conversation:
${messages.map((m) => `${m.role}: ${m.text}`).join("\n")}

user: ${input}
assistant:
`;

      // ✅ Generate response
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const reply = response.text();

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      console.error("Gemini Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ AI not responding. Check API key or internet.",
        },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 font-semibold">
            Gantavia AI
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto h-80 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <p className="text-gray-400 italic animate-pulse">
                Typing...
              </p>
            )}
          </div>

          {/* Input */}
          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about trips..."
              className="flex-1 p-2 outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;