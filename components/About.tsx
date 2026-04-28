"use client";
import { siteData } from "@/data/content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const container = useRef(null);
  const words = siteData.about.description.split(" ");

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 50%"]
  });

  return (
    <section id="about" ref={container} className="w-full pt-32 pb-16 md:py-64 px-6 md:px-12 bg-black flex justify-center min-h-[80vh]">
      {/* INNER WRAPPER */}
      <div className="w-full max-w-[1200px] flex justify-center">
        <div className="max-w-[1000px] w-full">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5D3B3] font-bold block mb-12">
            {siteData.about.title}
          </span>

          <p className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.2] flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2 md:gap-y-4">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              
              const opacity = useTransform(scrollYProgress, [start, end], [0.4, 1]);
              const color = useTransform(scrollYProgress, [start, end], ["#777777", "#ffffff"]);
              
              return (
                <motion.span key={i} style={{ opacity, color }} className="text-white">
                  {word}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}