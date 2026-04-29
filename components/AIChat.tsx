"use client";
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  // Opens the chat when the "Start a Project" button is clicked
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-funnel', handleOpen);
    return () => window.removeEventListener('open-funnel', handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      {/* FLOATING TRIGGER BUBBLE (Bottom Right) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#E61919] rounded-full z-[998] flex items-center justify-center shadow-[0_0_20px_rgba(230,25,25,0.4)] hover:scale-110 transition-transform cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[550px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-[32px] z-[999] flex flex-col overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div>
                <h3 className="text-white font-bold tracking-tight">Kahory Concierge</h3>
                <p className="text-[10px] text-[#E5D3B3] uppercase tracking-widest font-bold">Always Online</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-2">✕</button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center mt-10">
                   <p className="text-white/40 text-sm italic">"How can we scale your content today?"</p>
                </div>
              )}
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#E61919] text-white' : 'bg-white/10 text-white/90'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-[#E5D3B3] text-[10px] uppercase animate-pulse">Analyzing...</div>}
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-black border-t border-white/5">
              <input 
                value={input} 
                onChange={handleInputChange} 
                placeholder="Type your message..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#E61919] transition-all" 
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}