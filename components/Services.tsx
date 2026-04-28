"use client";
import { siteData } from "@/data/content";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-16">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-12">
          {siteData.services.map((srv, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-maroon dark:group-hover:text-gold transition-colors">
                {idx + 1}. {srv.title}
              </h3>
              <p className="opacity-60 text-lg">{srv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}