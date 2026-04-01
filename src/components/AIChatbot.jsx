import { useState, useEffect, useRef } from "react";

const QA_DATABASE = [
  {
    question: "What are the best places to visit in India?",
    answer: "India is full of incredible destinations! Some must-visit places include the Taj Mahal in Agra, the backwaters of Kerala, the palaces of Rajasthan, the beaches of Goa, and the mountains of Himachal Pradesh.",
    options: ["Tell me more about Taj Mahal", "Best time to visit Kerala", "What are the best beaches in Goa?"]
  },
  {
    question: "Tell me more about Taj Mahal",
    answer: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1631 by the fifth Mughal emperor, Shah Jahan. Best time to visit is sunrise!",
    options: ["How do I reach Agra?", "What are the best places to visit in India?"]
  },
  {
    question: "How do I reach Agra?",
    answer: "You can reach Agra by train from New Delhi (approx. 2 hours), by road via the Yamuna Expressway, or by air through the Kheria Airport.",
    options: ["Tell me more about Taj Mahal", "What are the best places to visit in India?"]
  },
  {
    question: "Best time to visit Kerala",
    answer: "The best time to visit Kerala is between September and March. The weather is relatively cool and comfortable, making it perfect for exploring the backwaters, hill stations, and beaches.",
    options: ["Can you suggest a 5-day itinerary for Kerala?", "What are the best places to visit in India?"]
  },
  {
    question: "Can you suggest a 5-day itinerary for Kerala?",
    answer: "Sure! Here is a 5-day Kerala itinerary:\nDay 1: Arrival in Kochi & sightseeing.\nDay 2: Drive to Munnar, visit tea gardens.\nDay 3: Explore Munnar (Eravikulam National Park).\nDay 4: Drive to Alleppey, stay in a houseboat.\nDay 5: Departure from Kochi.",
    options: ["Best time to visit Kerala", "What are the best places to visit in India?"]
  },
  {
    question: "What is the best time to visit Goa?",
    answer: "The best time to visit Goa is between mid-November and mid-February when the weather is comfortable, cool, and perfect for relaxing on the beaches.",
    options: ["What are the best beaches in Goa?", "What are the best places to visit in India?"]
  },
  {
    question: "What are the best beaches in Goa?",
    answer: "For a lively vibe, Baga and Calangute are great. For peace and quiet, head to South Goa beaches like Palolem, Agonda, or Colva. Vagator and Anjuna are famous for their parties and rocky shores.",
    options: ["What is the best time to visit Goa?", "What are the best places to visit in India?"]
  },
  {
    question: "What are the visa requirements for India?",
    answer: "Most foreign nationals require a visa to enter India. You can apply for an e-Visa online for tourist, business, or medical purposes. Make sure your passport is valid for at least 6 months from your date of arrival!",
    options: ["How long does it take to get an e-Visa?", "What forms of payment are accepted in India?", "What are the best places to visit in India?"]
  },
  {
    question: "How long does it take to get an e-Visa?",
    answer: "Normally, an Indian e-Visa is processed within 72 hours, but it's advisable to apply at least 4 days in advance of your date of arrival.",
    options: ["What are the visa requirements for India?", "What are the best places to visit in India?"]
  },
  {
    question: "What forms of payment are accepted in India?",
    answer: "While credit and debit cards are widely accepted in cities, having cash (Indian Rupee - INR) is highly recommended for local markets, autos, and rural areas. Unified Payments Interface (UPI) is extensively used locally if you have access.",
    options: ["What are the visa requirements for India?", "Can you suggest some top destinations?"]
  },
  {
    question: "Can you suggest some top destinations?",
    answer: "India offers diverse experiences! Some of the top destinations are Manali for mountains, Leh Ladakh for high-altitude adventure, Varanasi for spiritual experiences, Andaman Islands for exotic beaches, and Jaipur for royal heritage.",
    options: ["Tell me about Manali", "Tell me about Leh Ladakh", "Tell me about Varanasi", "Tell me about Andaman Islands", "Tell me about Jaipur"]
  },
  {
    question: "Tell me about Manali",
    answer: "Manali is a beautiful hill station in Himachal Pradesh, known for its snow-covered mountains, scenic valleys, and adventure sports like paragliding and skiing in Solang Valley.",
    options: ["Can you suggest a 5-day itinerary for Kerala?", "What is the best time to visit Goa?", "Can you suggest some top destinations?"]
  },
  {
    question: "Tell me about Leh Ladakh",
    answer: "Leh Ladakh is a high-altitude desert featuring stunning landscapes, Tibetan monasteries, and the famous Pangong Lake. It's a paradise for bikers and adventure seekers.",
    options: ["What is the best time to visit Goa?", "Can you suggest some top destinations?"]
  },
  {
    question: "Tell me about Varanasi",
    answer: "Varanasi, one of the oldest cities in the world, is the spiritual heart of India. Located on the banks of the Ganges, it's famous for its mesmerizing Ganga Aarti and ancient ghats.",
    options: ["Tell me about Jaipur", "Can you suggest some top destinations?"]
  },
  {
    question: "Tell me about Andaman Islands",
    answer: "The Andaman Islands offer crystal clear waters, exotic marine life, and pristine white-sand beaches like Radhanagar Beach. It's perfect for scuba diving and snorkeling.",
    options: ["What are the best beaches in Goa?", "Can you suggest some top destinations?"]
  },
  {
    question: "Tell me about Jaipur",
    answer: "Known as the Pink City, Jaipur is renowned for its magnificent forts (like Amber Fort), palaces, and rich royal heritage. It forms part of India's famous Golden Triangle tourist circuit.",
    options: ["Tell me about Varanasi", "Can you suggest some top destinations?"]
  }
];

const MAIN_MENU_QUESTIONS = [
  "Can you suggest some top destinations?",
  "What is the best time to visit Goa?",
  "Can you suggest a 5-day itinerary for Kerala?",
  "What are the visa requirements for India?"
];

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I’m Gantavia AI! I can help you plan your entire trip across India 🇮🇳. Here are some questions you can ask me:",
      isOptions: true,
      options: MAIN_MENU_QUESTIONS
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (customInput) => {
    const text = (customInput || input).trim();
    if (!text) return;

    // Add user message
    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Hardcoded response logic with options
    setTimeout(() => {
      let responseText = "I am a simple demo bot right now. Please ask one of the suggested questions! 😊";
      let followUpOptions = MAIN_MENU_QUESTIONS;
      
      const lowerText = text.toLowerCase().trim();
      
      // Check for exact matching or inclusion
      const matchedQA = QA_DATABASE.find(qa => {
        const qLower = qa.question.toLowerCase().replace('?', '').trim();
        return lowerText.includes(qLower) || qLower.includes(lowerText);
      });
      
      if (matchedQA) {
        responseText = matchedQA.answer;
        if (matchedQA.options && matchedQA.options.length > 0) {
          followUpOptions = matchedQA.options;
        }
      }

      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          text: responseText, 
          isOptions: true, 
          options: followUpOptions 
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        {!open && (
           <span className="absolute -top-10 right-2 px-3 py-1 bg-white text-[11px] font-bold rounded-t-xl rounded-l-xl rounded-br-none shadow-xl border border-slate-100 opacity-95 animate-float text-indigo-700 whitespace-nowrap mb-1">
             Ask me anything! ✨
           </span>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white p-4 h-16 w-16 rounded-full shadow-2xl hover:scale-110 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center relative group isolate focus:outline-none"
        >
          <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-purple-400 group-hover:hidden -z-10"></span>
          <span className="text-2xl drop-shadow-md transform transition-transform group-hover:rotate-12">{open ? '✕' : '💬'}</span>
        </button>
      </div>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-28 right-6 w-[380px] h-[550px] max-h-[calc(100vh-8rem)] max-w-[calc(100vw-3rem)] glass rounded-3xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-8 duration-300 shadow-2xl shadow-indigo-500/10">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-md text-white px-6 py-5 font-semibold text-lg flex justify-between items-center shadow-md shrink-0">
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl shadow-inner border border-white/30 backdrop-blur-md">🤖</div>
               <div className="flex flex-col">
                 <span className="leading-tight font-bold tracking-wide text-[16px]">Gantavia AI</span>
                 <span className="text-[11px] text-indigo-100 font-medium flex items-center mt-0.5 uppercase tracking-wider opacity-90"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse shadow-[0_0_5px_0_rgba(52,211,153,0.8)]"></span>Online</span>
               </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>

          {/* Messages Window */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-50/70 scroll-smooth flex flex-col min-h-0 relative">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[90%] px-4 py-3 text-[14.5px] shadow-sm leading-relaxed shrink-0 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl rounded-tr-sm"
                      : "bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-100/60 shadow-md shadow-slate-200/50"
                  }`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {/* Basic parse for newlines from text */}
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>{line}<br/></span>
                  ))}

                  {/* Render option buttons if this message has options */}
                  {msg.isOptions && msg.options && (
                    <div className="mt-3 flex flex-col space-y-2 w-full">
                       {msg.options.map((opt, idx) => (
                         <button 
                           key={idx}
                           onClick={() => sendMessage(opt)}
                           className="text-left text-[13px] bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-medium py-2 px-3 rounded-xl border border-indigo-200/60 transition-colors shadow-sm w-full break-words whitespace-normal leading-snug"
                         >
                           {opt}
                         </button>
                       ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300 w-full shrink-0">
                <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-sm border border-slate-100/60 shadow-md shadow-slate-200/50 flex space-x-1.5 items-center">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-2 shrink-0" />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/90 border-t border-slate-100/60 flex items-center gap-2 backdrop-blur-md shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about India..."
              className="flex-1 bg-slate-100/50 border border-slate-200 text-slate-700 px-5 py-3 rounded-full outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400 transition-all text-[14px] shadow-inner font-medium placeholder:font-normal z-10 relative"
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:hover:scale-100 text-white p-3 rounded-full shadow-md hover:shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-10 relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;