"use client";
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-funnel', handleOpen);
    return () => window.removeEventListener('open-funnel', handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl z-[999] flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-white/5 flex justify-between bg-white/5">
            <span className="text-white font-bold text-sm">Kahory Concierge</span>
            <button onClick={() => setIsOpen(false)} className="text-white/40">✕</button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl text-xs ${m.role === 'user' ? 'bg-[#E61919] text-white' : 'bg-white/10 text-white'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
            <input value={input} onChange={handleInputChange} placeholder="Ask anything..." className="w-full bg-transparent text-white text-sm outline-none" />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}