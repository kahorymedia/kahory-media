"use client";
import { motion, useScroll, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export default function BackToTop() {
  const { scrollY } = useScroll();
  const controls = useAnimationControls();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 500) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    });
  }, [scrollY, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20, pointerEvents: "none" },
        visible: { opacity: 1, y: 0, pointerEvents: "auto" }
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={scrollToTop}
      // PADDING ADDED (p-6) to massively increase the invisible hover/click area
      className="fixed bottom-8 right-2 md:right-6 z-[90] p-6 flex flex-col items-center gap-4 group cursor-pointer"
    >
      {/* Invisible expanded hit-box to ensure easy hovering */}
      <div className="absolute -inset-4 z-[-1]" />

      {/* Animated accent line - Made slightly thicker (w-[2px]) and brighter (bg-white/20) */}
      <div className="w-[2px] h-12 bg-white/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#E5D3B3] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      </div>
      
      {/* Vertical text - Increased to text-[10px] and base opacity to white/60 */}
      <span 
        className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/60 group-hover:text-[#E5D3B3] transition-colors duration-500 rotate-180" 
        style={{ writingMode: 'vertical-rl' }}
      >
        Top
      </span>
    </motion.button>
  );
}