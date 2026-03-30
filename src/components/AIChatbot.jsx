import { useState, useEffect, useRef } from "react";

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
  const [typingText, setTypingText] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Predefined questions, answers, and keywords
  const predefinedQA = [
    {
      question: "What are the best destinations in India for adventure?",
      answer:
        "Some of the top adventure destinations in India include Manali, Rishikesh, Leh-Ladakh, Andaman Islands, and Himachal Pradesh. You can enjoy trekking, river rafting, paragliding, and more!",
      keywords: ["adventure", "trekking", "rafting", "paragliding", "mountain"],
    },
    {
      question: "How can I plan a 5-day trip to Manali?",
      answer:
        "For a 5-day Manali trip: Day 1: Arrival & Mall Road, Day 2: Solang Valley & Adventure Sports, Day 3: Rohtang Pass, Day 4: Naggar Castle & Local sightseeing, Day 5: Departure. Book hotels in advance and check transport options.",
      keywords: ["plan", "manali", "itinerary", "trip", "5-day"],
    },
    {
      question: "Best hotels in Paris under $150 per night?",
      answer:
        "Some budget-friendly hotels in Paris under $150/night include Hotel Ekta, Hotel ibis Paris Montmartre, and Hotel Darcet. Always check reviews and location before booking!",
      keywords: ["hotel", "paris", "stay", "budget", "booking"],
    },
    {
      question: "Tips for budget-friendly travel in Europe?",
      answer:
        "Travel in the shoulder season, use trains or buses instead of flights, stay in hostels or Airbnb, eat local, and book tickets for attractions online in advance.",
      keywords: ["budget", "cheap", "europe", "travel", "tips"],
    },
    {
      question: "What is the best time to visit Himachal Pradesh?",
      answer:
        "The best time to visit Himachal Pradesh is between March to June (pleasant weather) and September to November (clear skies and autumn beauty). Winters are for snow lovers.",
      keywords: ["himachal", "time", "visit", "weather", "season"],
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  // Typing animation function
  const typeMessage = (text) => {
    setTypingText("");
    let index = 0;
    const interval = setInterval(() => {
      setTypingText((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, 20); // typing speed
  };

  // Function to find answer based on exact question or keywords
  const findAnswer = (messageText) => {
    const input = messageText.toLowerCase();

    // 1️⃣ Exact match
    const exact = predefinedQA.find((q) => q.question.toLowerCase() === input);
    if (exact) return exact.answer;

    // 2️⃣ Keyword match
    for (let q of predefinedQA) {
      for (let keyword of q.keywords) {
        if (input.includes(keyword.toLowerCase())) {
          return q.answer;
        }
      }
    }

    // 3️⃣ Default fallback
    return "Sorry, I didn't understand that. Please ask about trips, destinations, or hotels!";
  };

  const sendMessage = (customInput) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    const userMessage = { role: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const reply = findAnswer(messageText);

    // Typing animation
    typeMessage(reply);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setTypingText("");
      setLoading(false);
    }, reply.length * 20 + 200);

    if (!customInput) setInput("");
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
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 font-semibold rounded-t-2xl">
            Gantavia AI
          </div>

          {/* Suggested Questions */}
          <div className="p-3 border-b bg-gray-50">
            <p className="text-gray-600 text-sm font-semibold mb-2">Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {predefinedQA.map((q, i) => (
                <div
                  key={i}
                  onClick={() => sendMessage(q.question)}
                  className="cursor-pointer px-3 py-2 bg-blue-100 text-blue-800 rounded-lg shadow-sm hover:bg-blue-200 transition text-xs sm:text-sm"
                >
                  {q.question}
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto h-64 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm break-words ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing Animation */}
            {typingText && (
              <div className="p-2 rounded-lg text-sm bg-gray-100 text-left italic text-gray-500">
                {typingText}
                <span className="animate-pulse">|</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-200">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about trips..."
              className="flex-1 p-2 outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
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