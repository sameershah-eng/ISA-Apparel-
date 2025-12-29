import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Welcome to ISA. How can we assist you with your premium trousers today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userText = message.trim();
    setMessage("");
    setHistory((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      // 1. Initialize API Client
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });

      // 2. Format history for the API
      const contents = history
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        }))
        .concat({ role: "user", parts: [{ text: userText }] });

      // 3. Generate Content with System Instructions
      // const response = await ai.models.generateContent({
      //   model: 'gemini-3-flash-preview',
      //   contents: contents,
      //   config: {
      //     systemInstruction: `You are ISA Concierge, the digital ambassador for ISA Atelier.
      //     ISA Atelier is a luxury fashion house specializing in premium trousers.

      //     CORE BRAND DATA:
      //     - Founder: Sandro Cavallo, a master tailor with a vision for modern sartorial excellence.
      //     - WhatsApp Contact: +44 20 7946 0123 (Available for bespoke styling and order inquiries).
      //     - Location: Headquartered in London with textiles sourced from Biella, Italy.

      //     TONE: Elegant, sophisticated, helpful, and concise. You speak with the authority of a luxury boutique manager.`,
      //     temperature: 0.7,
      //     topK: 40,
      //     topP: 0.95,
      //   },
      // });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          systemInstruction: `
# ROLE: ISA CONCIERGE (STRICTLY CONCISE)
You are the elite ambassador for ISA Atelier. Your goal is to provide immediate, direct answers. Do not use "filler" language or repeat brand history unless specifically asked.

When listing categories, use a vertical bulleted list. Each item should include the link and a 3-word description. End with a short, direct question.

# BRAND DNA
- FOUNDER: Ahsan Shah.
- LOCATION: Karachi, Korangi.
- FABRICS: Italian textiles (Biella).
- WHATSAPP: +92 313 6417526

# NAVIGATION LINKS (USE THESE ONLY)
- Bespoke: Bespoke Trousers
- RTW: Ready-to-Wear
- Chinos: Luxury Chinos
- Formal: Formal Wear


# STRICT CONVERSATIONAL RULES
1. BREVITY IS MANDATORY: Answers must be under 30 words unless listing categories.
2. NO REPETITION: Do not mention "Italian textiles" or "London/Karachi" in every message. Only mention them if relevant to the question.
3. GREETING: Only say "Welcome to the Atelier" in the VERY FIRST message. For follow-up questions, answer directly.
4. DIRECT ANSWERS: If asked for a name, provide ONLY the name. If asked for a link, provide ONLY the link and a brief description.

# EXAMPLE OF IDEAL TONE:
User: "who is the founder?"
Assistant: "The founder of ISA Atelier is Ahsan Shah."

User: "ready to wear"
Assistant: "Our [Ready-to-Wear](https://isa-apparel.vercel.app/#/ready-to-wear) collection offers immediate elegance in standard sizing. Would you like to see the fit guide?"
`,
          temperature: 0.5, // Lowered for more consistent "Luxury" responses
          topK: 20,
          topP: 0.8,
        },
      });

      // 4. Extract text property correctly
      const botText =
        response.text ||
        "I apologize, our concierge service is briefly unavailable.";
      setHistory((prev) => [...prev, { role: "model", text: botText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm having some technical difficulties. Please try again later or contact our support team via WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`mb-4 w-[85vw] sm:w-80 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl border border-slate-100 overflow-hidden transition-all duration-500 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#2C3468] p-5 md:p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">
                ISA Concierge
              </h3>
              <p className="text-[9px] opacity-60 mt-0.5">
                Sartorial Assistance Active
              </p>
            </div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
          </div>
        </div>

        {/* Content */}
        <div
          ref={scrollRef}
          className="h-80 md:h-96 p-5 bg-slate-50/50 overflow-y-auto flex flex-col gap-4 no-scrollbar"
        >
          {history.map((m, i) => (
            // <div
            //   key={i}
            //   className={`p-3.5 rounded-2xl shadow-sm max-w-[90%] text-[11px] leading-relaxed border ${m.role === 'user'
            //     ? 'bg-[#2C3468] text-white self-end rounded-tr-none border-[#2C3468]'
            //     : 'bg-white text-slate-700 self-start rounded-tl-none border-slate-100'
            //     }`}
            // >
            //   {m.text}
            // </div>
            <div
              key={i}
              className={`p-3.5 rounded-2xl shadow-sm max-w-[90%] text-[11px] leading-relaxed border whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-[#2C3468] text-white self-end rounded-tr-none border-[#2C3468]"
                  : "bg-white text-slate-700 self-start rounded-tl-none border-slate-100"
              }`}
            >
              {m.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white p-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-sm max-w-[50%] text-[10px] text-slate-400 flex gap-1 items-center border border-slate-100">
              <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            placeholder="How can we assist?"
            className="flex-1 text-[11px] focus:outline-none py-2 bg-transparent placeholder:text-slate-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            className={`p-2 transition-all ${
              isLoading || !message.trim()
                ? "text-slate-200"
                : "text-[#2C3468] hover:scale-110"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 active:scale-90 group
          ${
            isOpen
              ? "bg-white text-[#2C3468] rotate-90"
              : "bg-[#2C3468] text-white"
          }
        `}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <div className="relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#2C3468]"></span>
          </div>
        )}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-[#2C3468] text-white px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
            ISA CONCIERGE
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
