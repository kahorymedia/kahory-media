"use client";
import { siteData } from "@/data/content";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function RollingNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const count = useMotionValue(0);
  
  const springValue = useSpring(count, {
    stiffness: 40, damping: 20, restDelta: 0.001
  });

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));
  const blurValue = useTransform(springValue, [0, numericValue * 0.5, numericValue], ["blur(0px)", "blur(8px)", "blur(0px)"]);

  useEffect(() => {
    if (isInView) count.set(numericValue);
    else count.set(0);
  }, [isInView, numericValue, count]);

  return (
    // FIX: Using 20vw on mobile to mathematically guarantee the huge numbers fit the screen width
    <motion.div ref={ref} className="flex items-baseline text-[20vw] sm:text-7xl md:text-[9rem] font-bold tracking-tighter leading-none text-white">
      <motion.span style={{ filter: blurValue }}>
        <motion.span>{displayValue}</motion.span>
      </motion.span>
      <span className="text-[#E5D3B3]">{suffix}</span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    // FIX: Reduced padding from pt-32 to pt-20 on mobile
    <section id="stats" className="w-full pt-20 md:pt-32 pb-16 px-6 md:px-12 bg-black border-t border-white/5 flex justify-center">
      <div className="w-full max-w-[1200px]">
        {/* FIX: gap-12 on mobile to tighten up the vertical scrolling list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          {siteData.stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-6 md:gap-8">
              <RollingNumber value={stat.value} />
              <div className="flex flex-col gap-3">
                <motion.div 
                  initial={{ width: 0 }} whileInView={{ width: 60 }} transition={{ duration: 1, delay: 0.5 }}
                  className="h-[2px] bg-[#E5D3B3]" 
                />
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-white/40 font-black">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}