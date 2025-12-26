
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to ISA. How can we assist you with your premium trousers today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  // Handle sending message to Gemini API
  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userText = message.trim();
    setMessage('');
    setHistory(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })).concat({ role: 'user', parts: [{ text: userText }] }),
        config: {
          systemInstruction: "You are ISA Concierge, the digital ambassador for ISA Atelier. ISA Atelier is a high-end luxury fashion brand specializing in premium trousers, biella merino wool fabrics, and bespoke tailoring. Your tone is elegant, professional, and sophisticated. Provide detailed yet concise advice on style, fit, and fabric choices.",
        },
      });

      const botText = response.text || "I apologize, but I am currently unable to reach the concierge desk.";
      setHistory(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setHistory(prev => [...prev, { role: 'model', text: "I'm having some technical difficulties. Please try again later or contact our support team." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <div className={`mb-4 w-80 bg-white shadow-2xl rounded-2xl border border-slate-100 overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-[#2C3468] p-6 text-white">
          <h3 className="text-sm font-bold uppercase tracking-widest">ISA Concierge</h3>
          <p className="text-[10px] opacity-70 mt-1">Ready to assist with your sartorial needs.</p>
        </div>

        {/* Content */}
        <div ref={scrollRef} className="h-80 p-6 bg-slate-50 overflow-y-auto flex flex-col gap-4">
          {history.map((m, i) => (
            <div 
              key={i} 
              className={`p-3 rounded-2xl shadow-sm max-w-[85%] text-[11px] leading-relaxed border border-slate-100 ${
                m.role === 'user' 
                ? 'bg-[#2C3468] text-white self-end rounded-tr-none' 
                : 'bg-white text-slate-700 self-start rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white p-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-sm max-w-[50%] text-[10px] text-slate-400 italic border border-slate-100 animate-pulse">
              Concierge is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Inquire here..." 
            className="flex-1 text-xs focus:outline-none py-2 bg-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            className={`p-2 rounded-full transition-colors ${isLoading || !message.trim() ? 'text-slate-200' : 'text-[#2C3468] hover:bg-slate-50'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#2C3468] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        <span className="absolute right-full mr-4 bg-white text-[#2C3468] px-3 py-1.5 rounded-lg text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-slate-100">
          ISA CONCIERGE
        </span>
      </button>
    </div>
  );
};

export default ChatBot;
