"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Affirmation({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-12 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 bg-[#E5D3B3] text-black rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-3"
        >
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
          Inquiry Sent Successfully
        </motion.div>
      )}
    </AnimatePresence>
  );
}