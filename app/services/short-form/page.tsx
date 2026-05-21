"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

const processSteps = [
  {
    num: "01",
    title: "The Hook & Strategy",
    desc: "We figure out exactly what your audience actually cares about, and script the first 3 seconds of the video to make scrolling impossible.",
  },
  {
    num: "02",
    title: "The Shoot",
    desc: "Say goodbye to awkward phone videos. We bring cinema-quality cameras, lighting, and direction to make your brand look premium and professional.",
  },
  {
    num: "03",
    title: "The Edit",
    desc: "Fast-paced, engaging, and clean. We use sharp cuts, trending audio, and psychological visual cues to keep viewers hooked until the very end.",
  },
  {
    num: "04",
    title: "Post & Grow",
    desc: "We don't just hand over the files and leave. We format and optimize your videos for Instagram, TikTok, and YouTube Shorts to maximize your reach.",
  }
];

export default function ShortFormServicePage() {
  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden relative">
      
      {/* MINIMAL TOP NAVIGATION */}
      <header className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 z-50 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300">
          <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest mt-0.5">Back</span>
        </Link>
        <div className="text-[#E5D3B3] font-bold tracking-[0.3em] uppercase text-[10px]">
          Kahory Media
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 pt-32 md:pt-48 mb-24 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-[#E61919] animate-pulse" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E61919] font-bold">
            Service
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-[clamp(4rem,8vw,7rem)] font-bold tracking-tighter leading-[0.9] text-white uppercase mb-8"
        >
          Short-Form <br/>
          <span className="text-white/40 italic font-serif lowercase font-light">Video.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 max-w-xl text-base md:text-lg font-light leading-relaxed"
        >
          People aren't losing their attention span. They’re just getting pickier. We shoot and edit short-form videos that people actually want to watch—and share.
        </motion.p>
      </section>

      {/* THE PIPELINE (TIMELINE STYLE) */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 mb-32 md:mb-48 relative">
        <div className="absolute left-[38px] md:left-[43px] top-4 bottom-4 w-[1px] bg-white/10 hidden md:block" />
        
        <div className="flex flex-col gap-12 md:gap-20">
          {processSteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col md:flex-row md:items-start gap-6 md:gap-16"
            >
              {/* Glowing Dot on Desktop */}
              <div className="hidden md:flex absolute -left-1 top-2 w-3 h-3 rounded-full bg-white/20 group-hover:bg-[#E5D3B3] group-hover:shadow-[0_0_15px_#E5D3B3] transition-all duration-500 z-10" />

              <div className="flex flex-col md:w-1/3 pt-1">
                <span className="text-sm md:text-lg font-mono font-bold text-[#E61919] mb-2">
                  {step.num}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
                  {step.title}
                </h3>
              </div>
              
              <div className="md:w-1/2 pt-1 md:pt-3">
                <p className="text-base md:text-lg text-white/50 group-hover:text-white/80 font-light leading-relaxed transition-colors duration-500">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICE CTA */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 mb-32 md:mb-40 flex flex-col items-center text-center bg-white/[0.02] border border-white/10 rounded-3xl py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">
          Ready to scale your reach?
        </h2>
        <p className="text-white/50 mb-8 max-w-sm">
          Stop guessing with your content. Let's build a strategy that actually works.
        </p>
        <Link href="/contact">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs md:text-sm rounded-full hover:bg-[#E5D3B3] transition-colors duration-300"
          >
            Start a Project
          </motion.button>
        </Link>
      </section>

      <Footer />
    </main>
  );
}