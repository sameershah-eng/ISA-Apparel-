
import React, { useState } from 'react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <div className={`mb-4 w-80 bg-white shadow-2xl rounded-2xl border border-slate-100 overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-[#2C3468] p-6 text-white">
          <h3 className="text-sm font-bold uppercase tracking-widest">ISA Concierge</h3>
          <p className="text-[10px] opacity-70 mt-1">We typically reply in under 5 minutes.</p>
        </div>

        {/* Content */}
        <div className="h-64 p-6 bg-slate-50 overflow-y-auto flex flex-col gap-4">
          <div className="bg-white p-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-sm max-w-[80%] text-xs text-slate-700 leading-relaxed border border-slate-100">
            Welcome to ISA. How can we assist you with your premium trousers today?
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 text-xs focus:outline-none py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="text-[#2C3468] p-2 hover:bg-slate-50 rounded-full transition-colors">
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
          CHAT WITH US
        </span>
      </button>
    </div>
  );
};

export default ChatBot;
