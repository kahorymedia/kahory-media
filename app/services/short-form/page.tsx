"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

const processSteps = [
  {
    num: "01",
    title: "Strategy & Hook Architecture",
    desc: "We don't guess. We analyze your niche, identify volume trends, and script high-retention hooks designed specifically for the algorithm.",
  },
  {
    num: "02",
    title: "Cinematic Capture",
    desc: "Shot on high-end cinema cameras, graded to perfection. We elevate the standard 'talking head' into a premium brand experience.",
  },
  {
    num: "03",
    title: "Retention Editing",
    desc: "Pacing is everything. We utilize dynamic sound design, seamless transitions, and psychological visual cues to maximize watch-time.",
  },
  {
    num: "04",
    title: "Distribution & Scaling",
    desc: "Omnichannel deployment across IG Reels, YouTube Shorts, and TikTok with optimized metadata to capture maximum organic reach.",
  }
];

export default function ShortFormServicePage() {
  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden relative pt-32 md:pt-40">
      
      {/* HERO SECTION */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 mb-24 md:mb-40">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E61919] font-bold block mb-6"
        >
          Service Pillar
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-[clamp(4rem,8vw,7rem)] font-bold tracking-tighter leading-[0.9] text-white uppercase mb-8"
        >
          Short-Form <br/>
          <span className="text-white/40 italic font-serif lowercase font-light">Production.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/50 max-w-xl text-sm md:text-lg font-light leading-relaxed"
        >
          Attention spans aren't shrinking; the threshold for quality is just rising. We build scalable, high-converting short-form pipelines that turn passive scrollers into absolute brand loyalists.
        </motion.p>
      </section>

      {/* THE PIPELINE (ACCORDION STYLE) */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 mb-32 md:mb-48">
        <div className="flex flex-col gap-0 border-t border-white/10">
          {processSteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-500 cursor-default px-4 -mx-4"
            >
              <div className="flex items-center gap-6 md:gap-12 mb-4 md:mb-0">
                <span className="text-xl md:text-3xl font-mono font-light text-white/20 group-hover:text-[#E5D3B3] transition-colors duration-500">
                  {step.num}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-white/60 group-hover:text-white tracking-tighter transition-colors duration-500">
                  {step.title}
                </h3>
              </div>
              <p className="md:w-1/3 text-sm md:text-base text-white/30 group-hover:text-white/70 font-light leading-relaxed transition-colors duration-500 pl-14 md:pl-0">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICE CTA */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 mb-32 md:mb-40 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-8">
          Ready to scale your reach?
        </h2>
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