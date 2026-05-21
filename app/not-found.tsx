"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E61919] blur-[200px] opacity-[0.05] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h1 className="text-[15vw] font-black text-white/5 tracking-tighter leading-none mb-4">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tighter mb-8">
          This page got cut in post.
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="group relative inline-block">
            <div className="px-8 py-4 border border-white/20 text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden relative">
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Back to Home</span>
              <motion.div whileHover={{ top: 0 }} className="absolute -top-full left-0 w-full h-full bg-white z-0 transition-all duration-500" />
            </div>
          </Link>
        </div>
      </motion.div>
      
    </main>
  );
}